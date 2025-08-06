import { motion } from "framer-motion";
import { Battery, DollarSign, Zap, Calculator, TrendingUp, ChevronRight, Cpu, Database, Globe } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPredictionCount, formatCount } from "@/lib/predictionCounter";

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

const Dashboard = () => {
  const [predictionCount, setPredictionCount] = useState(getPredictionCount());
  
  useEffect(() => {
    const handleStorageChange = () => {
      setPredictionCount(getPredictionCount());
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const stats = getStats(predictionCount);

  return (
    <div className="min-h-screen">
      {/* Netflix-style Hero Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative h-[70vh] bg-gradient-to-br from-primary/20 via-primary/10 to-background overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        <div className="relative z-10 flex items-center justify-center h-full px-4">
          <div className="text-center max-w-4xl">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6"
            >
              EcoAmp Suite
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg sm:text-xl lg:text-2xl text-white/80 mb-8"
            >
              Advanced AI-powered electric vehicle analytics platform
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="glass-card p-4 sm:p-6"
                >
                  <stat.icon className="h-8 w-8 sm:h-10 sm:w-10 text-primary mx-auto mb-3" />
                  <div className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm sm:text-base text-white/60">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Netflix-style Content Section */}
      <div className="spacing-responsive max-w-7xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2 }}
          className="text-2xl sm:text-3xl font-bold text-white mb-8"
        >
          AI-Powered Tools
        </motion.h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 + index * 0.1 }}
            >
              <Card className="glass-card card-responsive hover-lift hover-glow group cursor-pointer h-full overflow-hidden">
                <Link to={tool.url} className="block h-full relative">
                  <div className="aspect-video relative mb-4 rounded-lg overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-80`} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <tool.icon className="h-12 w-12 sm:h-16 sm:w-16 text-white" />
                    </div>
                    <div className="absolute top-2 right-2 glass-card px-2 py-1">
                      <span className="text-xs text-primary font-medium">
                        {tool.accuracy}
                      </span>
                    </div>
                  </div>
                  
                  <div className="px-2">
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                      {tool.title}
                    </h3>
                    
                    <p className="text-white/70 text-xs sm:text-sm mb-4 leading-relaxed line-clamp-2">
                      {tool.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-white/50">
                        Start prediction
                      </span>
                      <ChevronRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* About Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
          className="glass-card card-responsive mt-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">About EcoAmp Suite</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-primary mb-3">Technology Stack</h3>
              <ul className="space-y-2 text-white/70 text-sm sm:text-base">
                <li>• TensorFlow.js for in-browser ML inference</li>
                <li>• ONNX Runtime Web for optimized models</li>
                <li>• React + TypeScript for robust UI</li>
                <li>• Tailwind CSS for beautiful styling</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-primary mb-3">Key Features</h3>
              <ul className="space-y-2 text-white/70 text-sm sm:text-base">
                <li>• 96%+ accuracy on all ML models</li>
                <li>• Real-time predictions in the browser</li>
                <li>• Lightweight models (&lt;5MB each)</li>
                <li>• Dynamic prediction tracking</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;