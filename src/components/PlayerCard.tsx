import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skull, Lock, Zap, Heart, Plus, Minus, Snail } from "lucide-react";
import { PlayerState } from "@/pages/GameTracker";
import StatusDialog from "./StatusDialog";

interface PlayerCardProps {
  player: PlayerState;
  onUpdate: (updates: Partial<PlayerState>) => void;
}

const PlayerCard = ({ player, onUpdate }: PlayerCardProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<"poison" | "immobilize" | "stun" | "heal" | "slow">("poison");

  const statusButtons = [
    {
      key: "poison" as keyof PlayerState,
      icon: Skull,
      label: "Veleno",
      color: "text-purple-400",
      glowColor: "shadow-[0_0_20px_rgba(192,132,252,0.5)]",
    },
    {
      key: "immobilize" as keyof PlayerState,
      icon: Lock,
      label: "Immob.",
      color: "text-orange-400",
      glowColor: "shadow-[0_0_20px_rgba(251,146,60,0.5)]",
    },
    {
      key: "stun" as keyof PlayerState,
      icon: Zap,
      label: "Stord.",
      color: "text-yellow-400",
      glowColor: "shadow-[0_0_20px_rgba(250,204,21,0.5)]",
    },
    {
      key: "heal" as keyof PlayerState,
      icon: Heart,
      label: "Guarigg.",
      color: "text-green-400",
      glowColor: "shadow-[0_0_20px_rgba(74,222,128,0.5)]",
    },
    {
      key: "slow" as keyof PlayerState,
      icon: Snail,
      label: "Rallent.",
      color: "text-blue-400",
      glowColor: "shadow-[0_0_20px_rgba(96,165,250,0.5)]",
    },
  ];

  const adjustHealth = (amount: number) => {
    const newHealth = Math.min(player.maxHealth, Math.max(0, player.health + amount));
    onUpdate({ health: newHealth });
  };

  const handleStatusClick = (key: keyof PlayerState) => {
    const isActive = player[key] as boolean;
    
    if (isActive) {
      // If already active, deactivate
      if (key === "poison") {
        onUpdate({ poison: false, poisonDamage: 0, poisonTurns: 0 });
      } else if (key === "immobilize") {
        onUpdate({ immobilize: false, immobilizeTurns: 0 });
      } else if (key === "stun") {
        onUpdate({ stun: false, stunTurns: 0 });
      } else if (key === "heal") {
        onUpdate({ heal: false, healAmount: 0, healTurns: 0 });
      } else if (key === "slow") {
        onUpdate({ slow: false, slowTurns: 0 });
      }
    } else {
      // Open dialog to configure
      setCurrentStatus(key as "poison" | "immobilize" | "stun" | "heal" | "slow");
      setDialogOpen(true);
    }
  };

  const handleDialogConfirm = (data: { amount?: number; turns: number }) => {
    if (currentStatus === "poison") {
      onUpdate({ poison: true, poisonDamage: data.amount, poisonTurns: data.turns });
    } else if (currentStatus === "immobilize") {
      onUpdate({ immobilize: true, immobilizeTurns: data.turns });
    } else if (currentStatus === "stun") {
      onUpdate({ stun: true, stunTurns: data.turns });
    } else if (currentStatus === "heal") {
      onUpdate({ heal: true, healAmount: data.amount, healTurns: data.turns });
    } else if (currentStatus === "slow") {
      onUpdate({ slow: true, slowTurns: data.turns });
    }
  };

  return (
    <>
      <StatusDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        statusType={currentStatus}
        onConfirm={handleDialogConfirm}
      />
      <div className="bg-gradient-card border-2 border-primary/30 rounded-xl p-4 shadow-card space-y-3 hover:border-primary/50 transition-all">
      {/* Player Name and Image */}
      <div className="flex items-center gap-3">
        {player.image && (
          <img 
            src={player.image} 
            alt={player.name}
            className="w-14 h-14 rounded-lg object-contain bg-black/40 border border-primary/30 p-0.5 shadow-glow shrink-0"
          />
        )}
        <h3 className="text-xl font-bold text-foreground truncate flex-1">
          {player.name}
        </h3>
      </div>

      {/* Health Controls */}
      <div className="space-y-2">
        <label className="text-xs text-muted-foreground block text-center">Punti Vita</label>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => adjustHealth(-1)}
            className="h-12 w-12 border-destructive/30 text-destructive hover:bg-destructive/10 hover:border-destructive active:scale-90 shrink-0"
          >
            <Minus className="h-5 w-5" />
          </Button>
          
          <Input
            type="number"
            value={player.health}
            onChange={(e) => {
              const value = parseInt(e.target.value) || 0;
              onUpdate({ health: Math.min(player.maxHealth, Math.max(0, value)) });
            }}
            className="h-12 text-2xl font-bold text-center bg-secondary border-primary/30 focus:border-accent focus:shadow-gold-glow transition-all"
          />
          
          <Button
            variant="outline"
            size="icon"
            onClick={() => adjustHealth(1)}
            className="h-12 w-12 border-accent/30 text-accent hover:bg-accent/10 hover:border-accent active:scale-90 shrink-0"
          >
            <Plus className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Status Buttons */}
      <div className="grid grid-cols-2 gap-2">
        {statusButtons.map(({ key, icon: Icon, label, color, glowColor }) => {
          const isActive = player[key] as boolean;
          let turnsText = "";
          if (isActive) {
            if (key === "poison" && player.poisonTurns) {
              turnsText = `${player.poisonDamage}dmg x${player.poisonTurns}t`;
            } else if (key === "immobilize" && player.immobilizeTurns) {
              turnsText = `${player.immobilizeTurns}t`;
            } else if (key === "stun" && player.stunTurns) {
              turnsText = `${player.stunTurns}t`;
            } else if (key === "heal" && player.healTurns) {
              turnsText = `+${player.healAmount} x${player.healTurns}t`;
            } else if (key === "slow" && player.slowTurns) {
              turnsText = `${player.slowTurns}t`;
            }
          }
          
          return (
            <Button
              key={key}
              variant="outline"
              onClick={() => handleStatusClick(key)}
              className={`h-12 flex flex-col gap-0.5 border-2 transition-all active:scale-95 ${
                isActive
                  ? `${color} border-current ${glowColor} bg-current/10`
                  : "border-muted/30 text-muted-foreground hover:border-muted"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="text-[10px] leading-tight">{label}</span>
              {turnsText && (
                <span className="text-[9px] leading-tight opacity-80">{turnsText}</span>
              )}
            </Button>
          );
        })}
      </div>
      </div>
    </>
  );
};

export default PlayerCard;
