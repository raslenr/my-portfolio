import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/lib/supabaseClient';

const Order = () => {
  const navigate = useNavigate();

  // Form states
  const [service, setService] = useState('');
  const [packageType, setPackageType] = useState('');
  const [projectTitle, setProjectTitle] = useState('');
  const [requirements, setRequirements] = useState('');
  const [timeline, setTimeline] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!service || !packageType || !projectTitle || !name || !email) {
      alert('Please fill all required fields.');
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.from('orders').insert([
      {
        service,
        package: packageType,
        project_title: projectTitle,
        details: requirements,
        timeline,
        name,
        email,
        phone,
        company,
        payment_method: paymentMethod,
        price: price || 0,
        status: 'new',
        created_at: new Date().toISOString()
      }
    ]);

    setLoading(false);

    if (error) {
      console.error('Error submitting order:', error);
      alert('Failed to submit order. Please try again.');
    } else {
      alert('Order submitted successfully!');
      // Reset form
      setService('');
      setPackageType('');
      setProjectTitle('');
      setRequirements('');
      setTimeline('');
      setName('');
      setEmail('');
      setPhone('');
      setCompany('');
      setPaymentMethod('');
      setPrice('');
      navigate('/thank-you'); // optional redirect
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl space-y-6">
        <h1 className="text-3xl font-bold text-center">Place Your Order</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Service</Label>
            <Select onValueChange={setService} value={service}>
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Select service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Web Design">Web Design</SelectItem>
                <SelectItem value="Graphic Design">Graphic Design</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Package</Label>
            <Select onValueChange={setPackageType} value={packageType}>
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Select package" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Basic">Basic</SelectItem>
                <SelectItem value="Standard">Standard</SelectItem>
                <SelectItem value="Premium">Premium</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="md:col-span-2">
            <Label>Project Title</Label>
            <Input
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>

          <div className="md:col-span-2">
            <Label>Requirements</Label>
            <Textarea
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
              rows={4}
            />
          </div>

          <div>
            <Label>Timeline</Label>
            <Input
              value={timeline}
              onChange={(e) => setTimeline(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>

          <div>
            <Label>Price</Label>
            <Input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>

          <div>
            <Label>Name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>

          <div>
            <Label>Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>

          <div>
            <Label>Phone</Label>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>

          <div>
            <Label>Company</Label>
            <Input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>

          <div>
            <Label>Payment Method</Label>
            <Select onValueChange={setPaymentMethod} value={paymentMethod}>
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Credit Card">Credit Card</SelectItem>
                <SelectItem value="PayPal">PayPal</SelectItem>
                <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          onClick={handleSubmit}
          className="w-full bg-yellow-400 text-black hover:bg-yellow-500"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit Order'}
        </Button>
      </div>
    </div>
  );
};

export default Order;
