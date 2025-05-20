import { useEffect, useState, useRef } from 'react';
import SoundService from '@/services/SoundService';

const SoundPlayer = () => {
  const [hasInteracted, setHasInteracted] = useState(false);
  const [soundsInitialized, setSoundsInitialized] = useState(false);
  const autoplayAttempted = useRef(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const [customSoundEnabled, setCustomSoundEnabled] = useState(() => {
    const savedState = localStorage.getItem('customSoundEnabled');
    return savedState ? savedState === 'true' : true; // Enable by default
  });

  // Function to initialize Web Audio API context with user gesture
  const initAudioContext = () => {
    if (!audioContextRef.current) {
      try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        audioContextRef.current = new AudioContext();
        
        // Create and play a silent sound to unlock audio on iOS
        const silentSound = audioContextRef.current.createOscillator();
        const gainNode = audioContextRef.current.createGain();
        gainNode.gain.value = 0.001; // Almost silent
        silentSound.connect(gainNode);
        gainNode.connect(audioContextRef.current.destination);
        silentSound.start();
        silentSound.stop(audioContextRef.current.currentTime + 0.001);
        
        console.log('Audio context initialized:', audioContextRef.current.state);
        return true;
      } catch (error) {
        console.error('Failed to initialize audio context:', error);
        return false;
      }
    }
    return audioContextRef.current.state === 'running';
  };

  // Function to attempt autoplay (may be blocked by browser)
  const attemptAutoplay = () => {
    if (autoplayAttempted.current) return;
    autoplayAttempted.current = true;
    
    const isMuted = SoundService.getMuteState();
    if (!isMuted) {
      try {
        // Initialize audio context first
        initAudioContext();
        
        // Add visibility change listener to play when tab becomes visible
        document.addEventListener('visibilitychange', () => {
          if (document.visibilityState === 'visible' && !hasInteracted) {
            playAllSounds();
          }
        });
        
        // Try auto-play with very short timeout
        setTimeout(() => {
          playAllSounds();
        }, 100);
        
        // Also try with various delays as a fallback
        setTimeout(() => playAllSounds(), 1000);
        setTimeout(() => playAllSounds(), 2500);
      } catch (error) {
        console.log('Autoplay was blocked, waiting for user interaction', error);
      }
    }
  };
  
  // Function to play all sounds in sequence
  const playAllSounds = () => {
    if (SoundService.getMuteState()) return;
    
    try {
      // Try to unlock audio context first
      if (audioContextRef.current && audioContextRef.current.state !== 'running') {
        audioContextRef.current.resume();
      }
      
      // Play welcome sound
      SoundService.playWelcome();
      console.log('Playing welcome sound');
      
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
      console.error('Error playing sounds:', error);
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
    
    // Initialize audio context
    initAudioContext();
    
    // Attempt autoplay when component mounts
    attemptAutoplay();
    
    // If user has already interacted in previous session, try to play background music
    if (hasUserInteracted && !isMuted) {
      setTimeout(() => {
        SoundService.playBackgroundMusic();
      }, 1000);
    }

    // Auto-play when page loads or becomes visible
    if (document.visibilityState === 'visible') {
      playAllSounds();
    }

    // Add event listeners to detect first user interaction
    const handleInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        sessionStorage.setItem('hasInteracted', 'true');
        
        // Resume audio context on user interaction
        if (audioContextRef.current && audioContextRef.current.state !== 'running') {
          audioContextRef.current.resume()
            .then(() => console.log('AudioContext resumed successfully'))
            .catch(err => console.error('Failed to resume AudioContext:', err));
        }
        
        // Only play sounds if not muted
        if (!SoundService.getMuteState()) {
          // Small delay to ensure the audio context is properly initialized
          setTimeout(() => {
            playAllSounds();
          }, 100);
        }
        
        // Remove event listeners after first interaction
        document.removeEventListener('click', handleInteraction, true);
        document.removeEventListener('touchstart', handleInteraction, true);
        document.removeEventListener('touchend', handleInteraction, true);
        document.removeEventListener('keydown', handleInteraction, true);
        document.removeEventListener('pointerdown', handleInteraction, true);
        document.removeEventListener('pointerup', handleInteraction, true);
        window.removeEventListener('scroll', handleInteraction, true);
      }
    };

    // Add event listeners with capture to ensure they fire first
    document.addEventListener('click', handleInteraction, true);
    document.addEventListener('touchstart', handleInteraction, true);
    document.addEventListener('touchend', handleInteraction, true);
    document.addEventListener('keydown', handleInteraction, true);
    document.addEventListener('pointerdown', handleInteraction, true);
    document.addEventListener('pointerup', handleInteraction, true);
    window.addEventListener('scroll', handleInteraction, true);

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
      document.removeEventListener('click', handleInteraction, true);
      document.removeEventListener('touchstart', handleInteraction, true);
      document.removeEventListener('touchend', handleInteraction, true);
      document.removeEventListener('keydown', handleInteraction, true);
      document.removeEventListener('pointerdown', handleInteraction, true);
      document.removeEventListener('pointerup', handleInteraction, true);
      window.removeEventListener('scroll', handleInteraction, true);
      window.removeEventListener('custom-sound-toggle', toggleCustomSound);
      document.removeEventListener('visibilitychange', null);
    };
  }, [customSoundEnabled, hasInteracted]);

  return null; // This component doesn't render anything visible
};

export default SoundPlayer; 