import { useState, useEffect } from 'react';
import { Music, MicOff } from 'lucide-react';

const CustomSoundControl = () => {
  const [isEnabled, setIsEnabled] = useState(() => {
    const savedState = localStorage.getItem('customSoundEnabled');
    return savedState ? savedState === 'true' : true; // Enable by default
  });

  useEffect(() => {
    // Broadcast the state change
    const event = new CustomEvent('custom-sound-toggle', { 
      detail: { customSoundEnabled: isEnabled } 
    });
    window.dispatchEvent(event);
  }, [isEnabled]);

  const toggleCustomSound = () => {
    setIsEnabled(!isEnabled);
    localStorage.setItem('customSoundEnabled', (!isEnabled).toString());
  };

  return (
    <button 
      onClick={toggleCustomSound}
      className="text-gray-600 hover:text-primary transition-colors"
      title={isEnabled ? "Disable custom sound" : "Enable custom sound"}
      aria-label={isEnabled ? "Disable custom sound" : "Enable custom sound"}
    >
      {isEnabled ? <Music className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
    </button>
  );
};

export default CustomSoundControl; 