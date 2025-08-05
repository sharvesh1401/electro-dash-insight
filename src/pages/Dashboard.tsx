import { motion } from "framer-motion";
import { Battery, DollarSign, Zap, Calculator, TrendingUp, ChevronRight, Cpu, Database, Globe } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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

const stats = [
  { label: "ML Models", value: "5", icon: Cpu },
  { label: "Data Points", value: "500K+", icon: Database },
  { label: "Predictions Made", value: "10M+", icon: Globe },
];

const Dashboard = () => {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 text-center"
      >
        <h1 className="text-4xl font-bold text-white mb-4">
          EV Toolkit Dashboard
        </h1>
        <p className="text-xl text-white/80 mb-6">
          Machine Learning-powered analytics for electric vehicles
        </p>
        <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-4"
            >
              <stat.icon className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-white/60">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, index) => (
          <motion.div
            key={tool.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            <Card className="glass-card p-6 hover-lift hover-glow group cursor-pointer h-full">
              <Link to={tool.url} className="block h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${tool.color}`}>
                    <tool.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="glass-card px-2 py-1">
                    <span className="text-xs text-primary font-medium">
                      {tool.accuracy}
                    </span>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                  {tool.title}
                </h3>
                
                <p className="text-white/70 text-sm mb-4 leading-relaxed">
                  {tool.description}
                </p>
                
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xs text-white/50">
                    Click to explore
                  </span>
                  <ChevronRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="glass-card p-6"
      >
        <h2 className="text-2xl font-bold text-white mb-4">About EV Toolkit</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-primary mb-2">Technology Stack</h3>
            <ul className="space-y-2 text-white/70">
              <li>• TensorFlow.js for in-browser ML inference</li>
              <li>• ONNX Runtime Web for optimized models</li>
              <li>• React + TypeScript for robust UI</li>
              <li>• Tailwind CSS for beautiful styling</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-primary mb-2">Key Features</h3>
            <ul className="space-y-2 text-white/70">
              <li>• 96%+ accuracy on all ML models</li>
              <li>• No backend required - fully static</li>
              <li>• Real-time predictions in the browser</li>
              <li>• Lightweight models (&lt;5MB each)</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;