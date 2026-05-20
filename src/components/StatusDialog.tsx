import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Minus } from "lucide-react";

interface StatusDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  statusType: "poison" | "immobilize" | "stun" | "heal" | "slow";
  onConfirm: (data: { amount?: number; turns: number }) => void;
}

const StatusDialog = ({ open, onOpenChange, statusType, onConfirm }: StatusDialogProps) => {
  const [amount, setAmount] = useState<number>(1);
  const [turns, setTurns] = useState<number>(1);

  const handleConfirm = () => {
    if (statusType === "poison" || statusType === "heal") {
      onConfirm({ amount, turns });
    } else {
      onConfirm({ turns });
    }
    onOpenChange(false);
    setAmount(1);
    setTurns(1);
  };

  const getTitle = () => {
    switch (statusType) {
      case "poison":
        return "Configura Veleno";
      case "immobilize":
        return "Configura Immobilizzamento";
      case "stun":
        return "Configura Stordimento";
      case "heal":
        return "Configura Guarigione";
      case "slow":
        return "Configura Rallentamento";
    }
  };

  const needsAmount = statusType === "poison" || statusType === "heal";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{getTitle()}</DialogTitle>
          <DialogDescription>
            Imposta i parametri per questo stato
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {needsAmount && (
            <div className="space-y-2">
              <Label htmlFor="amount">
                {statusType === "poison" ? "Quanti danni?" : "Quanto ti curi?"}
              </Label>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => setAmount(Math.max(1, amount - 1))}
                  className="h-10 w-10 shrink-0"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  id="amount"
                  type="number"
                  min="1"
                  value={amount}
                  onChange={(e) => setAmount(parseInt(e.target.value) || 1)}
                  className="text-center"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => setAmount(amount + 1)}
                  className="h-10 w-10 shrink-0"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="turns">Per quanti turni?</Label>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setTurns(Math.max(1, turns - 1))}
                className="h-10 w-10 shrink-0"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                id="turns"
                type="number"
                min="1"
                value={turns}
                onChange={(e) => setTurns(parseInt(e.target.value) || 1)}
                className="text-center"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setTurns(turns + 1)}
                className="h-10 w-10 shrink-0"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto"
          >
            Annulla
          </Button>
          <Button
            type="button"
            onClick={handleConfirm}
            className="w-full sm:w-auto"
          >
            Conferma
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StatusDialog;
