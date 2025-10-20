import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Sparkles } from "lucide-react";

interface ClosingScreenProps {
  onNewWeek: () => void;
}

const ClosingScreen = ({ onNewWeek }: ClosingScreenProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 animate-fadeIn">
      <Card className="max-w-lg w-full p-8 md:p-12 text-center shadow-xl">
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-secondary/10 flex items-center justify-center animate-breathe">
            <Heart className="w-10 h-10 text-primary" />
          </div>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
          Has completado tu semana de mindfulness
        </h1>
        
        <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
          Recuerda: tu bienestar es tu mejor herramienta profesional.
        </p>

        <div className="flex items-center justify-center gap-2 mb-8 text-primary">
          <Sparkles className="w-5 h-5" />
          <span className="text-sm font-medium">
            Sigue cultivando tu práctica consciente
          </span>
          <Sparkles className="w-5 h-5" />
        </div>
        
        <Button 
          onClick={onNewWeek}
          size="lg"
          className="w-full md:w-auto px-12 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 mb-8"
        >
          Comenzar una nueva semana
        </Button>

        <footer className="pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Programa "Desbloquea tu Potencial Profesional"
          </p>
          <p className="text-sm font-medium text-secondary mt-1">
            María Auxiliadora Vielma 🌿
          </p>
        </footer>
      </Card>
    </div>
  );
};

export default ClosingScreen;
