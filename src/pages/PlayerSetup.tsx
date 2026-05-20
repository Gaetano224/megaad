import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, Check, ChevronsUpDown } from "lucide-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { heroes, Hero } from "@/data/heroes";

const PlayerSetup = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const playerCount = parseInt(searchParams.get("players") || "2");
  const slotCount = playerCount === 2 ? 5 : 3;
  
  const [selectedHeroes, setSelectedHeroes] = useState<Array<{ name: string; image?: string }>>(
    Array(slotCount).fill({ name: "", image: undefined })
  );
  const [openPopover, setOpenPopover] = useState<number | null>(null);

  const handleHeroSelect = (index: number, hero: Hero | null) => {
    const newHeroes = [...selectedHeroes];
    if (hero) {
      newHeroes[index] = { name: hero.name, image: hero.image };
    } else {
      newHeroes[index] = { name: "", image: undefined };
    }
    setSelectedHeroes(newHeroes);
    setOpenPopover(null);
  };

  const startGame = () => {
    const filledHeroes = selectedHeroes.filter(hero => hero.name.trim() !== "");
    if (filledHeroes.length === 0) {
      return;
    }
    
    const queryParams = new URLSearchParams({
      players: playerCount.toString(),
      heroes: JSON.stringify(filledHeroes)
    });
    navigate(`/game?${queryParams.toString()}`);
  };

  const hasAtLeastOneHero = selectedHeroes.some(hero => hero.name.trim() !== "");

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-3">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-gold bg-clip-text text-transparent">
            Setup Eroi
          </h1>
          <p className="text-sm text-muted-foreground">
            Inserisci i nomi degli eroi<br/>
            ({playerCount} eroi - {slotCount} slot)
          </p>
        </div>

        <div className="space-y-3">
          {selectedHeroes.map((hero, index) => (
            <div key={index} className="relative">
              <Popover open={openPopover === index} onOpenChange={(open) => setOpenPopover(open ? index : null)}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openPopover === index}
                    className="w-full h-14 justify-between text-base bg-card border-primary/30 hover:border-primary hover:shadow-glow transition-all pr-12"
                  >
                    <span className={cn(!hero.name && "text-muted-foreground")}>
                      {hero.name || `Seleziona Eroe ${index + 1}`}
                    </span>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[--radix-popover-trigger-width] p-0 bg-card border-primary/30">
                  <Command>
                    <CommandInput placeholder="Cerca eroe..." />
                    <CommandList>
                      <CommandEmpty>Nessun eroe trovato.</CommandEmpty>
                      <CommandGroup>
                        {heroes.map((heroOption) => (
                          <CommandItem
                            key={heroOption.id}
                            value={heroOption.name}
                            onSelect={() => handleHeroSelect(index, heroOption)}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                hero.name === heroOption.name ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {heroOption.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-accent font-bold text-sm pointer-events-none">
                #{index + 1}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-3 pt-2">
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="flex-1 h-12 border-primary/30 hover:border-primary hover:shadow-glow active:scale-95"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Indietro
          </Button>
          <Button
            onClick={startGame}
            disabled={!hasAtLeastOneHero}
            className="flex-1 h-12 bg-gradient-primary hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
          >
            Inizia
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlayerSetup;
