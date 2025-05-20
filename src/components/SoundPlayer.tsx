import { useEffect, useState, useRef } from 'react';
import SoundService from '@/services/SoundService';

// Passive event listener options for better performance
const passiveListenerOptions = { passive: true, capture: true };

const SoundPlayer = () => {
  const [hasInteracted, setHasInteracted] = useState(false);
  const [soundsInitialized, setSoundsInitialized] = useState(false);
  const autoplayAttempted = useRef(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const [customSoundEnabled, setCustomSoundEnabled] = useState(() => {
    const savedState = localStorage.getItem('customSoundEnabled');
    return savedState ? savedState === 'true' : true; // Enable by default
  });

  // Function to initialize Web Audio API context with user gesture (optimized)
  const initAudioContext = () => {
    if (!audioContextRef.current) {
      try {
        // Use the AudioContext from SoundService if available
        audioContextRef.current = SoundService.initAudioContext();
        
        if (audioContextRef.current) {
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
        }
      } catch (error) {
        console.error('Failed to initialize audio context:', error);
        return false;
      }
    }
    return audioContextRef.current && audioContextRef.current.state === 'running';
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
        document.addEventListener('visibilitychange', handleVisibilityChange, false);
        
        // Try auto-play immediately
        playAllSounds();
        
        // Also try with a short delay as a fallback
        setTimeout(playAllSounds, 100);
      } catch (error) {
        console.log('Autoplay was blocked, waiting for user interaction', error);
      }
    }
  };
  
  // Visibility change handler (extracted as a named function for proper cleanup)
  const handleVisibilityChange = () => {
    if (document.visibilityState === 'visible' && !hasInteracted) {
      playAllSounds();
    }
  };
  
  // Function to play all sounds in sequence (optimized)
  const playAllSounds = () => {
    if (SoundService.getMuteState()) return;
    
    try {
      // Try to unlock audio context first
      if (audioContextRef.current && audioContextRef.current.state !== 'running') {
        audioContextRef.current.resume();
      }
      
      // Play welcome sound
      SoundService.playWelcome();
      
      // If welcome sound succeeded, try background music directly
      // Only add custom sound if enabled (delayed slightly)
      if (customSoundEnabled) {
        setTimeout(() => SoundService.playCustomSound(), 200);
      }
      
      // Start background music immediately after welcome
      setTimeout(() => SoundService.playBackgroundMusic(), 300);
    } catch (error) {
      console.error('Error playing sounds:', error);
    }
  };

  // User interaction handler (optimized and extracted for better cleanup)
  const handleInteraction = () => {
    if (hasInteracted) return; // Exit early if already handled
    
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
      // Play sounds immediately without delay
      playAllSounds();
    }
    
    // Remove all event listeners for better performance
    removeAllEventListeners();
  };
  
  // Function to add all event listeners
  const addAllEventListeners = () => {
    document.addEventListener('click', handleInteraction, passiveListenerOptions);
    document.addEventListener('touchstart', handleInteraction, passiveListenerOptions);
    document.addEventListener('touchend', handleInteraction, passiveListenerOptions);
    document.addEventListener('keydown', handleInteraction, passiveListenerOptions);
    document.addEventListener('pointerdown', handleInteraction, passiveListenerOptions);
    document.addEventListener('pointerup', handleInteraction, passiveListenerOptions);
    window.addEventListener('scroll', handleInteraction, passiveListenerOptions);
  };
  
  // Function to remove all event listeners (for cleanup)
  const removeAllEventListeners = () => {
    document.removeEventListener('click', handleInteraction, passiveListenerOptions);
    document.removeEventListener('touchstart', handleInteraction, passiveListenerOptions);
    document.removeEventListener('touchend', handleInteraction, passiveListenerOptions);
    document.removeEventListener('keydown', handleInteraction, passiveListenerOptions);
    document.removeEventListener('pointerdown', handleInteraction, passiveListenerOptions);
    document.removeEventListener('pointerup', handleInteraction, passiveListenerOptions);
    window.removeEventListener('scroll', handleInteraction, passiveListenerOptions);
  };
  
  // Custom sound toggle state handler
  const toggleCustomSound = (event: any) => {
    if (event.detail && typeof event.detail.customSoundEnabled === 'boolean') {
      setCustomSoundEnabled(event.detail.customSoundEnabled);
      localStorage.setItem('customSoundEnabled', event.detail.customSoundEnabled.toString());
    }
  };

  useEffect(() => {
    // Initialize sound service
    const isMuted = SoundService.getMuteState();
    setSoundsInitialized(true);
    
    // Check for previously stored interaction state
    const hasUserInteracted = sessionStorage.getItem('hasInteracted') === 'true';
    setHasInteracted(hasUserInteracted);
    
    // Initialize audio context immediately
    initAudioContext();
    
    // Attempt autoplay when component mounts
    attemptAutoplay();
    
    // If user has already interacted in previous session, try to play background music
    if (hasUserInteracted && !isMuted) {
      SoundService.playBackgroundMusic();
    }

    // Auto-play when page loads or becomes visible
    if (document.visibilityState === 'visible') {
      playAllSounds();
    }

    // Add all event listeners
    addAllEventListeners();
    
    // Listen for custom sound toggle events
    window.addEventListener('custom-sound-toggle', toggleCustomSound);

    // Clean up event listeners on component unmount
    return () => {
      removeAllEventListeners();
      window.removeEventListener('custom-sound-toggle', toggleCustomSound);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [customSoundEnabled, hasInteracted]);

  return null; // This component doesn't render anything visible
};

export default SoundPlayer; 