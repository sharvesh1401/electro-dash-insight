import { motion } from "framer-motion";
import { Battery, DollarSign, Zap, Calculator, TrendingUp, ChevronRight, Cpu, Database, Globe, Github, ExternalLink, X, ArrowLeft, FileText, User, Menu } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPredictionCount, formatCount } from "@/lib/predictionCounter";
import { useScrollDirection } from "@/hooks/useScrollDirection";

const tools = [
  { 
    title: "Range Estimator", 
    description: "Predict driving range based on battery status, weather, and driving patterns",
    url: "/range", 
    icon: Battery,
    accuracy: "97.2%",
    color: "from-emerald-500 to-teal-600"
  },
  { 
    title: "SoH Predictor", 
    description: "Analyze battery State of Health using ML algorithms",
    url: "/soh", 
    icon: TrendingUp,
    accuracy: "96.8%",
    color: "from-blue-500 to-cyan-600"
  },
  { 
    title: "Charging Cost Forecaster", 
    description: "Predict charging costs based on location and time",
    url: "/cost", 
    icon: DollarSign,
    accuracy: "98.1%",
    color: "from-purple-500 to-pink-600"
  },
  { 
    title: "Regen Energy Predictor", 
    description: "Estimate energy recovery potential from regenerative braking",
    url: "/regen", 
    icon: Zap,
    accuracy: "95.9%",
    color: "from-orange-500 to-red-600"
  },
  { 
    title: "Used EV Price Estimator", 
    description: "Predict market value of used electric vehicles",
    url: "/price", 
    icon: Calculator,
    accuracy: "97.5%",
    color: "from-green-500 to-emerald-600"
  }
];

const getStats = (predictionCount: number) => [
  { label: "ML Models", value: "5", icon: Cpu },
  { label: "Data Points", value: "2.5M+", icon: Database },
  { label: "Predictions Made", value: formatCount(predictionCount), icon: Globe },
];

const navigationTools = [
  { title: "Range Estimator", url: "/range", icon: Battery, description: "Predict driving range" },
  { title: "SoH Predictor", url: "/soh", icon: TrendingUp, description: "Battery health analysis" },
  { title: "Charging Cost", url: "/cost", icon: DollarSign, description: "Cost forecasting" },
  { title: "Regen Energy", url: "/regen", icon: Zap, description: "Energy recovery prediction" },
  { title: "Price Estimator", url: "/price", icon: Calculator, description: "Used EV pricing" },
];

const externalLinks = [
  {
    title: "GitHub",
    url: "https://github.com/sharvesh1401",
    icon: Github,
  },
  { 
    title: "Portfolio",
    url: "https://sharveshfolio.netlify.app", 
    icon: User,
    image: "/lovable-uploads/8cceda4a-4ebb-4a8a-8675-606c061f1fd0.png"
  },
];

