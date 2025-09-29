import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Palette, TrendingUp } from 'lucide-react';

const services = [
  {
    id: 'graphic-design',
    icon: Palette,
    title: 'Graphic Design',
    description: 'Professional visual identity and branding solutions',
    packages: [
      {
        name: 'Basic',
        price: 299,
        period: 'per project',
        features: [
          'Logo Design',
          '3 Concepts',
          '2 Revisions',
          'Basic Brand Guidelines',
          'PNG & JPG Files'
        ],
        popular: false
      },
      {
        name: 'Standard',
        price: 599,
        period: 'per project',
        features: [
          'Logo Design',
          '5 Concepts',
          '4 Revisions',
          'Complete Brand Guidelines',
          'Business Card Design',
          'Vector Files (AI, EPS)'
        ],
        popular: true
      },
      {
        name: 'Premium',
        price: 999,
        period: 'per project',
        features: [
          'Complete Brand Identity',
          'Unlimited Concepts',
          'Unlimited Revisions',
          'Full Brand Guidelines',
          'Marketing Materials',
          'All File Formats',
          '3 Months Support'
        ],
        popular: false
      }
    ]
  },
  {
    id: 'social-media',
    icon: TrendingUp,
    title: 'Social Media Marketing',
    description: 'Strategic content creation and social media management',
    packages: [
      {
        name: 'Basic',
        price: 399,
        period: 'per month',
        features: [
          '10 Posts/Month',
          'Content Calendar',
          'Basic Analytics',
          '1 Platform',
          'Community Management'
        ],
        popular: false
      },
      {
        name: 'Standard',
        price: 799,
        period: 'per month',
        features: [
          '20 Posts/Month',
          'Content Calendar',
          'Advanced Analytics',
          '3 Platforms',
          'Community Management',
          'Monthly Strategy Call'
        ],
        popular: true
      },
      {
        name: 'Premium',
        price: 1299,
        period: 'per month',
        features: [
          '30 Posts/Month',
          'Content Calendar',
          'Advanced Analytics',
          'All Platforms',
          'Community Management',
          'Weekly Strategy Calls',
          'Ad Campaign Management'
        ],
        popular: false
      }
    ]
  }
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-black mb-4">Services & Pricing</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Professional design and marketing solutions tailored to your business needs
          </p>
        </div>

        <div className="space-y-16">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div key={service.id} className="space-y-8">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-400 rounded-full mb-4">
                    <Icon className="w-8 h-8 text-black" />
                  </div>
                  <h3 className="text-3xl font-bold text-black mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-lg">{service.description}</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  {service.packages.map((pkg) => (
                    <Card key={pkg.name} className={`relative ${pkg.popular ? 'ring-2 ring-yellow-400 scale-105' : ''}`}>
                      {pkg.popular && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <Badge className="bg-yellow-400 text-black hover:bg-yellow-500">
                            Most Popular
                          </Badge>
                        </div>
                      )}
                      
                      <CardHeader className="text-center pb-4">
                        <CardTitle className="text-xl font-bold">{pkg.name}</CardTitle>
                        <div className="space-y-1">
                          <div className="text-3xl font-bold text-black">
                            ${pkg.price}
                          </div>
                          <CardDescription className="text-sm">
                            {pkg.period}
                          </CardDescription>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="space-y-6">
                        <ul className="space-y-3">
                          {pkg.features.map((feature, index) => (
                            <li key={index} className="flex items-center text-sm">
                              <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        
                        <Link 
                          to={`/order?service=${service.id}&package=${pkg.name.toLowerCase()}`}
                          className="block"
                        >
                          <Button 
                            className={`w-full ${
                              pkg.popular 
                                ? 'bg-yellow-400 hover:bg-yellow-500 text-black' 
                                : 'bg-black hover:bg-gray-800 text-white'
                            }`}
                          >
                            Get Started
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-600 mb-4">
            Need a custom solution? Let's discuss your specific requirements.
          </p>
          <Link to="/order?service=custom&package=consultation">
            <Button variant="outline" className="border-black text-black hover:bg-black hover:text-white">
              Request Custom Quote
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}