import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Palette, TrendingUp, Camera, Megaphone, BarChart3, Users } from 'lucide-react';

export default function Skills() {
  const skillCategories = [
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Graphic Design",
      description: "Creating visually stunning designs that communicate your brand's message effectively.",
      skills: ["Logo Design", "Brand Identity", "Print Design", "Digital Graphics", "Typography", "Color Theory"]
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Social Media Marketing",
      description: "Strategic social media campaigns that build engagement and drive business growth.",
      skills: ["Content Strategy", "Campaign Management", "Analytics", "Community Management", "Paid Advertising", "Influencer Marketing"]
    },
    {
      icon: <Camera className="w-8 h-8" />,
      title: "Visual Content Creation",
      description: "Producing compelling visual content optimized for various digital platforms.",
      skills: ["Photography", "Video Editing", "Infographics", "Social Media Graphics", "Web Graphics", "Motion Graphics"]
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Digital Strategy",
      description: "Data-driven approaches to maximize your digital presence and ROI.",
      skills: ["Market Research", "Competitor Analysis", "Performance Tracking", "A/B Testing", "Conversion Optimization", "ROI Analysis"]
    }
  ];

  return (
    <section id="skills" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Skills & <span className="text-yellow-400">Expertise</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Combining creative vision with strategic thinking to deliver exceptional results across design and marketing disciplines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {skillCategories.map((category, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-gray-200 hover:border-yellow-400"
            >
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-yellow-400 text-black rounded-lg mr-4 group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-black">{category.title}</h3>
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {category.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <Badge 
                      key={skillIndex} 
                      variant="secondary" 
                      className="bg-gray-100 text-gray-700 hover:bg-yellow-400 hover:text-black transition-colors duration-300 cursor-default"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Core Values */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-black mb-8">Core Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="group">
              <div className="p-4 bg-black text-yellow-400 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-semibold text-black mb-2">Client-Focused</h4>
              <p className="text-gray-600">Every project is tailored to meet your unique needs and exceed expectations.</p>
            </div>
            <div className="group">
              <div className="p-4 bg-black text-yellow-400 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Megaphone className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-semibold text-black mb-2">Results-Driven</h4>
              <p className="text-gray-600">Strategic approach focused on delivering measurable outcomes and ROI.</p>
            </div>
            <div className="group">
              <div className="p-4 bg-black text-yellow-400 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Palette className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-semibold text-black mb-2">Creative Excellence</h4>
              <p className="text-gray-600">Pushing creative boundaries while maintaining professional standards.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}