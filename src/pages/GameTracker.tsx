import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Home } from "lucide-react";
import PlayerCard from "@/components/PlayerCard";
import { heroes } from "@/data/heroes";

export interface PlayerState {
  name: string;
  image?: string;
  health: number;
  maxHealth: number;
  poison: boolean;
  poisonDamage?: number;
  poisonTurns?: number;
  immobilize: boolean;
  immobilizeTurns?: number;
  stun: boolean;
  stunTurns?: number;
  heal: boolean;
  healAmount?: number;
  healTurns?: number;
  slow: boolean;
  slowTurns?: number;
}

const GameTracker = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const playerCount = parseInt(searchParams.get("players") || "2");
  const heroesParam = searchParams.get("heroes");
  const selectedHeroes = heroesParam 
    ? JSON.parse(heroesParam) as Array<{ name: string; image?: string }>
    : JSON.parse(searchParams.get("names") || "[]").map((name: string) => ({ name, image: undefined }));
  
  const maxMana = playerCount === 2 ? 20 : 15;
  const [mana, setMana] = useState(maxMana);
  const [currentTurn, setCurrentTurn] = useState(1);
  
  const [players, setPlayers] = useState<PlayerState[]>(
    selectedHeroes.map(hero => {
      const heroData = heroes.find(h => h.name === hero.name);
      const startingHealth = heroData?.startingHealth || 20;
      return {
        name: hero.name,
        image: hero.image,
        health: startingHealth,
        maxHealth: startingHealth,
        poison: false,
        immobilize: false,
        stun: false,
        heal: false,
        slow: false,
      };
    })
  );

  const updatePlayer = (index: number, updates: Partial<PlayerState>) => {
    const newPlayers = [...players];
    newPlayers[index] = { ...newPlayers[index], ...updates };
    setPlayers(newPlayers);
  };

  const startTurn = () => {
    const newPlayers = players.map(player => {
      let newHealth = player.health;
      let updates: Partial<PlayerState> = {};

      // Apply poison damage
      if (player.poison && player.poisonTurns && player.poisonTurns > 0) {
        newHealth -= player.poisonDamage || 0;
        const newTurns = player.poisonTurns - 1;
        if (newTurns <= 0) {
          updates = { poison: false, poisonTurns: 0, poisonDamage: 0 };
        } else {
          updates.poisonTurns = newTurns;
        }
      }

      // Apply heal
      if (player.heal && player.healTurns && player.healTurns > 0) {
        newHealth = Math.min(player.maxHealth, newHealth + (player.healAmount || 0));
        const newTurns = player.healTurns - 1;
        if (newTurns <= 0) {
          updates = { ...updates, heal: false, healTurns: 0, healAmount: 0 };
        } else {
          updates.healTurns = newTurns;
        }
      }

      return { ...player, ...updates, health: Math.max(0, newHealth) };
    });

    setPlayers(newPlayers);
    setMana(maxMana);
    setCurrentTurn(currentTurn + 1);
  };

  const endGlobalTurn = () => {
    const newPlayers = players.map(player => {
      const updates: Partial<PlayerState> = {};

      if (player.immobilize && player.immobilizeTurns && player.immobilizeTurns > 0) {
        const newTurns = player.immobilizeTurns - 1;
        updates.immobilize = newTurns > 0;
        updates.immobilizeTurns = newTurns > 0 ? newTurns : 0;
      } else if (player.immobilize) {
        updates.immobilize = false;
        updates.immobilizeTurns = 0;
      }

      if (player.stun && player.stunTurns && player.stunTurns > 0) {
        const newTurns = player.stunTurns - 1;
        updates.stun = newTurns > 0;
        updates.stunTurns = newTurns > 0 ? newTurns : 0;
      } else if (player.stun) {
        updates.stun = false;
        updates.stunTurns = 0;
      }

      if (player.slow && player.slowTurns && player.slowTurns > 0) {
        const newTurns = player.slowTurns - 1;
        updates.slow = newTurns > 0;
        updates.slowTurns = newTurns > 0 ? newTurns : 0;
      } else if (player.slow) {
        updates.slow = false;
        updates.slowTurns = 0;
      }

      return { ...player, ...updates };
    });

    setPlayers(newPlayers);
  };

  return (
    <div className="min-h-screen bg-background p-3 pb-6">
      <div className="max-w-2xl mx-auto space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between sticky top-0 bg-background z-10 py-2">
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-gold bg-clip-text text-transparent">
            MEGAAD
          </h1>
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate("/")}
            className="border-primary/30 hover:border-primary hover:shadow-glow active:scale-95 h-10 w-10"
          >
            <Home className="h-5 w-5" />
          </Button>
        </div>

        {/* Turn Counter */}
        <div className="bg-gradient-card border-2 border-accent/30 rounded-xl p-4 shadow-card sticky top-14 z-10 bg-background">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center flex-1">
              <p className="text-sm text-muted-foreground mb-1">Turno Attuale</p>
              <p className="text-3xl font-bold bg-gradient-gold bg-clip-text text-transparent">
                {currentTurn}
              </p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button
                onClick={startTurn}
                className="flex-1 sm:flex-initial bg-accent hover:bg-accent/90 text-accent-foreground font-bold px-6 h-12 active:scale-95 transition-all shadow-gold-glow"
              >
                Inizio Turno
              </Button>
              <Button
                onClick={endGlobalTurn}
                variant="outline"
                className="flex-1 sm:flex-initial border-2 border-accent/50 hover:bg-accent/10 hover:border-accent text-accent font-bold px-6 h-12 active:scale-95 transition-all"
              >
                Fine Turno
              </Button>
            </div>
          </div>
        </div>

        {/* Mana Bar */}
        <div className="bg-gradient-card border-2 border-primary/30 rounded-xl p-4 shadow-card sticky top-[120px] z-10 bg-background">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-foreground">Mana</h2>
              <div className="text-2xl font-bold bg-gradient-gold bg-clip-text text-transparent">
                {mana} / {maxMana}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setMana(Math.max(0, mana - 1))}
                className="border-primary/30 hover:border-primary hover:shadow-glow active:scale-95 h-10 w-10"
              >
                -
              </Button>
              <Slider
                value={[mana]}
                onValueChange={(value) => setMana(value[0])}
                max={maxMana}
                step={1}
                className="flex-1"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => setMana(Math.min(maxMana, mana + 1))}
                className="border-primary/30 hover:border-primary hover:shadow-glow active:scale-95 h-10 w-10"
              >
                +
              </Button>
            </div>
          </div>
        </div>

        {/* Players Grid */}
        <div className="grid grid-cols-1 gap-3 pt-2">
          {players.map((player, index) => (
            <PlayerCard
              key={index}
              player={player}
              onUpdate={(updates) => updatePlayer(index, updates)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameTracker;
