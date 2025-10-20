import { useState, useEffect } from "react";
import WelcomeScreen from "@/components/WelcomeScreen";
import DailyLogForm, { DailyLog } from "@/components/DailyLogForm";
import WeeklySummary from "@/components/WeeklySummary";
import ClosingScreen from "@/components/ClosingScreen";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BarChart, PlusCircle } from "lucide-react";

type Screen = "welcome" | "log" | "summary" | "closing";

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("welcome");
  const [logs, setLogs] = useState<DailyLog[]>([]);

  // Load logs from localStorage on mount
  useEffect(() => {
    const savedLogs = localStorage.getItem("mindfulness-logs");
    if (savedLogs) {
      setLogs(JSON.parse(savedLogs));
    }
  }, []);

  // Save logs to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("mindfulness-logs", JSON.stringify(logs));
  }, [logs]);

  const handleSaveLog = (log: DailyLog) => {
    setLogs((prevLogs) => {
      // Remove any existing log for the same day
      const filteredLogs = prevLogs.filter((l) => l.day !== log.day);
      return [...filteredLogs, log];
    });
  };

  const handleNewWeek = () => {
    setLogs([]);
    setCurrentScreen("welcome");
  };

  const handleViewSummary = () => {
    if (logs.length === 0) {
      setCurrentScreen("log");
    } else if (logs.length === 5) {
      setCurrentScreen("closing");
    } else {
      setCurrentScreen("summary");
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Navigation */}
      {currentScreen !== "welcome" && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                if (currentScreen === "log") setCurrentScreen("welcome");
                else if (currentScreen === "summary") setCurrentScreen("log");
                else if (currentScreen === "closing") setCurrentScreen("summary");
              }}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Atrás
            </Button>

            <div className="flex gap-2">
              {currentScreen !== "summary" && currentScreen !== "closing" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleViewSummary}
                  className="gap-2"
                >
                  <BarChart className="w-4 h-4" />
                  Resumen
                </Button>
              )}
              
              {(currentScreen === "summary" || currentScreen === "closing") && logs.length < 5 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentScreen("log")}
                  className="gap-2"
                >
                  <PlusCircle className="w-4 h-4" />
                  Nuevo registro
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main content with padding for fixed nav */}
      <div className={currentScreen !== "welcome" ? "pt-20" : ""}>
        {currentScreen === "welcome" && (
          <WelcomeScreen onStart={() => setCurrentScreen("log")} />
        )}

        {currentScreen === "log" && (
          <DailyLogForm onSave={handleSaveLog} />
        )}

        {currentScreen === "summary" && (
          <WeeklySummary logs={logs} onNewWeek={handleNewWeek} />
        )}

        {currentScreen === "closing" && (
          <ClosingScreen onNewWeek={handleNewWeek} />
        )}
      </div>
    </div>
  );
};

export default Index;