const Dashboard = () => {
  const [predictionCount, setPredictionCount] = useState(getPredictionCount());
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isOnToolPage = location.pathname !== '/';
  const scrollDirection = useScrollDirection();
  
  useEffect(() => {
    const handleStorageChange = () => {
      setPredictionCount(getPredictionCount());
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleSections(prev => new Set(prev).add(entry.target.id));
        }
      });
    }, observerOptions);

    document.querySelectorAll('.scroll-section').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const stats = getStats(predictionCount);

  return (
    <div className="min-h-screen scroll-container">
      {/* Enhanced Header Navigation */}
      <motion.header 
        initial={{ y: 0 }}
        animate={{ y: scrollDirection === 'down' ? -150 : 0 }}
        transition={{ duration: 0.3 }}
        className="sticky top-0 z-50 glass-card-enhanced m-2 sm:m-4 mb-0 p-4 sm:p-6"
      >
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 sm:p-4 gradient-nature rounded-2xl shadow-xl">
              <Zap className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-2xl font-bold text-emerald-100">EcoAmp Suite</h1>
              <p className="text-sm sm:text-base text-emerald-200/80">AI-Powered EV Analytics</p>
            </div>
          </div>
          
          {/* Quick Navigation - Hidden on Tool Pages */}
          {!isOnToolPage && (
            <div className="hidden lg:flex flex-wrap gap-3 lg:gap-4">
              {navigationTools.map((tool) => (
                <Link key={tool.title} to={tool.url}>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="glass-button-enhanced text-sm hover:text-emerald-300 hover:border-emerald-400/40 hover:bg-emerald-500/15 btn-touch transition-all duration-300 hover:scale-105"
                  >
                    <tool.icon className="h-4 w-4 mr-2" />
                    <span className="hidden md:inline">{tool.title}</span>
                    <span className="md:hidden">{tool.title.split(' ')[0]}</span>
                  </Button>
                </Link>
              ))}
            </div>
          )}

          {/* Enhanced External Links & Hamburger Menu */}
          <div className="flex items-center gap-4">
            {externalLinks.map((link) => (
              <a
                key={link.title}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-button-enhanced p-3 hover:text-emerald-300 transition-all duration-300 btn-touch hover:scale-105 flex items-center gap-2"
                title={link.title}
              >
                {link.image ? (
                  <div className="flex items-center gap-2">
                    <img
                      src={link.image}
                      alt="Profile"
                     className="h-6 w-6 rounded-full object-cover"
                    />
                   <span className="hidden sm:inline text-sm font-medium text-emerald-100">Portfolio</span>
                  </div>
                ) : (
                  <>
                    <link.icon className="h-5 w-5" />
                    <span className="hidden sm:inline text-sm font-medium">{link.title}</span>
                  </>
                )}
              </a>
            ))}
            <div className="lg:hidden">
              <Button onClick={() => setIsMenuOpen(!isMenuOpen)} variant="ghost" size="icon" className="glass-button-enhanced" aria-label="Open menu">
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:hidden mt-4"
          >
            <div className="flex flex-col gap-2">
              {navigationTools.map((tool) => (
                <Link key={tool.title} to={tool.url}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start glass-button-enhanced text-sm hover:text-emerald-300 hover:border-emerald-400/40 hover:bg-emerald-500/15 btn-touch transition-all duration-300 hover:scale-105"
                  >
                    <tool.icon className="h-4 w-4 mr-2" />
                    <span>{tool.title}</span>
                  </Button>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </motion.header>

      {/* Enhanced Netflix-style Hero Section */}
      {!isOnToolPage && (
        <motion.section
          id="hero"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="scroll-section relative h-[70vh] sm:h-[80vh] bg-gradient-to-br from-emerald-500/10 via-teal-600/5 to-background overflow-hidden m-2 sm:m-4 rounded-3xl"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-transparent to-transparent rounded-3xl" />
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-emerald-400/15 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-teal-500/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-green-400/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
          </div>
          
          <div className="relative z-10 flex items-center justify-center h-full px-4">
            <div className="text-center max-w-5xl">
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 relative"
              >
                <div className="liquid-glass-text">
                  EcoAmp Suite
                </div>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg sm:text-2xl lg:text-3xl text-emerald-100/95 mb-12 font-light leading-relaxed"
              >
                Next-generation AI analytics for electric vehicles
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="glass-card-enhanced p-6 sm:p-8 hover-lift hover-glow-nature group"
                  >
                    <stat.icon className="h-8 w-8 sm:h-12 sm:w-12 text-emerald-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                    <div className="text-2xl sm:text-4xl font-bold text-emerald-100 mb-2">{stat.value}</div>
                    <div className="text-sm sm:text-lg text-emerald-200/80 font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.section>
      )}

      {/* Enhanced Netflix-style Content Section */}
      {!isOnToolPage && (
        <section 
          id="tools"
          className="scroll-section spacing-responsive max-w-7xl mx-auto px-4 sm:px-6"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ 
              opacity: visibleSections.has('tools') ? 1 : 0, 
              x: visibleSections.has('tools') ? 0 : -20 
            }}
            transition={{ duration: 0.6 }}
            className="mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              AI-Powered Tools
            </h2>
            <p className="text-lg sm:text-xl text-emerald-100/80 max-w-2xl">
              Cutting-edge machine learning models for comprehensive EV analytics
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: visibleSections.has('tools') ? 1 : 0, 
                  y: visibleSections.has('tools') ? 0 : 20 
                }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="scroll-fade-in"
              >
                <Card className="glass-card-enhanced card-responsive hover-lift hover-glow-nature group cursor-pointer h-full overflow-hidden relative">
                  <Link to={tool.url} className="block h-full relative z-10">
                    <div className="aspect-video relative mb-6 rounded-2xl overflow-hidden shadow-xl">
                      <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-90`} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <tool.icon className="h-14 w-14 sm:h-20 sm:w-20 text-white drop-shadow-lg group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <div className="absolute top-4 right-4 glass-card-enhanced px-3 py-1.5 bg-white/15">
                        <span className="text-xs font-semibold text-emerald-300">
                          {tool.accuracy}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg sm:text-xl font-bold text-emerald-100 mb-2 group-hover:text-emerald-300 transition-colors duration-300">
                        {tool.title}
                      </h3>
                      
                      <p className="text-emerald-200/85 text-sm sm:text-base leading-relaxed line-clamp-2">
                        {tool.description}
                      </p>
                      
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-xs text-emerald-300/70 font-medium">
                          Launch Tool
                        </span>
                        <ChevronRight className="h-5 w-5 text-emerald-400 group-hover:translate-x-2 transition-transform duration-300" />
                      </div>
                    </div>
                  </Link>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      )}

        {/* Enhanced About Section */}
        {!isOnToolPage && (
          <section 
            id="about"
            className="scroll-section mt-16 sm:mt-24"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: visibleSections.has('about') ? 1 : 0, 
                y: visibleSections.has('about') ? 0 : 20 
              }}
              transition={{ duration: 0.6 }}
              className="glass-card card-responsive"
            >
              <h2 className="text-2xl sm:text-4xl font-bold text-emerald-100 mb-6 sm:mb-8">About EcoAmp Suite</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: visibleSections.has('about') ? 1 : 0, 
                    x: visibleSections.has('about') ? 0 : -20 
                  }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <h3 className="text-lg sm:text-2xl font-semibold text-emerald-400 mb-4 flex items-center gap-2">
                    <Cpu className="h-6 w-6" />
                    Technology Stack
                  </h3>
                  <ul className="space-y-3 text-emerald-200/85 text-sm sm:text-base">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                      TensorFlow.js for in-browser ML inference
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                      ONNX Runtime Web for optimized models
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                      React + TypeScript for robust UI
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                      Tailwind CSS for beautiful styling
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                      Tailwind CSS for beautiful styling
                    </li>
                  </ul>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ 
                    opacity: visibleSections.has('about') ? 1 : 0, 
                    x: visibleSections.has('about') ? 0 : 20 
                  }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <h3 className="text-lg sm:text-2xl font-semibold text-emerald-400 mb-4 flex items-center gap-2">
                    <TrendingUp className="h-6 w-6" />
                    Key Features
                  </h3>
                  <ul className="space-y-3 text-emerald-200/85 text-sm sm:text-base">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                      High accuracy ML predictions
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                      Real-time predictions in the browser
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                      Lightweight models (&lt;5MB each)
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                      Dynamic prediction tracking
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                      Nature-inspired design system
                    </li>
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          </section>
        )}
        
        {/* Enhanced Footer */}
        <motion.footer 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.0 }}
          className="glass-card card-responsive mt-12 sm:mt-16 text-center"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 text-sm sm:text-base text-emerald-200/70">
            <span className="font-medium">Built with TensorFlow.js & ONNX</span>
            <span className="hidden sm:inline text-emerald-300/40">•</span>
            <span className="font-medium">Static ML Deployment</span>
            <span className="hidden sm:inline text-emerald-300/40">•</span>
            <div className="flex items-center gap-2">
              <span>Created by Sharvesh</span>
            </div>
          </div>
        </motion.footer>
    </div>
  );
};

export default Dashboard;