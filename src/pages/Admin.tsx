import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Eye, Trash2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/lib/supabaseClient'; // تأكد أن المسار صحيح

interface OrderData {
  id: string;
  service: string;
  package: string;
  projectTitle: string;
  requirements: string;
  timeline: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
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
      fetchOrders();
    }
  }, []);

  useEffect(() => {
    filterOrders();
  }, [orders, searchTerm, statusFilter, serviceFilter]);

  const handleLogin = () => {
    if (password === adminPassword) {
      setIsAuthenticated(true);
      localStorage.setItem('admin_authenticated', 'true');
      fetchOrders();
    } else {
      alert('Invalid password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_authenticated');
    setPassword('');
  };

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('createdAt', { ascending: false });

    if (error) console.error(error);
    else setOrders(data as OrderData[]);
  };

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
    if (statusFilter !== 'all') filtered = filtered.filter(order => order.status === statusFilter);
    if (serviceFilter !== 'all') filtered = filtered.filter(order => order.service.toLowerCase() === serviceFilter.toLowerCase());
    setFilteredOrders(filtered);
  };

  const updateOrderStatus = async (orderId: string, newStatus: 'new' | 'in-progress' | 'completed') => {
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', orderId);

    if (error) console.error(error);
    else fetchOrders();
  };

  const updateOrderNotes = async (orderId: string, notes: string) => {
    const { error } = await supabase
      .from('orders')
      .update({ notes })
      .eq('id', orderId);

    if (error) console.error(error);
    else fetchOrders();
  };

  const deleteOrder = async (orderId: string) => {
    if (!confirm('Are you sure you want to delete this order?')) return;
    const { error } = await supabase.from('orders').delete().eq('id', orderId);
    if (error) console.error(error);
    else fetchOrders();
  };

  const exportOrders = () => {
    const dataStr = JSON.stringify(orders, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
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
              <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} className="bg-gray-800 border-gray-700 text-white" onKeyPress={e => e.key === 'Enter' && handleLogin()} />
            </div>
            <Button onClick={handleLogin} className="w-full bg-yellow-400 text-black hover:bg-yellow-500">Login</Button>
            <Button onClick={() => navigate('/')} variant="outline" className="w-full border-gray-700 text-white hover:bg-gray-800">Back to Portfolio</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 px-4 py-6">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <Button variant="ghost" className="text-white hover:text-yellow-400 mb-4" onClick={() => navigate('/')}>
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
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-white">{orders.length}</div>
              <p className="text-gray-400">Total Orders</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-blue-400">{orders.filter(o => o.status === 'new').length}</div>
              <p className="text-gray-400">New Orders</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-yellow-400">{orders.filter(o => o.status === 'in-progress').length}</div>
              <p className="text-gray-400">In Progress</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-green-400">{orders.filter(o => o.status === 'completed').length}</div>
              <p className="text-gray-400">Completed</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-gray-900 border-gray-800 mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label className="text-white">Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input placeholder="Search orders..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 bg-gray-800 border-gray-700 text-white" />
                </div>
              </div>
              <div>
                <Label className="text-white">Status</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-white">Service</Label>
                <Select value={serviceFilter} onValueChange={setServiceFilter}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Services</SelectItem>
                    <SelectItem value="graphic">Graphic Design</SelectItem>
                    <SelectItem value="social">Social Media</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button onClick={exportOrders} variant="outline" className="border-gray-700 text-white">
                  <Download className="mr-2 h-4 w-4" /> Export
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Orders Table */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Orders ({filteredOrders.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 text-white">Order ID</th>
                    <th className="text-left py-3 px-4 text-white">Client</th>
                    <th className="text-left py-3 px-4 text-white">Service</th>
                    <th className="text-left py-3 px-4 text-white">Price</th>
                    <th className="text-left py-3 px-4 text-white">Status</th>
                    <th className="text-left py-3 px-4 text-white">Date</th>
                    <th className="text-left py-3 px-4 text-white">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-800 hover:bg-gray-800">
                      <td className="py-3 px-4 text-gray-300 font-mono text-sm">{order.id}</td>
                      <td className="py-3 px-4">
                        <div className="text-white">{order.name}</div>
                        <div className="text-gray-400 text-sm">{order.email}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-white">{order.service}</div>
                        <div className="text-gray-400 text-sm">{order.package}</div>
                      </td>
                      <td className="py-3 px-4 text-yellow-400 font-semibold">${order.price}</td>
                      <td className="py-3 px-4">
                        <Badge className={`${getStatusColor(order.status)} text-white`}>
                          {order.status.replace('-', ' ')}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline" className="border-gray-700 text-white" onClick={() => setSelectedOrder(order)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Order Details - {selectedOrder?.id}</DialogTitle>
                                <DialogDescription>Complete order information and management</DialogDescription>
                              </DialogHeader>
                              {selectedOrder && (
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label className="text-white">Client Name</Label>
                                      <p className="text-gray-300">{selectedOrder.name}</p>
                                    </div>
                                    <div>
                                      <Label className="text-white">Email</Label>
                                      <p className="text-gray-300">{selectedOrder.email}</p>
                                    </div>
                                    <div>
                                      <Label className="text-white">Phone</Label>
                                      <p className="text-gray-300">{selectedOrder.phone || 'N/A'}</p>
                                    </div>
                                    <div>
                                      <Label className="text-white">Company</Label>
                                      <p className="text-gray-300">{selectedOrder.company || 'N/A'}</p>
                                    </div>
                                  </div>

                                  <div>
                                    <Label className="text-white">Project Title</Label>
                                    <p className="text-gray-300">{selectedOrder.projectTitle}</p>
                                  </div>

                                  <div>
                                    <Label className="text-white">Requirements</Label>
                                    <p className="text-gray-300">{selectedOrder.requirements}</p>
                                  </div>

                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label className="text-white">Timeline</Label>
                                      <p className="text-gray-300">{selectedOrder.timeline}</p>
                                    </div>
                                    <div>
                                      <Label className="text-white">Payment Method</Label>
                                      <p className="text-gray-300">{selectedOrder.paymentMethod}</p>
                                    </div>
                                  </div>

                                  <div>
                                    <Label className="text-white">Status</Label>
                                    <Select value={selectedOrder.status} onValueChange={(value) => updateOrderStatus(selectedOrder.id, value as any)}>
                                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="new">New</SelectItem>
                                        <SelectItem value="in-progress">In Progress</SelectItem>
                                        <SelectItem value="completed">Completed</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>

                                  <div>
                                    <Label className="text-white">Notes</Label>
                                    <Textarea value={selectedOrder.notes || ''} onChange={(e) => updateOrderNotes(selectedOrder.id, e.target.value)} placeholder="Add notes about this order..." className="bg-gray-800 border-gray-700 text-white" />
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>

                          <Button size="sm" variant="destructive" onClick={() => deleteOrder(order.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredOrders.length === 0 && (
                <div className="text-center py-8 text-gray-400">No orders found matching your criteria.</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
