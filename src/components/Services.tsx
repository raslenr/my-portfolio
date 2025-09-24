import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, ArrowRight, Star, Percent } from 'lucide-react';

export default function Services() {
  const graphicDesignServices = [
    {
      title: "Logo Design",
      price: "150DT - 300DT",
      description: "Professional logo design that captures your brand identity and values.",
      features: [
        "Multiple concept variations",
        "Vector files (AI, EPS, SVG)",
        "High-resolution formats",
        "Brand color palette",
        "Usage guidelines",
        "Unlimited revisions"
      ]
    },
    {
      title: "Social Media Posts/Templates",
      price: "40DT - 90DT per design",
      description: "Eye-catching social media graphics optimized for engagement.",
      features: [
        "Platform-specific sizing",
        "Brand-consistent design",
        "High-quality graphics",
        "Editable templates",
        "Multiple format exports",
        "Quick turnaround"
      ]
    },
    {
      title: "Flyers & Brochures",
      price: "90DT - 200DT",
      description: "Professional print materials that effectively communicate your message.",
      features: [
        "Print-ready files",
        "Custom layout design",
        "Professional typography",
        "High-resolution images",
        "Multiple size options",
        "Digital & print versions"
      ]
    }
  ];

  const socialMediaServices = [
    {
      title: "Single Platform Management",
      price: "300DT - 600DT/month",
      description: "Complete management of one social media platform with posts and engagement.",
      features: [
        "Daily content posting",
        "Community engagement",
        "Hashtag research",
        "Performance analytics",
        "Content calendar",
        "Monthly reports"
      ]
    },
    {
      title: "Multi-Platform Management",
      price: "600DT - 1200DT/month",
      description: "Comprehensive social media management across multiple platforms.",
      features: [
        "3-5 platform management",
        "Cross-platform strategy",
        "Daily posting & engagement",
        "Advanced analytics",
        "Competitor analysis",
        "Growth optimization"
      ],
      popular: true
    },
    {
      title: "Ad Campaign Setup & Management",
      price: "150DT - 300DT per campaign",
      description: "Strategic ad campaigns designed to maximize your ROI and reach.",
      features: [
        "Campaign strategy development",
        "Audience targeting",
        "Creative asset creation",
        "Performance monitoring",
        "A/B testing",
        "ROI optimization"
      ]
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Services & <span className="text-yellow-400">Pricing</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transparent, competitive pricing for professional creative and marketing services that deliver results.
          </p>
        </div>

        {/* Graphic Design Services */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-black mb-4">
              🎨 Graphic Design Services
            </h3>
            <p className="text-gray-600">Professional visual design solutions for your brand</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {graphicDesignServices.map((service, index) => (
              <Card 
                key={index} 
                className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-gray-200 hover:border-yellow-400"
              >
                <CardHeader className="text-center">
                  <CardTitle className="text-xl font-bold text-black mb-2">
                    {service.title}
                  </CardTitle>
                  <div className="text-2xl font-bold text-yellow-600 mb-4">
                    {service.price}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm">
                        <Check className="w-4 h-4 text-yellow-400 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button className="w-full bg-black hover:bg-gray-800 text-white transition-all duration-300 group">
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Social Media Marketing Services */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-black mb-4">
              📱 Social Media Marketing Services
            </h3>
            <p className="text-gray-600">Strategic social media solutions to grow your online presence</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {socialMediaServices.map((service, index) => (
              <Card 
                key={index} 
                className={`relative overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ${
                  service.popular 
                    ? 'border-yellow-400 shadow-lg scale-105' 
                    : 'border-gray-200 hover:border-yellow-400'
                }`}
              >
                {service.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-yellow-400 text-black text-center py-2 text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                
                <CardHeader className={`text-center ${service.popular ? 'pt-12' : 'pt-6'}`}>
                  <CardTitle className="text-xl font-bold text-black mb-2">
                    {service.title}
                  </CardTitle>
                  <div className="text-2xl font-bold text-yellow-600 mb-4">
                    {service.price}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm">
                        <Check className="w-4 h-4 text-yellow-400 mr-2 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full ${
                      service.popular
                        ? 'bg-yellow-400 hover:bg-yellow-500 text-black'
                        : 'bg-black hover:bg-gray-800 text-white'
                    } transition-all duration-300 group`}
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Special Packages */}
        <div className="bg-gradient-to-r from-black via-gray-900 to-black rounded-2xl p-8 md:p-12 text-white mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              ⭐ Special <span className="text-yellow-400">Packages</span>
            </h3>
            <p className="text-gray-300">Exclusive offers designed to get you started with professional branding</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Card className="bg-yellow-400 text-black border-0 shadow-2xl">
              <CardHeader className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-black mr-2" />
                  <CardTitle className="text-2xl font-bold">Starter Package</CardTitle>
                  <Star className="w-6 h-6 text-black ml-2" />
                </div>
                <div className="text-3xl font-bold mb-2">200DT - 250DT</div>
                <p className="text-black/80">Perfect for first-time clients and new businesses</p>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-lg font-semibold mb-2">✨ Logo Design</div>
                    <p className="text-sm text-black/70">Professional brand identity</p>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold mb-2">📱 3 Social Media Posts</div>
                    <p className="text-sm text-black/70">Ready-to-use content</p>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold mb-2">🎨 1 Branded Template</div>
                    <p className="text-sm text-black/70">Customizable design template</p>
                  </div>
                </div>
                
                <div className="text-center">
                  <Button className="bg-black hover:bg-gray-800 text-white px-8 py-3 text-lg font-semibold">
                    Claim Your Starter Package
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Discounts & Benefits */}
        <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-black mb-4">
              💰 Discounts & <span className="text-yellow-400">Benefits</span>
            </h3>
            <p className="text-gray-600">Save more with bulk orders and long-term partnerships</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center group">
              <div className="p-4 bg-yellow-400 text-black rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Percent className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-semibold text-black mb-2">10% Off 3-Month Contracts</h4>
              <p className="text-gray-600">Commit to a quarterly partnership and save on ongoing services.</p>
            </div>
            
            <div className="text-center group">
              <div className="p-4 bg-yellow-400 text-black rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Badge className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-semibold text-black mb-2">Bulk Work Discounts</h4>
              <p className="text-gray-600">Order multiple designs or services together for special pricing.</p>
            </div>
            
            <div className="text-center group">
              <div className="p-4 bg-yellow-400 text-black rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Star className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-semibold text-black mb-2">Premium Quality</h4>
              <p className="text-gray-600">Professional portfolio quality with fast delivery guaranteed.</p>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-gray-700 font-medium">
              🚀 <strong>Why Choose My Services:</strong> Professional quality • Fast delivery • Competitive pricing • Unlimited revisions • 100% satisfaction guarantee
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}