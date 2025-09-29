import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Eye, Trash2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/lib/supabaseClient';

interface OrderData {
  id: string;
  service: string;
  package: string;
  projectTitle: string;
  requirements: string;
  timeline: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  paymentMethod: string;
  price: number;
  status: 'new' | 'in-progress' | 'completed';
  createdAt: string;
  notes?: string;
}

const Admin = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<OrderData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<OrderData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const adminPassword = 'raslen123';

  useEffect(() => {
    const authStatus = localStorage.getItem('admin_authenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      loadOrders();
    }
  }, []);

  useEffect(() => {
    filterOrders();
  }, [orders, searchTerm, statusFilter, serviceFilter]);

  const handleLogin = () => {
    if (password === adminPassword) {
      setIsAuthenticated(true);
      localStorage.setItem('admin_authenticated', 'true');
      loadOrders();
    } else {
      alert('Invalid password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_authenticated');
    setPassword('');
  };

  // ---------------- Supabase Load Orders ----------------
  const loadOrders = async () => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching orders:', error);
      setOrders([]);
    } else {
      const mappedOrders = (data || []).map((o: any) => ({
        id: o.order_id,
        service: o.service,
        package: o.package,
        projectTitle: o.project_title,
        requirements: o.details,
        timeline: o.timeline,
        name: o.name,
        email: o.email,
        phone: o.phone,
        company: o.company,
        paymentMethod: o.payment_method,
        price: o.price,
        status: o.status,
        createdAt: o.created_at,
        notes: o.notes || ''
      }));
      setOrders(mappedOrders);
    }
  };

  // ---------------- Filter Orders ----------------
  const filterOrders = () => {
    let filtered = orders;

    if (searchTerm) {
      filtered = filtered.filter(order => 
        order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.projectTitle.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    if (serviceFilter !== 'all') {
      filtered = filtered.filter(order => 
        order.service.toLowerCase().includes(serviceFilter.toLowerCase())
      );
    }

    setFilteredOrders(filtered);
  };

  // ---------------- Update Status ----------------
  const updateOrderStatus = async (orderId: string, newStatus: 'new' | 'in-progress' | 'completed') => {
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('order_id', orderId);

    if (error) {
      console.error('Error updating status:', error);
    } else {
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    }
  };

  // ---------------- Update Notes ----------------
  const updateOrderNotes = async (orderId: string, notes: string) => {
    const { error } = await supabase
      .from('orders')
      .update({ notes })
      .eq('order_id', orderId);

    if (error) {
      console.error('Error updating notes:', error);
    } else {
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, notes } : o));
    }
  };

  // ---------------- Delete Order ----------------
  const deleteOrder = async (orderId: string) => {
    if (confirm('Are you sure you want to delete this order?')) {
      const { error } = await supabase
        .from('orders')
        .delete()
        .eq('order_id', orderId);

      if (error) {
        console.error('Error deleting order:', error);
      } else {
        setOrders(prev => prev.filter(o => o.id !== orderId));
      }
    }
  };

  // ---------------- Export Orders ----------------
  const exportOrders = () => {
    const dataStr = JSON.stringify(orders, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `orders_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-500';
      case 'in-progress': return 'bg-yellow-500';
      case 'completed': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Card className="bg-gray-900 border-gray-800 w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-white text-center">Admin Login</CardTitle>
            <CardDescription className="text-center">Enter password to access order management</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="password" className="text-white">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white"
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
            <Button onClick={handleLogin} className="w-full bg-yellow-400 text-black hover:bg-yellow-500">
              Login
            </Button>
            <Button 
              onClick={() => navigate('/')} 
              variant="outline" 
              className="w-full border-gray-700 text-white hover:bg-gray-800"
            >
              Back to Portfolio
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ---------------- Render Admin Page ----------------
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 px-4 py-6">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <Button 
              variant="ghost" 
              className="text-white hover:text-yellow-400 mb-4"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Portfolio
            </Button>
            <h1 className="text-3xl font-bold">Order Management</h1>
            <p className="text-gray-400 mt-2">Manage and track all client orders</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="border-gray-700 text-white">
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Total Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{orders.length}</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>New Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{orders.filter(o => o.status === 'new').length}</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>In Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{orders.filter(o => o.status === 'in-progress').length}</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{orders.filter(o => o.status === 'completed').length}</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <Input
            placeholder="Search by name, email, project..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-800 border-gray-700 text-white flex-1"
            icon={<Search />}
          />
          <Select onValueChange={setStatusFilter} value={statusFilter}>
            <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={setServiceFilter} value={serviceFilter}>
            <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
              <SelectValue placeholder="Filter by service" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Services</SelectItem>
              {[...new Set(orders.map(o => o.service))].map(service => (
                <SelectItem key={service} value={service}>{service}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={exportOrders} className="bg-yellow-400 text-black hover:bg-yellow-500">
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
        </div>

        {/* Orders List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredOrders.map(order => (
            <Card key={order.id} className="bg-gray-900 border-gray-800">
              <CardHeader className="flex justify-between items-center">
                <div>
                  <CardTitle>{order.projectTitle}</CardTitle>
                  <CardDescription>{order.name} — {order.email}</CardDescription>
                </div>
                <Badge className={`${getStatusColor(order.status)} text-white`}>
                  {order.status.replace('-', ' ')}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-2">
                <p><strong>Service:</strong> {order.service}</p>
                <p><strong>Package:</strong> {order.package}</p>
                <p><strong>Timeline:</strong> {order.timeline}</p>
                <p><strong>Price:</strong> ${order.price}</p>
                <p><strong>Notes:</strong> {order.notes}</p>

                <div className="flex flex-wrap gap-2 mt-2">
                  <Select
                    value={order.status}
                    onValueChange={(val: 'new' | 'in-progress' | 'completed') => updateOrderStatus(order.id, val)}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="text-white">
                        <Eye className="mr-2 h-4 w-4" /> View / Edit Notes
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-gray-900 text-white">
                      <DialogHeader>
                        <DialogTitle>Edit Notes</DialogTitle>
                        <DialogDescription>Update notes for order: {order.projectTitle}</DialogDescription>
                      </DialogHeader>
                      <Textarea
                        value={order.notes}
                        onChange={(e) => updateOrderNotes(order.id, e.target.value)}
                        className="bg-gray-800 border-gray-700 text-white w-full"
                        rows={4}
                      />
                    </DialogContent>
                  </Dialog>

                  <Button
                    onClick={() => deleteOrder(order.id)}
                    variant="destructive"
                    className="text-white"
                  >
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
