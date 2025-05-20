import { useEffect, useState, useRef } from 'react';
import SoundService from '@/services/SoundService';

const SoundPlayer = () => {
  const [hasInteracted, setHasInteracted] = useState(false);
  const [soundsInitialized, setSoundsInitialized] = useState(false);
  const autoplayAttempted = useRef(false);
  const [customSoundEnabled, setCustomSoundEnabled] = useState(() => {
    const savedState = localStorage.getItem('customSoundEnabled');
    return savedState ? savedState === 'true' : true; // Enable by default
  });

  // Function to attempt autoplay (may be blocked by browser)
  const attemptAutoplay = () => {
    if (autoplayAttempted.current) return;
    autoplayAttempted.current = true;
    
    const isMuted = SoundService.getMuteState();
    if (!isMuted) {
      try {
        // Try to play the sound automatically
        SoundService.playWelcome();
        console.log('Auto-playing welcome sound on app launch');
        
        // If welcome sound succeeded, try custom sound and background music
        setTimeout(() => {
          if (customSoundEnabled) {
            SoundService.playCustomSound();
          }
          
          setTimeout(() => {
            SoundService.playBackgroundMusic();
          }, 500);
        }, 300);
      } catch (error) {
        console.log('Autoplay was blocked, waiting for user interaction', error);
      }
    }
  };

  useEffect(() => {
    // Initialize sound service
    const isMuted = SoundService.getMuteState();
    setSoundsInitialized(true);
    
    // Log sound initialization status
    console.log('Sound system initialized, muted:', isMuted);

    // Check for previously stored interaction state
    const hasUserInteracted = sessionStorage.getItem('hasInteracted') === 'true';
    setHasInteracted(hasUserInteracted);
    
    // Attempt autoplay when component mounts
    attemptAutoplay();
    
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
              
              // Play custom sound if enabled
              if (customSoundEnabled) {
                setTimeout(() => {
                  SoundService.playCustomSound();
                  console.log('Custom sound played');
                }, 500);
              }
              
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

    // Custom sound toggle state handler
    const toggleCustomSound = (event) => {
      if (event.detail && event.detail.hasOwnProperty('customSoundEnabled')) {
        setCustomSoundEnabled(event.detail.customSoundEnabled);
        localStorage.setItem('customSoundEnabled', event.detail.customSoundEnabled.toString());
      }
    };
    
    // Listen for custom sound toggle events
    window.addEventListener('custom-sound-toggle', toggleCustomSound);

    // Clean up event listeners on component unmount
    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
      window.removeEventListener('custom-sound-toggle', toggleCustomSound);
    };
  }, [customSoundEnabled]);

  return null; // This component doesn't render anything visible
};

export default SoundPlayer; 