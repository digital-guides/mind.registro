import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DailyLog } from "./DailyLogForm";
import { BarChart, FileDown, Calendar } from "lucide-react";
import { toast } from "sonner";

interface WeeklySummaryProps {
  logs: DailyLog[];
  onNewWeek: () => void;
}

const WeeklySummary = ({ logs, onNewWeek }: WeeklySummaryProps) => {
  const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
  
  const getEnergyEmoji = (value: number) => {
    const emojis = ["😴", "🙂", "😊", "😃", "✨"];
    return emojis[value - 1];
  };

  const handleDownloadPDF = () => {
    toast.info("Función de descarga PDF en desarrollo", {
      description: "Pronto podrás exportar tu resumen semanal",
    });
  };

  const getLogForDay = (day: string) => {
    return logs.find(log => log.day === day);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 animate-fadeIn">
      <Card className="max-w-4xl w-full p-6 md:p-10 shadow-xl">
        <div className="mb-8 flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <BarChart className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-secondary">Resumen semanal</h2>
            <p className="text-sm text-muted-foreground">
              Tu progreso en mindfulness esta semana
            </p>
          </div>
        </div>

        {logs.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-lg text-muted-foreground mb-2">
              Aún no hay registros esta semana
            </p>
            <p className="text-sm text-muted-foreground">
              Comienza tu práctica diaria para ver tu progreso aquí
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {days.map((day) => {
              const log = getLogForDay(day);
              
              return (
                <div 
                  key={day}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    log 
                      ? 'bg-card border-primary/20' 
                      : 'bg-muted/30 border-border/50 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-lg text-secondary">{day}</h3>
                    {log && (
                      <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                        Completado
                      </span>
                    )}
                  </div>

                  {log ? (
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">
                          Práctica
                        </p>
                        <p className="text-base">{log.practice}</p>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">
                          Emoción
                        </p>
                        <p className="text-base">{log.emotion}</p>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm font-medium text-muted-foreground">
                          Energía (antes → después)
                        </p>
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{getEnergyEmoji(log.energyBefore)}</span>
                          <span className="text-primary">→</span>
                          <span className="text-2xl">{getEnergyEmoji(log.energyAfter)}</span>
                          {log.energyAfter > log.energyBefore && (
                            <span className="text-xs text-green-600 font-semibold bg-green-50 px-2 py-1 rounded">
                              +{log.energyAfter - log.energyBefore} ⬆️
                            </span>
                          )}
                        </div>
                      </div>

                      {log.reflection && (
                        <div className="md:col-span-2 space-y-2">
                          <p className="text-sm font-medium text-muted-foreground">
                            Reflexión
                          </p>
                          <p className="text-base italic text-secondary/80">
                            "{log.reflection}"
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Sin registro
                    </p>
                  )}
                </div>
              );
            })}

            <div className="pt-6 border-t flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleDownloadPDF}
                variant="outline"
                className="flex-1 py-6 font-semibold"
              >
                <FileDown className="mr-2 h-5 w-5" />
                Descargar mi semana en PDF
              </Button>
              
              <Button
                onClick={onNewWeek}
                className="flex-1 py-6 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Comenzar una nueva semana
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default WeeklySummary;
