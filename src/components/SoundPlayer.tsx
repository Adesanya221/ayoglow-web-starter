import { useEffect, useState } from 'react';
import SoundService from '@/services/SoundService';

const SoundPlayer = () => {
  const [hasInteracted, setHasInteracted] = useState(false);
  const [soundsInitialized, setSoundsInitialized] = useState(false);

  useEffect(() => {
    // Initialize sound service
    const isMuted = SoundService.getMuteState();
    setSoundsInitialized(true);
    
    // Log sound initialization status
    console.log('Sound system initialized, muted:', isMuted);

    // Check for previously stored interaction state
    const hasUserInteracted = sessionStorage.getItem('hasInteracted') === 'true';
    setHasInteracted(hasUserInteracted);
    
    // If user has already interacted in previous session, try to play background music
    if (hasUserInteracted && !isMuted) {
      setTimeout(() => {
        SoundService.playBackgroundMusic();
      }, 1000);
    }

    // Add event listeners to detect first user interaction
    const handleInteraction = () => {
      if (!hasUserInteracted) {
        setHasInteracted(true);
        sessionStorage.setItem('hasInteracted', 'true');
        
        // Only play sounds if not muted
        if (!SoundService.getMuteState()) {
          // Small delay to ensure the audio context is properly initialized
          setTimeout(() => {
            try {
              // Play welcome sound
              SoundService.playWelcome();
              console.log('Welcome sound triggered after user interaction');
              
              // Start background music after welcome sound
              setTimeout(() => {
                SoundService.playBackgroundMusic();
                console.log('Background music started');
              }, 1000);
            } catch (error) {
              console.error('Failed to play sounds:', error);
            }
          }, 100);
        }
        
        // Remove event listeners after first interaction
        document.removeEventListener('click', handleInteraction);
        document.removeEventListener('touchstart', handleInteraction);
        document.removeEventListener('keydown', handleInteraction);
      }
    };

    // Add event listeners
    document.addEventListener('click', handleInteraction);
    document.addEventListener('touchstart', handleInteraction);
    document.addEventListener('keydown', handleInteraction);

    // Clean up event listeners on component unmount
    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
    };
  }, []);

  return null; // This component doesn't render anything visible
};

export default SoundPlayer; 