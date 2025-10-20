import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Activity, Save } from "lucide-react";

interface ActivePauseFormProps {
  onSave: (pause: ActivePause) => void;
}

export interface ActivePause {
  id: string;
  day: string;
  moment: string;
  type: string;
  duration: number;
  sensation: string;
  reflection: string;
  date: string;
}

const ActivePauseForm = ({ onSave }: ActivePauseFormProps) => {
  const [day, setDay] = useState("");
  const [moment, setMoment] = useState("");
  const [type, setType] = useState("");
  const [duration, setDuration] = useState("");
  const [sensation, setSensation] = useState("");
  const [reflection, setReflection] = useState("");

  const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
  const moments = [
    "Inicio del día",
    "Media mañana",
    "Antes del almuerzo",
    "Media tarde",
    "Final del día"
  ];
  const types = [
    "Corporal",
    "Respiratoria",
    "Sensorial",
    "Hidratación consciente"
  ];
  const durations = ["2", "5", "7"];
  const sensations = [
    "Energía renovada",
    "Relajación",
    "Concentración",
    "Calma"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!day || !moment || !type || !duration || !sensation) {
      toast.error("Por favor completa todos los campos requeridos");
      return;
    }

    const pause: ActivePause = {
      id: Date.now().toString(),
      day,
      moment,
      type,
      duration: parseInt(duration),
      sensation,
      reflection,
      date: new Date().toISOString()
    };

    onSave(pause);
    
    toast.success("🌸 Bien hecho. Has sumado una pausa consciente a tu jornada.", {
      description: "Recuerda que cuidar tu cuerpo también es cuidar tu mente.",
      duration: 5000,
    });

    // Reset form
    setDay("");
    setMoment("");
    setType("");
    setDuration("");
    setSensation("");
    setReflection("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 animate-fadeIn">
      <Card className="max-w-2xl w-full p-6 md:p-10 shadow-xl">
        <div className="mb-6 flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Activity className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-secondary">Pausas Activas Conscientes</h2>
            <p className="text-sm text-muted-foreground">Registra tus pausas durante el día</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="day" className="text-base font-semibold">Día de la semana *</Label>
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
            <Label htmlFor="moment" className="text-base font-semibold">Momento del día *</Label>
            <Select value={moment} onValueChange={setMoment}>
              <SelectTrigger id="moment" className="w-full">
                <SelectValue placeholder="Selecciona un momento" />
              </SelectTrigger>
              <SelectContent>
                {moments.map((m) => (
                  <SelectItem key={m} value={m}>{m}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="type" className="text-base font-semibold">Tipo de pausa *</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger id="type" className="w-full">
                <SelectValue placeholder="Selecciona un tipo" />
              </SelectTrigger>
              <SelectContent>
                {types.map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration" className="text-base font-semibold">Duración (minutos) *</Label>
            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger id="duration" className="w-full">
                <SelectValue placeholder="Selecciona la duración" />
              </SelectTrigger>
              <SelectContent>
                {durations.map((d) => (
                  <SelectItem key={d} value={d}>{d} minutos</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="sensation" className="text-base font-semibold">Sensación posterior *</Label>
            <Select value={sensation} onValueChange={setSensation}>
              <SelectTrigger id="sensation" className="w-full">
                <SelectValue placeholder="Selecciona una sensación" />
              </SelectTrigger>
              <SelectContent>
                {sensations.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
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
              placeholder="Comparte tus pensamientos sobre la pausa..."
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
            Guardar mi pausa activa
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ActivePauseForm;
