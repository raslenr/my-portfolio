import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Eye } from 'lucide-react';

export default function Portfolio() {
  // Real portfolio projects from the uploaded work files
  const projects = [
    {
      id: "fashion_industry_logo_mockup",
      title: "Fashion Industry Logo Mockup",
      description: "Professional logo design for fashion industry with modern branding approach",
      category: "Graphic Design",
      industry: "Fashion",
      image_path: "/work/Fashion Industry Logo Mockup.png",
      tags: ["logo design", "fashion", "branding", "mockup"]
    },
    {
      id: "finance_industry_logo_mockup",
      title: "Finance Industry Logo Mockup",
      description: "Corporate logo design for finance industry with professional aesthetic",
      category: "Graphic Design",
      industry: "Finance",
      image_path: "/work/Finance Industry Logo Mockup.png",
      tags: ["logo design", "finance", "corporate", "mockup"]
    },
    {
      id: "fitness_industry_logo_mockup",
      title: "Fitness Industry Logo Mockup",
      description: "Dynamic logo design for fitness industry with energetic branding",
      category: "Graphic Design",
      industry: "Fitness",
      image_path: "/work/Fitness Industry Logo Mockup.png",
      tags: ["logo design", "fitness", "sports", "mockup"]
    },
    {
      id: "food_industry_logo_mockup",
      title: "Food Industry Logo Mockup",
      description: "Creative logo design for food industry with appetizing visual appeal",
      category: "Graphic Design",
      industry: "Food & Beverage",
      image_path: "/work/Food Industry Logo Mockup.png",
      tags: ["logo design", "food", "restaurant", "mockup"]
    },
    {
      id: "tech_logo_design_mockup",
      title: "Tech Logo Design Mockup",
      description: "Modern logo design for technology company with innovative branding",
      category: "Graphic Design",
      industry: "Technology",
      image_path: "/work/Tech Logo Design Mockup.png",
      tags: ["logo design", "technology", "modern", "mockup"]
    },
    {
      id: "facebook_carousel_ad_fashion",
      title: "Facebook Carousel Ad - Fashion Collection",
      description: "Engaging Facebook carousel ad design for fashion collection showcase",
      category: "Social Media Marketing",
      industry: "Fashion",
      image_path: "/work/Facebook Carousel Ad - Fashion Collection.png",
      tags: ["facebook ads", "carousel", "fashion", "social media"]
    },
    {
      id: "facebook_single_image_ad_tech",
      title: "Facebook Single Image Ad - Tech Product",
      description: "High-converting Facebook single image ad for tech product promotion",
      category: "Social Media Marketing",
      industry: "Technology",
      image_path: "/work/Facebook Single Image Ad - Tech Product.png",
      tags: ["facebook ads", "single image", "tech", "product promotion"]
    },
    {
      id: "linkedin_industry_insight_template",
      title: "LinkedIn Industry Insight Template",
      description: "Professional LinkedIn industry insight template for business engagement",
      category: "Social Media Marketing",
      industry: "Business",
      image_path: "/work/LinkedIn Industry Insight Template.png",
      tags: ["linkedin", "template", "industry insights", "business"]
    }
  ];

  return (
    <section id="portfolio" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Featured <span className="text-yellow-400">Projects</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A showcase of recent work demonstrating expertise in graphic design and social media marketing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <Card 
              key={index} 
              className="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white border-gray-200 hover:border-yellow-400"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={project.image_path} 
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    // Fallback to a placeholder if image fails to load
                    e.currentTarget.src = "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop";
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-3">
                    <Button size="sm" className="bg-yellow-400 hover:bg-yellow-500 text-black">
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Details
                    </Button>
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Badge 
                    variant="secondary" 
                    className={`${
                      project.category === 'Graphic Design'
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {project.category}
                  </Badge>
                  {project.industry && (
                    <Badge variant="outline" className="text-xs border-gray-300 text-gray-600">
                      {project.industry}
                    </Badge>
                  )}
                </div>
                
                <h3 className="text-xl font-bold text-black mb-3 group-hover:text-yellow-600 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <Badge 
                      key={tagIndex} 
                      variant="outline" 
                      className="text-xs border-gray-300 text-gray-600 hover:border-yellow-400 hover:text-yellow-600 transition-colors"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Portfolio Stats */}
        <div className="mt-20 bg-black rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">8+</div>
              <div className="text-gray-300">Projects Completed</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">30+</div>
              <div className="text-gray-300">Happy Clients</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">5+</div>
              <div className="text-gray-300">Industries Served</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">200%</div>
              <div className="text-gray-300">Avg. ROI Increase</div>
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-black mb-8">Portfolio Breakdown</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-yellow-400 transition-colors">
              <div className="text-3xl font-bold text-yellow-600 mb-2">5</div>
              <div className="text-lg font-semibold text-black mb-2">Graphic Design Projects</div>
              <p className="text-gray-600">Logo design, branding, print materials, and visual identity systems</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:border-yellow-400 transition-colors">
              <div className="text-3xl font-bold text-yellow-600 mb-2">3</div>
              <div className="text-lg font-semibold text-black mb-2">Social Media Projects</div>
              <p className="text-gray-600">Campaign management, content creation, and digital marketing strategies</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}