import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, CreditCard, Wallet, Building, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';

const services = {
  'graphic-design': {
    name: 'Graphic Design',
    packages: [
      { id: 'basic', name: 'Basic Package', price: 150, features: ['Logo Design', '3 Concepts', '2 Revisions', 'High-res Files'] },
      { id: 'standard', name: 'Standard Package', price: 300, features: ['Logo + Brand Identity', '5 Concepts', '4 Revisions', 'Brand Guidelines', 'Social Media Kit'] },
      { id: 'premium', name: 'Premium Package', price: 500, features: ['Complete Brand Package', 'Unlimited Concepts', 'Unlimited Revisions', 'Print Materials', 'Web Assets', '3 Months Support'] }
    ]
  },
  'social-media': {
    name: 'Social Media Marketing',
    packages: [
      { id: 'basic', name: 'Basic Package', price: 200, features: ['5 Posts/Week', 'Content Creation', 'Basic Analytics', '1 Platform'] },
      { id: 'standard', name: 'Standard Package', price: 400, features: ['10 Posts/Week', 'Content + Stories', 'Advanced Analytics', '2 Platforms', 'Community Management'] },
      { id: 'premium', name: 'Premium Package', price: 700, features: ['15 Posts/Week', 'Full Content Suite', 'Detailed Reports', '3 Platforms', 'Ad Campaign Management', 'Monthly Strategy Calls'] }
    ]
  }
};

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
}

