import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Phone, MapPin, Send, Calendar, MessageCircle } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      company: '',
      service: '',
      message: ''
    });
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      value: "raslen.lakrach123456789@gmail.com",
      link: "mailto:raslen.lakrach123456789@gmail.com"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      value: "25666856",
      link: "tel:+15551234567"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Location",
      value: "Available Worldwide",
      link: null
    }
  ];

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Let's Work <span className="text-yellow-400">Together</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to elevate your brand? Get in touch to discuss your project and discover how we can bring your vision to life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="shadow-xl border-gray-200 hover:border-yellow-400 transition-colors duration-300">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-black flex items-center">
                <MessageCircle className="w-6 h-6 text-yellow-400 mr-3" />
                Send a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-black font-medium">Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="mt-1 border-gray-300 focus:border-yellow-400 focus:ring-yellow-400"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-black font-medium">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="mt-1 border-gray-300 focus:border-yellow-400 focus:ring-yellow-400"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="company" className="text-black font-medium">Company</Label>
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="mt-1 border-gray-300 focus:border-yellow-400 focus:ring-yellow-400"
                      placeholder="Your company name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="service" className="text-black font-medium">Service Interest</Label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:border-yellow-400 focus:ring-yellow-400 bg-white"
                    >
                      <option value="">Select a service</option>
                      <option value="logo-design">Logo Design</option>
                      <option value="social-media-posts">Social Media Posts/Templates</option>
                      <option value="flyers-brochures">Flyers & Brochures</option>
                      <option value="single-platform">Single Platform Management</option>
                      <option value="multi-platform">Multi-Platform Management</option>
                      <option value="ad-campaign">Ad Campaign Setup & Management</option>
                      <option value="starter-package">Starter Package</option>
                      <option value="consultation">Consultation</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="message" className="text-black font-medium">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="mt-1 border-gray-300 focus:border-yellow-400 focus:ring-yellow-400"
                    placeholder="Tell me about your project, goals, and timeline..."
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 text-lg transition-all duration-300 hover:scale-105 group"
                >
                  <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <Card className="shadow-xl border-gray-200 hover:border-yellow-400 transition-colors duration-300">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-black flex items-center">
                  <Calendar className="w-6 h-6 text-yellow-400 mr-3" />
                  Get in Touch
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-center group">
                    <div className="p-3 bg-yellow-400 text-black rounded-lg mr-4 group-hover:scale-110 transition-transform duration-300">
                      {info.icon}
                    </div>
                    <div>
                      <div className="font-semibold text-black">{info.title}</div>
                      {info.link ? (
                        <a 
                          href={info.link} 
                          className="text-gray-600 hover:text-yellow-600 transition-colors break-all"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <div className="text-gray-600">{info.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Availability */}
            <Card className="bg-black text-white shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">
                  <span className="text-yellow-400">Available</span> for New Projects
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  I'm currently accepting new clients and projects. Let's discuss how we can work together to achieve your goals.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
                    <span>Response within 24 hours</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
                    <span>Free initial consultation</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
                    <span>Flexible project timelines</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="shadow-xl border-gray-200 hover:border-yellow-400 transition-colors duration-300">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-black mb-4">Follow My Work</h3>
                <div className="flex space-x-4">
                  {[
                    { name: 'LinkedIn', url: '#' },
                    { name: 'Facebook', url: 'https://www.facebook.com/raslen.lakrach.2025/' },
                    { name: 'instagram', url: 'https://www.instagram.com/lakrachraslen/' },
                    { name: 'Dribbble', url: '#' }
                  ].map((social, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="border-gray-300 hover:border-yellow-400 hover:text-yellow-600 transition-colors"
                      asChild
                    >
                      <a href={social.url} target="_blank" rel="noopener noreferrer">
                        {social.name}
                      </a>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}