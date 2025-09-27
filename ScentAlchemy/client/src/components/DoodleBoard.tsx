import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Brush, Eraser, Sun, Star, Sparkles, RotateCcw } from 'lucide-react';

interface DoodleBoardProps {
  roomId: string;
  isVisible: boolean;
  onClose: () => void;
}

export default function DoodleBoard({ roomId, isVisible, onClose }: DoodleBoardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentTool, setCurrentTool] = useState<'brush' | 'eraser' | 'stamp'>('brush');
  const [currentStamp, setCurrentStamp] = useState<'sun' | 'star' | 'sparkle'>('sun');
  const [interpretedMoods, setInterpretedMoods] = useState<string[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Set drawing styles
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, [isVisible]);

  const startDrawing = (e: React.MouseEvent) => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (currentTool === 'stamp') {
      addStamp(x, y);
    } else {
      setIsDrawing(true);
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const draw = (e: React.MouseEvent) => {
    if (!isDrawing || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineWidth = currentTool === 'eraser' ? 10 : 3;
    ctx.globalCompositeOperation = currentTool === 'eraser' ? 'destination-out' : 'source-over';
    ctx.strokeStyle = '#8b5cf6'; // Purple color for drawing
    
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    interpretDrawing();
  };

  const addStamp = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.font = '24px serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#8b5cf6';
    
    const stampMap = {
      sun: '☀️',
      star: '⭐',
      sparkle: '✨'
    };
    
    ctx.fillText(stampMap[currentStamp], x, y);
    interpretDrawing();
    
    console.log('Added stamp:', currentStamp, 'at position:', x, y);
  };

  const interpretDrawing = () => {
    // Simple mood interpretation based on tool usage
    const newMoods: string[] = [];
    
    if (currentTool === 'stamp') {
      if (currentStamp === 'sun') newMoods.push('Bright', 'Energetic', 'Day');
      if (currentStamp === 'star') newMoods.push('Dreamy', 'Night', 'Romantic');
      if (currentStamp === 'sparkle') newMoods.push('Magical', 'Festive', 'Celebratory');
    } else {
      newMoods.push('Creative', 'Expressive', 'Artistic');
    }
    
    setInterpretedMoods(prev => Array.from(new Set([...prev, ...newMoods])));
    console.log('Interpreted moods:', newMoods);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setInterpretedMoods([]);
    console.log('Canvas cleared');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" data-testid="doodle-board-overlay">
      <Card className="w-[90vw] max-w-4xl h-[80vh] flex flex-col">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="font-serif">Doodle & Express</CardTitle>
            <Button variant="outline" onClick={onClose} data-testid="button-close-doodle">
              Close
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Draw shapes and moods to discover scent suggestions for this room
          </p>
        </CardHeader>
        
        <CardContent className="flex-1 flex gap-4">
          {/* Tool palette */}
          <div className="w-48 space-y-4">
            <div>
              <h4 className="font-semibold text-sm mb-2">Drawing Tools</h4>
              <div className="space-y-2">
                <Button
                  variant={currentTool === 'brush' ? 'default' : 'outline'}
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => setCurrentTool('brush')}
                  data-testid="tool-brush"
                >
                  <Brush className="w-4 h-4 mr-2" />
                  Brush
                </Button>
                <Button
                  variant={currentTool === 'eraser' ? 'default' : 'outline'}
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => setCurrentTool('eraser')}
                  data-testid="tool-eraser"
                >
                  <Eraser className="w-4 h-4 mr-2" />
                  Eraser
                </Button>
                <Button
                  variant={currentTool === 'stamp' ? 'default' : 'outline'}
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => setCurrentTool('stamp')}
                  data-testid="tool-stamp"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Stamps
                </Button>
              </div>
            </div>

            {currentTool === 'stamp' && (
              <div>
                <h4 className="font-semibold text-sm mb-2">Mood Stamps</h4>
                <div className="space-y-2">
                  <Button
                    variant={currentStamp === 'sun' ? 'default' : 'outline'}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => setCurrentStamp('sun')}
                    data-testid="stamp-sun"
                  >
                    <Sun className="w-4 h-4 mr-2" />
                    Sun (Day)
                  </Button>
                  <Button
                    variant={currentStamp === 'star' ? 'default' : 'outline'}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => setCurrentStamp('star')}
                    data-testid="stamp-star"
                  >
                    <Star className="w-4 h-4 mr-2" />
                    Star (Night)
                  </Button>
                  <Button
                    variant={currentStamp === 'sparkle' ? 'default' : 'outline'}
                    size="sm"
                    className="w-full justify-start"
                    onClick={() => setCurrentStamp('sparkle')}
                    data-testid="stamp-sparkle"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Sparkle
                  </Button>
                </div>
              </div>
            )}

            <Separator />
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-sm">Interpreted Moods</h4>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={clearCanvas}
                  data-testid="button-clear-canvas"
                >
                  <RotateCcw className="w-3 h-3" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-1">
                {interpretedMoods.map((mood, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {mood}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Canvas area */}
          <div className="flex-1 relative bg-muted/20 rounded-lg">
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full cursor-crosshair rounded-lg"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              data-testid="doodle-canvas"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}