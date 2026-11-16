import { useState } from 'react';
import { Flower2, Leaf, Sprout, Sun, Trees } from 'lucide-react';
import { MASCOTS } from '../data/questions';

interface MascotAvatarProps {
  mascotId: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const SIZE_CLASSES: Record<NonNullable<MascotAvatarProps['size']>, string> = {
  sm: 'w-9 h-9 rounded-lg',
  md: 'w-12 h-12 rounded-xl',
  lg: 'w-16 h-16 rounded-2xl',
  xl: 'w-20 h-20 rounded-2xl',
};

function FallbackMascotIcon({ mascotId }: { mascotId: string }) {
  switch (mascotId) {
    case 'sunflower':
      return <Sun className="w-1/2 h-1/2 text-[#CA8A04]" />;
    case 'cactus':
      return <Trees className="w-1/2 h-1/2 text-[#0D9488]" />;
    case 'lotus':
      return <Flower2 className="w-1/2 h-1/2 text-[#DB2777]" />;
    case 'fern':
      return <Leaf className="w-1/2 h-1/2 text-[#65A30D]" />;
    default:
      return <Sprout className="w-1/2 h-1/2 text-[#16A34A]" />;
  }
}

export function MascotAvatar({ mascotId, size = 'md', className = '' }: MascotAvatarProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const mascot = MASCOTS.find((m) => m.id === mascotId) ?? MASCOTS[0];

  return (
    <div
      className={`${SIZE_CLASSES[size]} ${mascot.softBgClass} border ${mascot.borderClass} overflow-hidden shrink-0 flex items-center justify-center ${className}`}
    >
      {!imgFailed ? (
        <img
          src={mascot.imageUrl}
          alt={mascot.name}
          referrerPolicy="no-referrer"
          onError={() => setImgFailed(true)}
          className="w-full h-full object-cover"
        />
      ) : (
        <FallbackMascotIcon mascotId={mascot.id} />
      )}
    </div>
  );
}
