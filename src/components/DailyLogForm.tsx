import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Wind, Save } from "lucide-react";

interface DailyLogFormProps {
  onSave: (log: DailyLog) => void;
}

export interface DailyLog {
  id: string;
  day: string;
  practice: string;
  energyBefore: number;
  energyAfter: number;
  emotion: string;
  reflection: string;
  date: string;
}

const DailyLogForm = ({ onSave }: DailyLogFormProps) => {
  const [day, setDay] = useState("");
  const [practice, setPractice] = useState("");
  const [energyBefore, setEnergyBefore] = useState([3]);
  const [energyAfter, setEnergyAfter] = useState([3]);
  const [emotion, setEmotion] = useState("");
  const [reflection, setReflection] = useState("");

  const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
  const practices = [
    "Respiración 4-4-4-4",
    "Escucha consciente",
    "Escaneo corporal",
    "Pausa de gratitud",
    "Otra práctica personal"
  ];
  const emotions = [
    "Calma",
    "Claridad",
    "Gratitud",
    "Alivio",
    "Foco"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!day || !practice || !emotion) {
      toast.error("Por favor completa todos los campos requeridos");
      return;
    }

    const log: DailyLog = {
      id: Date.now().toString(),
      day,
      practice,
      energyBefore: energyBefore[0],
      energyAfter: energyAfter[0],
      emotion,
      reflection,
      date: new Date().toISOString()
    };

    onSave(log);
    
    toast.success("✨ ¡Excelente! Has registrado un nuevo momento de atención plena.", {
      description: "Cada pausa cuenta en tu proceso de equilibrio y bienestar.",
      duration: 5000,
    });

    // Reset form
    setDay("");
    setPractice("");
    setEnergyBefore([3]);
    setEnergyAfter([3]);
    setEmotion("");
    setReflection("");
  };

  const getEnergyEmoji = (value: number) => {
    const emojis = ["😴", "🙂", "😊", "😃", "✨"];
    return emojis[value - 1];
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 animate-fadeIn">
      <Card className="max-w-2xl w-full p-6 md:p-10 shadow-xl">
        <div className="mb-6 flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Wind className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-secondary">Registro diario</h2>
            <p className="text-sm text-muted-foreground">Comparte tu práctica consciente de hoy</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="day" className="text-base font-semibold">Día de la práctica *</Label>
            <Select value={day} onValueChange={setDay}>
              <SelectTrigger id="day" className="w-full">
                <SelectValue placeholder="Selecciona un día" />
              </SelectTrigger>
              <SelectContent>
                {days.map((d) => (
                  <SelectItem key={d} value={d}>{d}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="practice" className="text-base font-semibold">Práctica realizada *</Label>
            <Select value={practice} onValueChange={setPractice}>
              <SelectTrigger id="practice" className="w-full">
                <SelectValue placeholder="Selecciona una práctica" />
              </SelectTrigger>
              <SelectContent>
                {practices.map((p) => (
                  <SelectItem key={p} value={p}>{p}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
            <div className="space-y-3">
              <Label className="text-base font-semibold">
                Nivel de energía antes de la práctica
              </Label>
              <div className="flex items-center gap-4">
                <Slider
                  value={energyBefore}
                  onValueChange={setEnergyBefore}
                  min={1}
                  max={5}
                  step={1}
                  className="flex-1"
                />
                <span className="text-3xl min-w-[40px] text-center">
                  {getEnergyEmoji(energyBefore[0])}
                </span>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Baja</span>
                <span>Alta</span>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-base font-semibold">
                Nivel de energía después de la práctica
              </Label>
              <div className="flex items-center gap-4">
                <Slider
                  value={energyAfter}
                  onValueChange={setEnergyAfter}
                  min={1}
                  max={5}
                  step={1}
                  className="flex-1"
                />
                <span className="text-3xl min-w-[40px] text-center">
                  {getEnergyEmoji(energyAfter[0])}
                </span>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Baja</span>
                <span>Alta</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="emotion" className="text-base font-semibold">Emoción predominante al finalizar *</Label>
            <Select value={emotion} onValueChange={setEmotion}>
              <SelectTrigger id="emotion" className="w-full">
                <SelectValue placeholder="Selecciona una emoción" />
              </SelectTrigger>
              <SelectContent>
                {emotions.map((e) => (
                  <SelectItem key={e} value={e}>{e}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reflection" className="text-base font-semibold">
              Comentario personal o reflexión breve
            </Label>
            <Textarea
              id="reflection"
              value={reflection}
              onChange={(e) => setReflection(e.target.value.slice(0, 200))}
              placeholder="Comparte tus pensamientos sobre la práctica..."
              className="min-h-[100px] resize-none"
              maxLength={200}
            />
            <p className="text-xs text-muted-foreground text-right">
              {reflection.length}/200 caracteres
            </p>
          </div>

          <Button 
            type="submit" 
            className="w-full py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Save className="mr-2 h-5 w-5" />
            Guardar mi práctica
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default DailyLogForm;
