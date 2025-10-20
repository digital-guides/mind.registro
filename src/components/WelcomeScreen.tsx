import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import logo from "@/assets/logo.png";

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 animate-fadeIn">
      <Card className="max-w-lg w-full p-8 md:p-12 text-center shadow-xl bg-card/95 backdrop-blur border-primary/20">
        <div className="mb-6 flex justify-center">
          <img src={logo} alt="Desbloquea tu Potencial Profesional" className="h-16 md:h-20 mb-4" />
        </div>
        
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-secondary/10 flex items-center justify-center animate-breathe">
            <Sparkles className="w-10 h-10 text-primary" />
          </div>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
          Tu práctica consciente comienza aquí 🕊️
        </h1>
        
        <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
          Esta bitácora te ayudará a registrar tus micro-pausas conscientes y observar 
          cómo evoluciona tu bienestar día a día. Solo te tomará unos minutos y podrás 
          hacerlo desde tu celular o computadora.
        </p>
        
        <Button 
          onClick={onStart}
          size="lg"
          className="w-full md:w-auto px-12 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          Empezar mi registro
        </Button>
      </Card>
    </div>
  );
};

export default WelcomeScreen;
