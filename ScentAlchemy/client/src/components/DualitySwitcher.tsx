import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Sun, Moon, Settings } from 'lucide-react';
import { useDuality } from '@/contexts/DualityContext';

export default function DualitySwitcher() {
  const { currentDuality, currentVariant, toggleDuality, setDualityPreset, availablePresets } = useDuality();

  const currentName = currentVariant === 'A' ? currentDuality.nameA : currentDuality.nameB;
  const oppositeVariant = currentVariant === 'A' ? 'B' : 'A';
  const oppositeName = oppositeVariant === 'A' ? currentDuality.nameA : currentDuality.nameB;

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2" data-testid="duality-switcher">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="sm" variant="outline" data-testid="button-preset-selector">
            <Settings className="w-4 h-4 mr-2" />
            {currentDuality.nameA} | {currentDuality.nameB}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {availablePresets.map((preset) => (
            <DropdownMenuItem 
              key={preset.id}
              onClick={() => setDualityPreset(preset.id)}
              data-testid={`option-${preset.id}`}
            >
              <div className="flex items-center justify-between w-full">
                <span>{preset.nameA} | {preset.nameB}</span>
                {preset.id === currentDuality.id && <Badge variant="secondary">Current</Badge>}
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="flex items-center bg-card border rounded-lg p-1">
        <Badge 
          variant={currentVariant === 'A' ? 'default' : 'secondary'} 
          className="text-xs"
          data-testid="badge-variant-a"
        >
          {currentDuality.nameA}
        </Badge>
        <Button
          size="sm"
          variant="ghost" 
          onClick={toggleDuality}
          className="mx-1 p-2"
          data-testid="button-toggle-duality"
        >
          {currentVariant === 'A' ? (
            <Sun className="w-4 h-4" data-testid="icon-current-variant" />
          ) : (
            <Moon className="w-4 h-4" data-testid="icon-current-variant" />
          )}
        </Button>
        <Badge 
          variant={currentVariant === 'B' ? 'default' : 'secondary'} 
          className="text-xs"
          data-testid="badge-variant-b"
        >
          {currentDuality.nameB}
        </Badge>
      </div>
    </div>
  );
}