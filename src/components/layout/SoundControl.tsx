import { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import SoundService from '@/services/SoundService';

const SoundControl = () => {
  const [isMuted, setIsMuted] = useState(() => SoundService.getMuteState());

  useEffect(() => {
    // Update SoundService when mute state changes
    SoundService.setMuteState(isMuted);
  }, [isMuted]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <button 
      onClick={toggleMute}
      className="text-gray-600 hover:text-primary transition-colors"
      title={isMuted ? "Unmute sounds" : "Mute sounds"}
      aria-label={isMuted ? "Unmute sounds" : "Mute sounds"}
    >
      {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
    </button>
  );
};

export default SoundControl; 