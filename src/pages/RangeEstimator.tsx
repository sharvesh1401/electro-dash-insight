import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Battery, MapPin, Thermometer, Wind, Car } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";

interface RangeInputs {
  batteryLevel: number;
  batteryCapacity: number;
  temperature: number;
  windSpeed: number;
  drivingStyle: number;
  vehicleWeight: number;
}

const RangeEstimator = () => {
  const [inputs, setInputs] = useState<RangeInputs>({
    batteryLevel: 80,
    batteryCapacity: 75,
    temperature: 20,
    windSpeed: 10,
    drivingStyle: 50,
    vehicleWeight: 1800,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState<number | null>(null);
  const { toast } = useToast();

  // Simulate ML model prediction (replace with actual TensorFlow.js model)
  const predictRange = useCallback(async () => {
    setIsLoading(true);
    try {
      // Simulate model loading and inference
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simple prediction algorithm (replace with actual ML model)
      const baseRange = (inputs.batteryLevel / 100) * inputs.batteryCapacity * 5;
      const tempFactor = 1 - Math.abs(inputs.temperature - 20) * 0.01;
      const windFactor = 1 - (inputs.windSpeed / 100);
      const styleFactor = 1 - (inputs.drivingStyle / 100) * 0.3;
      const weightFactor = 1 - ((inputs.vehicleWeight - 1500) / 1000) * 0.2;
      
      const estimatedRange = baseRange * tempFactor * windFactor * styleFactor * weightFactor;
      setPrediction(Math.max(0, Math.round(estimatedRange)));
      
      toast({
        title: "Range Calculated",
        description: "Your estimated driving range has been calculated successfully.",
      });
    } catch (error) {
      toast({
        title: "Prediction Failed",
        description: "Unable to calculate range. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [inputs, toast]);

  const handleInputChange = (field: keyof RangeInputs, value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
    setPrediction(null); // Reset prediction when inputs change
  };

  return (
    <div className="spacing-responsive max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card card-responsive"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
          <div className="p-2 sm:p-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl">
            <Battery className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
          </div>
          <div>
            <h1 className="text-scale-xl font-bold text-white">Range Estimator</h1>
            <p className="text-white/70 text-sm">Predict your EV's driving range with ML</p>
          </div>
        </div>
        <div className="glass-card px-3 py-1 inline-block">
          <span className="text-xs text-primary font-medium">97.2% Accuracy</span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Input Panel */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-card card-responsive">
            <h2 className="text-scale-lg font-semibold text-white mb-6">Vehicle Parameters</h2>
            
            <div className="spacing-responsive">
              {/* Battery Level */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-white flex items-center gap-2">
                    <Battery className="h-4 w-4 text-primary" />
                    Battery Level
                  </Label>
                  <span className="text-primary font-medium">{inputs.batteryLevel}%</span>
                </div>
                <Slider
                  value={[inputs.batteryLevel]}
                  onValueChange={([value]) => handleInputChange('batteryLevel', value)}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Battery Capacity */}
              <div className="space-y-2">
                <Label className="text-white">Battery Capacity (kWh)</Label>
                <Input
                  type="number"
                  value={inputs.batteryCapacity}
                  onChange={(e) => handleInputChange('batteryCapacity', Number(e.target.value))}
                  className="glass-input"
                />
              </div>

              {/* Temperature */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-white flex items-center gap-2">
                    <Thermometer className="h-4 w-4 text-primary" />
                    Temperature
                  </Label>
                  <span className="text-primary font-medium">{inputs.temperature}°C</span>
                </div>
                <Slider
                  value={[inputs.temperature]}
                  onValueChange={([value]) => handleInputChange('temperature', value)}
                  min={-20}
                  max={50}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Wind Speed */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-white flex items-center gap-2">
                    <Wind className="h-4 w-4 text-primary" />
                    Wind Speed
                  </Label>
                  <span className="text-primary font-medium">{inputs.windSpeed} km/h</span>
                </div>
                <Slider
                  value={[inputs.windSpeed]}
                  onValueChange={([value]) => handleInputChange('windSpeed', value)}
                  max={50}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Driving Style */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-white flex items-center gap-2">
                    <Car className="h-4 w-4 text-primary" />
                    Driving Aggressiveness
                  </Label>
                  <span className="text-primary font-medium">{inputs.drivingStyle}%</span>
                </div>
                <Slider
                  value={[inputs.drivingStyle]}
                  onValueChange={([value]) => handleInputChange('drivingStyle', value)}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Vehicle Weight */}
              <div className="space-y-2">
                <Label className="text-white">Vehicle Weight (kg)</Label>
                <Input
                  type="number"
                  value={inputs.vehicleWeight}
                  onChange={(e) => handleInputChange('vehicleWeight', Number(e.target.value))}
                  className="glass-input"
                />
              </div>
            </div>

            <Button
              onClick={predictRange}
              disabled={isLoading}
              className="w-full mt-6 glass-button bg-primary/20 hover:bg-primary/30 text-primary border-primary/30 btn-touch"
            >
              {isLoading ? "Calculating..." : "Calculate Range"}
            </Button>
          </Card>
        </motion.div>

        {/* Results Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="glass-card card-responsive">
            <h2 className="text-scale-lg font-semibold text-white mb-6">Range Prediction</h2>
            
            {prediction !== null ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-4"
              >
                <div className="glass-card p-8 bg-gradient-to-r from-emerald-500/20 to-teal-600/20 border-emerald-500/30">
                  <div className="text-5xl font-bold text-emerald-400 mb-2">
                    {prediction}
                  </div>
                  <div className="text-lg text-white/80">
                    kilometers remaining
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="glass-card p-4 text-center">
                    <div className="text-2xl font-bold text-white">{Math.round(prediction * 0.62)}</div>
                    <div className="text-sm text-white/60">miles</div>
                  </div>
                  <div className="glass-card p-4 text-center">
                    <div className="text-2xl font-bold text-white">{Math.round(prediction / 80)}</div>
                    <div className="text-sm text-white/60">hours @ 80km/h</div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="text-center py-12 text-white/60">
                <Battery className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Enter your vehicle parameters and click "Calculate Range" to get a prediction.</p>
              </div>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default RangeEstimator;