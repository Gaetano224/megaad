import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

const ModeSelection = () => {
  const navigate = useNavigate();

  const selectMode = (players: number) => {
    navigate(`/setup?players=${players}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md text-center space-y-6">
        <div className="space-y-3">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-gold bg-clip-text text-transparent">MEGAAD</h1>
          <p className="text-lg text-muted-foreground">Scegli il numero di giocatori</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => selectMode(2)}
            className="group relative w-full overflow-hidden rounded-xl bg-gradient-card border-2 border-primary/30 p-6 transition-all hover:border-primary hover:shadow-glow active:scale-95"
          >
            <div className="relative z-10 space-y-3">
              <div className="flex justify-center">
                <div className="rounded-full bg-primary/20 p-4 group-hover:bg-primary/30 transition-colors">
                  <Users className="w-10 h-10 text-primary" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-foreground">2 giocatori</h2>
            </div>
            <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity" />
          </button>

          <button
            onClick={() => selectMode(4)}
            className="group relative w-full overflow-hidden rounded-xl bg-gradient-card border-2 border-primary/30 p-6 transition-all hover:border-primary hover:shadow-glow active:scale-95"
          >
            <div className="relative z-10 space-y-3">
              <div className="flex justify-center">
                <div className="rounded-full bg-primary/20 p-4 group-hover:bg-primary/30 transition-colors">
                  <Users className="w-10 h-10 text-primary" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-foreground">4 Giocatori</h2>
            </div>
            <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModeSelection;
