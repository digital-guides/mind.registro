import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DailyLog } from "./DailyLogForm";
import { ActivePause } from "./ActivePauseForm";
import { BarChart, FileDown, Calendar, Activity } from "lucide-react";
import { toast } from "sonner";
import jsPDF from "jspdf";

interface WeeklySummaryProps {
  logs: DailyLog[];
  pauses: ActivePause[];
  onNewWeek: () => void;
}

const WeeklySummary = ({ logs, pauses, onNewWeek }: WeeklySummaryProps) => {
  const [activeTab, setActiveTab] = useState("mindfulness");
  const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
  
  const getEnergyEmoji = (value: number) => {
    const emojis = ["😴", "🙂", "😊", "😃", "✨"];
    return emojis[value - 1];
  };

  const handleDownloadPDF = () => {
    try {
      const pdf = new jsPDF();
      const pageWidth = pdf.internal.pageSize.getWidth();
      let yPosition = 20;

      // Título
      pdf.setFontSize(20);
      pdf.setTextColor(247, 144, 30); // Naranja
      pdf.text("Resumen Semanal de Bienestar", pageWidth / 2, yPosition, { align: "center" });
      
      yPosition += 15;
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      pdf.text("Programa: Del agotamiento al empoderamiento", pageWidth / 2, yPosition, { align: "center" });
      
      yPosition += 15;

      // Prácticas de Mindfulness
      if (logs.length > 0) {
        pdf.setFontSize(16);
        pdf.setTextColor(30, 42, 57); // Azul marino
        pdf.text("Prácticas de Mindfulness", 15, yPosition);
        yPosition += 10;

        days.forEach((day) => {
          const log = getLogForDay(day);
          if (log) {
            if (yPosition > 250) {
              pdf.addPage();
              yPosition = 20;
            }

            pdf.setFontSize(12);
            pdf.setTextColor(0, 0, 0);
            pdf.text(`${day}`, 15, yPosition);
            yPosition += 7;

            pdf.setFontSize(10);
            pdf.setTextColor(60, 60, 60);
            pdf.text(`Práctica: ${log.practice}`, 20, yPosition);
            yPosition += 6;
            pdf.text(`Emoción: ${log.emotion}`, 20, yPosition);
            yPosition += 6;
            pdf.text(`Energía: ${getEnergyEmoji(log.energyBefore)} → ${getEnergyEmoji(log.energyAfter)}`, 20, yPosition);
            yPosition += 6;
            
            if (log.reflection) {
              const lines = pdf.splitTextToSize(`Reflexión: "${log.reflection}"`, pageWidth - 40);
              pdf.text(lines, 20, yPosition);
              yPosition += 6 * lines.length;
            }
            
            yPosition += 5;
          }
        });

        yPosition += 10;
      }

      // Pausas Activas
      if (pauses.length > 0) {
        if (yPosition > 200) {
          pdf.addPage();
          yPosition = 20;
        }

        pdf.setFontSize(16);
        pdf.setTextColor(30, 42, 57);
        pdf.text("Pausas Activas Conscientes", 15, yPosition);
        yPosition += 10;

        days.forEach((day) => {
          const dayPauses = getPausesForDay(day);
          if (dayPauses.length > 0) {
            if (yPosition > 250) {
              pdf.addPage();
              yPosition = 20;
            }

            pdf.setFontSize(12);
            pdf.setTextColor(0, 0, 0);
            pdf.text(`${day} (${dayPauses.length} pausa${dayPauses.length > 1 ? 's' : ''})`, 15, yPosition);
            yPosition += 7;

            dayPauses.forEach((pause) => {
              pdf.setFontSize(10);
              pdf.setTextColor(60, 60, 60);
              pdf.text(`• ${pause.moment} - ${pause.type} (${pause.duration} min)`, 20, yPosition);
              yPosition += 6;
              pdf.text(`  Sensación: ${pause.sensation}`, 20, yPosition);
              yPosition += 6;
              
              if (pause.reflection) {
                const lines = pdf.splitTextToSize(`  Reflexión: "${pause.reflection}"`, pageWidth - 40);
                pdf.text(lines, 20, yPosition);
                yPosition += 6 * lines.length;
              }
              
              yPosition += 3;
            });

            yPosition += 5;
          }
        });
      }

      // Footer
      const totalPages = pdf.internal.pages.length - 1;
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.setFontSize(8);
        pdf.setTextColor(150, 150, 150);
        pdf.text(
          "María Auxiliadora Vielma - Desbloquea tu Potencial Profesional",
          pageWidth / 2,
          pdf.internal.pageSize.getHeight() - 10,
          { align: "center" }
        );
      }

      // Descargar
      const fecha = new Date().toLocaleDateString('es-ES');
      pdf.save(`resumen-semanal-${fecha}.pdf`);
      
      toast.success("PDF descargado exitosamente", {
        description: "Tu resumen semanal ha sido guardado",
      });
    } catch (error) {
      toast.error("Error al generar el PDF", {
        description: "Por favor intenta de nuevo",
      });
    }
  };

  const getLogForDay = (day: string) => {
    return logs.find(log => log.day === day);
  };

  const getPausesForDay = (day: string) => {
    return pauses.filter(pause => pause.day === day);
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
              Tu progreso en mindfulness y pausas activas esta semana
            </p>
          </div>
        </div>

        {logs.length === 0 && pauses.length === 0 ? (
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
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="mindfulness" className="gap-2">
                <BarChart className="w-4 h-4" />
                Prácticas Mindfulness
              </TabsTrigger>
              <TabsTrigger value="pauses" className="gap-2">
                <Activity className="w-4 h-4" />
                Pausas Activas
              </TabsTrigger>
            </TabsList>

            <TabsContent value="mindfulness" className="space-y-6">
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
            </TabsContent>

            <TabsContent value="pauses" className="space-y-6">
              {days.map((day) => {
                const dayPauses = getPausesForDay(day);
                
                return (
                  <div 
                    key={day}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      dayPauses.length > 0
                        ? 'bg-card border-primary/20' 
                        : 'bg-muted/30 border-border/50 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-lg text-secondary">{day}</h3>
                      {dayPauses.length > 0 && (
                        <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium">
                          {dayPauses.length} pausa{dayPauses.length > 1 ? 's' : ''}
                        </span>
                      )}
                    </div>

                    {dayPauses.length > 0 ? (
                      <div className="space-y-4">
                        {dayPauses.map((pause, index) => (
                          <div key={pause.id} className={`${index > 0 ? 'pt-4 border-t border-border/50' : ''}`}>
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <p className="text-sm font-medium text-muted-foreground">
                                  Momento
                                </p>
                                <p className="text-base">{pause.moment}</p>
                              </div>

                              <div className="space-y-2">
                                <p className="text-sm font-medium text-muted-foreground">
                                  Tipo de pausa
                                </p>
                                <p className="text-base">{pause.type}</p>
                              </div>

                              <div className="space-y-2">
                                <p className="text-sm font-medium text-muted-foreground">
                                  Duración
                                </p>
                                <p className="text-base">{pause.duration} minutos</p>
                              </div>

                              <div className="space-y-2">
                                <p className="text-sm font-medium text-muted-foreground">
                                  Sensación posterior
                                </p>
                                <p className="text-base">{pause.sensation}</p>
                              </div>

                              {pause.reflection && (
                                <div className="md:col-span-2 space-y-2">
                                  <p className="text-sm font-medium text-muted-foreground">
                                    Reflexión
                                  </p>
                                  <p className="text-base italic text-secondary/80">
                                    "{pause.reflection}"
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Sin pausas registradas
                      </p>
                    )}
                  </div>
                );
              })}
            </TabsContent>

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
          </Tabs>
        )}
      </Card>
    </div>
  );
};

export default WeeklySummary;
