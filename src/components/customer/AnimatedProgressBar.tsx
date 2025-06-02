
import { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface AnimatedProgressBarProps {
  value: number;
  userName: string;
  shouldAnimate?: boolean;
  onAnimationComplete?: () => void;
}

const AnimatedProgressBar = ({ 
  value, 
  userName, 
  shouldAnimate = false, 
  onAnimationComplete 
}: AnimatedProgressBarProps) => {
  const [animatedValue, setAnimatedValue] = useState(shouldAnimate ? 0 : value);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isGlowing, setIsGlowing] = useState(false);

  useEffect(() => {
    if (shouldAnimate) {
      const timer = setTimeout(() => {
        setAnimatedValue(value);
        setIsGlowing(true);
        
        // Show confetti after progress animation
        setTimeout(() => {
          setShowConfetti(true);
          setTimeout(() => {
            setShowConfetti(false);
            setIsGlowing(false);
            onAnimationComplete?.();
          }, 2000);
        }, 1000);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [shouldAnimate, value, onAnimationComplete]);

  return (
    <div className="relative">
      {/* Confetti overlay */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="text-6xl animate-bounce">🎉</div>
          <div className="absolute top-1/4 left-1/4 text-4xl animate-ping">🎊</div>
          <div className="absolute top-1/3 right-1/4 text-4xl animate-pulse">✨</div>
          <div className="absolute bottom-1/3 left-1/3 text-4xl animate-bounce">🎈</div>
          <div className="absolute bottom-1/4 right-1/3 text-4xl animate-ping">🌟</div>
        </div>
      )}
      
      {/* Progress bar container */}
      <div className="relative">
        <Progress 
          value={animatedValue} 
          className={cn(
            "h-4 transition-all duration-1000",
            shouldAnimate && "shadow-lg shadow-blue-300"
          )} 
        />
        
        {/* User avatar positioned at progress end */}
        <div 
          className="absolute top-1/2 -translate-y-1/2 transition-all duration-1000"
          style={{ left: `${Math.max(0, Math.min(95, animatedValue - 2))}%` }}
        >
          <Avatar 
            className={cn(
              "h-8 w-8 border-2 border-white shadow-lg transition-all duration-500",
              isGlowing && "ring-4 ring-blue-400 ring-opacity-75 animate-pulse"
            )}
          >
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs">
              {userName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
};

export default AnimatedProgressBar;
