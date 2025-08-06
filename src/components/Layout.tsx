import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import ParticleBackground from "@/components/ParticleBackground";
import { motion } from "framer-motion";
import { Zap } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full relative">
        <ParticleBackground />
        
        <AppSidebar />

        <div className="flex-1 flex flex-col relative z-10">
          {/* Header */}
          <motion.header 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card m-2 sm:m-4 mb-0 p-3 sm:p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-2 sm:gap-4">
              <SidebarTrigger className="glass-button p-2 hover-glow btn-touch" />
              <div className="flex items-center gap-2">
                <div className="p-1.5 sm:p-2 gradient-forest rounded-lg">
                  <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-sm sm:text-lg font-bold text-white">EcoAmp Suite</h1>
                  <p className="text-xs text-white/60">Machine Learning Analytics</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <div className="glass-card px-2 sm:px-3 py-1">
                <span className="text-xs text-primary font-medium">
                  96%+ Accuracy
                </span>
              </div>
            </div>
          </motion.header>

          {/* Main Content */}
          <main className="flex-1 p-2 sm:p-4 relative overflow-x-hidden">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h-full"
            >
              {children}
            </motion.div>
          </main>

          {/* Footer */}
          <motion.footer 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="glass-card m-2 sm:m-4 mt-0 p-3 sm:p-4 text-center"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-xs sm:text-sm text-white/60">
              <span>Built with TensorFlow.js & ONNX</span>
              <span className="hidden sm:inline">•</span>
              <span>Static ML Deployment</span>
              <span className="hidden sm:inline">•</span>
              <a 
                href="https://github.com/sharvesh1401" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors hover-glow btn-touch"
              >
                @sharvesh1401
              </a>
            </div>
          </motion.footer>
        </div>
      </div>
    </SidebarProvider>
  );
}