const Order = () => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<string>('');
  const [selectedPackage, setSelectedPackage] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    projectTitle: '',
    requirements: '',
    timeline: '',
    name: '',
    email: '',
    phone: '',
    company: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const selectedServiceData = selectedService ? services[selectedService as keyof typeof services] : null;
  const selectedPackageData = selectedServiceData?.packages.find(pkg => pkg.id === selectedPackage);

  const generateOrderId = () => {
    return 'ORD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase();
  };

  const saveOrderToStorage = (orderData: OrderData) => {
    const existingOrders = JSON.parse(localStorage.getItem('portfolio_orders') || '[]');
    existingOrders.push(orderData);
    localStorage.setItem('portfolio_orders', JSON.stringify(existingOrders));
  };

  const sendEmailNotification = async (orderData: OrderData) => {
    // EmailJS configuration would go here
    // For now, we'll simulate email sending
    console.log('Sending email to raslen.lakrach123456789@gmail.com', orderData);
    
    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedService || !selectedPackage || !paymentMethod || !formData.name || !formData.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const orderId = generateOrderId();
      const orderData: OrderData = {
        id: orderId,
        service: selectedServiceData?.name || '',
        package: selectedPackageData?.name || '',
        projectTitle: formData.projectTitle,
        requirements: formData.requirements,
        timeline: formData.timeline,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        paymentMethod: paymentMethod,
        price: selectedPackageData?.price || 0,
        status: 'new',
        createdAt: new Date().toISOString()
      };

      // Save to localStorage
      saveOrderToStorage(orderData);

      // Send email notification
      await sendEmailNotification(orderData);

      toast({
        title: "Order Submitted Successfully!",
        description: `Your order ${orderId} has been received. Raslen will contact you within 24 hours.`,
      });

      // Reset form
      setSelectedService('');
      setSelectedPackage('');
      setPaymentMethod('');
      setFormData({
        projectTitle: '',
        requirements: '',
        timeline: '',
        name: '',
        email: '',
        phone: '',
        company: ''
      });

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit order. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 px-4 py-6">
        <div className="container mx-auto">
          <Button 
            variant="ghost" 
            className="text-white hover:text-yellow-400 mb-4"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Portfolio
          </Button>
          <h1 className="text-3xl font-bold">Start Your Project</h1>
          <p className="text-gray-400 mt-2">Let's bring your vision to life with professional design services</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Service Selection */}
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Select Service *</CardTitle>
                  <CardDescription>Choose the service that best fits your needs</CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={selectedService} onValueChange={setSelectedService}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="graphic-design" id="graphic-design" />
                      <Label htmlFor="graphic-design" className="text-white">Graphic Design</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="social-media" id="social-media" />
                      <Label htmlFor="social-media" className="text-white">Social Media Marketing</Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Package Selection */}
              {selectedServiceData && (
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Choose Package *</CardTitle>
                    <CardDescription>Select the package that matches your requirements</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup value={selectedPackage} onValueChange={setSelectedPackage}>
                      {selectedServiceData.packages.map((pkg) => (
                        <div key={pkg.id} className="border border-gray-700 rounded-lg p-4">
                          <div className="flex items-center space-x-2 mb-3">
                            <RadioGroupItem value={pkg.id} id={pkg.id} />
                            <Label htmlFor={pkg.id} className="text-white font-semibold">
                              {pkg.name} - ${pkg.price}
                            </Label>
                          </div>
                          <ul className="text-sm text-gray-400 ml-6">
                            {pkg.features.map((feature, index) => (
                              <li key={index} className="flex items-center">
                                <Check className="h-3 w-3 text-yellow-400 mr-2" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </RadioGroup>
                  </CardContent>
                </Card>
              )}

              {/* Project Details */}
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Project Details</CardTitle>
                  <CardDescription>Tell us about your project requirements</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="projectTitle" className="text-white">Project Title</Label>
                    <Input
                      id="projectTitle"
                      value={formData.projectTitle}
                      onChange={(e) => handleInputChange('projectTitle', e.target.value)}
                      placeholder="Enter your project title"
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="requirements" className="text-white">Project Requirements</Label>
                    <Textarea
                      id="requirements"
                      value={formData.requirements}
                      onChange={(e) => handleInputChange('requirements', e.target.value)}
                      placeholder="Describe your project requirements, goals, and any specific details..."
                      rows={4}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>

                  <div>
                    <Label htmlFor="timeline" className="text-white">Preferred Timeline</Label>
                    <Select onValueChange={(value) => handleInputChange('timeline', value)}>
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Select timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-week">1 Week</SelectItem>
                        <SelectItem value="2-weeks">2 Weeks</SelectItem>
                        <SelectItem value="1-month">1 Month</SelectItem>
                        <SelectItem value="2-months">2 Months</SelectItem>
                        <SelectItem value="flexible">Flexible</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-white">Reference Files (Optional)</Label>
                    <div className="mt-2 border-2 border-dashed border-gray-700 rounded-lg p-6 text-center">
                      <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-400">
                        Drop files here or <span className="text-yellow-400 cursor-pointer">browse</span>
                      </p>
                      <p className="text-xs text-gray-500 mt-1">PNG, JPG, PDF up to 10MB</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Contact Information</CardTitle>
                  <CardDescription>How can we reach you?</CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-white">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Your full name"
                      className="bg-gray-800 border-gray-700 text-white"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-white">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="your@email.com"
                      className="bg-gray-800 border-gray-700 text-white"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone" className="text-white">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="company" className="text-white">Company (Optional)</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      placeholder="Your company name"
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Payment Method *</CardTitle>
                  <CardDescription>Choose your preferred payment option</CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2 p-3 border border-gray-700 rounded-lg">
                      <RadioGroupItem value="card" id="card" />
                      <CreditCard className="h-5 w-5 text-gray-400" />
                      <Label htmlFor="card" className="text-white">Credit/Debit Card</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border border-gray-700 rounded-lg">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Wallet className="h-5 w-5 text-gray-400" />
                      <Label htmlFor="paypal" className="text-white">PayPal</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border border-gray-700 rounded-lg">
                      <RadioGroupItem value="bank" id="bank" />
                      <Building className="h-5 w-5 text-gray-400" />
                      <Label htmlFor="bank" className="text-white">Bank Transfer</Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <Card className="bg-gray-900 border-gray-800 sticky top-6">
                <CardHeader>
                  <CardTitle className="text-white">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedPackageData ? (
                    <>
                      <div>
                        <h3 className="font-semibold text-white">{selectedServiceData?.name}</h3>
                        <p className="text-sm text-gray-400">{selectedPackageData.name}</p>
                      </div>
                      
                      <Separator className="bg-gray-700" />
                      
                      <div className="space-y-2">
                        <h4 className="font-medium text-white">Included:</h4>
                        {selectedPackageData.features.map((feature, index) => (
                          <div key={index} className="flex items-center text-sm">
                            <Check className="h-3 w-3 text-yellow-400 mr-2" />
                            <span className="text-gray-300">{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      <Separator className="bg-gray-700" />
                      
                      <div className="flex justify-between items-center">
                        <span className="text-white">Subtotal:</span>
                        <span className="text-white">${selectedPackageData.price}</span>
                      </div>
                      
                      <div className="flex justify-between items-center font-bold text-lg">
                        <span className="text-white">Total:</span>
                        <span className="text-yellow-400">${selectedPackageData.price}</span>
                      </div>
                      
                      <Button 
                        type="submit"
                        className="w-full bg-yellow-400 text-black hover:bg-yellow-500 font-semibold"
                        disabled={!selectedService || !selectedPackage || !paymentMethod || isSubmitting}
                      >
                        {isSubmitting ? 'Submitting...' : 'Place Order'}
                      </Button>
                    </>
                  ) : (
                    <p className="text-gray-400 text-center py-8">
                      Select a service and package to see order summary
                    </p>
                  )}
                  
                  <div className="text-xs text-gray-500 text-center mt-4">
                    <p>Secure payment processing</p>
                    <p>30-day satisfaction guarantee</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Order;