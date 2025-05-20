// Sound files paths
const SOUNDS = {
  WELCOME: '/audio/fashion-beauty-luxury-music-331431.mp3',
  ADD_TO_CART: '/audio/add-to-cart.mp3',
  SUCCESS: '/audio/success.mp3',
  ERROR: '/audio/error.mp3',
  NOTIFICATION: '/audio/notification.mp3',
  BACKGROUND_MUSIC: '/audio/fashion-beauty-luxury-music-331431.mp3', // Background music track
  CUSTOM_SOUND: '/audio/fashion-beauty-luxury-music-331431.mp3', // Add your custom sound file name here
};

// Pre-load audio objects
const audioElements: { [key: string]: HTMLAudioElement | null } = {};

// Pre-buffered audio objects for instant playback
const bufferedSounds: { [key: string]: AudioBuffer | null } = {};
let audioContext: AudioContext | null = null;

// Initialize audio elements with optimizations
Object.entries(SOUNDS).forEach(([key, path]) => {
  try {
    // Create standard HTML5 Audio element for fallback
    const audio = new Audio(path);
    
    // Set different default volume for background music
    if (key === 'BACKGROUND_MUSIC') {
      audio.volume = 0.3; // Reduced by 40% from 0.5 (50%) to 0.3 (30%)
      audio.loop = true; // Loop the background music
    } else {
      audio.volume = 0.18; // Reduced by 40% from 0.3 (30%) to 0.18 (18%)
    }
    
    // Set high priority for audio element
    audio.preload = 'auto';
    
    // Add error handler for loading failures
    audio.addEventListener('error', (e) => {
      console.warn(`Failed to load sound: ${path}`, e);
      audioElements[key] = null;
    });
    
    audioElements[key] = audio;
    
    // Pre-cache the audio for instant response
    if (key !== 'BACKGROUND_MUSIC') { // Only buffer small sounds, not large music files
      fetch(path)
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => {
          if (!audioContext) {
            audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          }
          return audioContext.decodeAudioData(arrayBuffer);
        })
        .then(audioBuffer => {
          bufferedSounds[key] = audioBuffer;
          console.log(`Sound ${key} pre-buffered for instant playback`);
        })
        .catch(error => {
          console.warn(`Failed to pre-buffer sound: ${path}`, error);
        });
    }
  } catch (error) {
    console.error(`Failed to create audio element: ${path}`, error);
    audioElements[key] = null;
  }
});

class SoundService {
  private static isMuted = false;
  private static backgroundMusicPlaying = false;

  /**
   * Get the current mute state
   */
  static getMuteState(): boolean {
    const savedMute = localStorage.getItem('soundMuted');
    this.isMuted = savedMute ? savedMute === 'true' : false;
    return this.isMuted;
  }

  /**
   * Set mute state
   */
  static setMuteState(muted: boolean): void {
    this.isMuted = muted;
    localStorage.setItem('soundMuted', muted.toString());
    
    // Handle background music when mute state changes
    if (muted && this.backgroundMusicPlaying) {
      this.pauseBackgroundMusic();
    } else if (!muted && !this.backgroundMusicPlaying) {
      this.playBackgroundMusic();
    }
    
    // Broadcast the mute state change
    const event = new CustomEvent('sound-preference-changed', { 
      detail: { isMuted: muted } 
    });
    window.dispatchEvent(event);
  }

  /**
   * Initialize or resume AudioContext
   */
  static initAudioContext(): AudioContext | null {
    try {
      if (!audioContext) {
        audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      if (audioContext.state !== 'running') {
        audioContext.resume();
      }
      
      return audioContext;
    } catch (error) {
      console.error('Failed to initialize audio context:', error);
      return null;
    }
  }

  /**
   * Play a sound by key if not muted - uses Web Audio API for small sounds when possible
   */
  static play(soundKey: keyof typeof SOUNDS): void {
    if (this.isMuted) return;
    
    // Try to play using buffered sound for faster response (except background music)
    if (soundKey !== 'BACKGROUND_MUSIC' && bufferedSounds[soundKey] && audioContext) {
      try {
        // Make sure audio context is running
        if (audioContext.state !== 'running') {
          audioContext.resume();
        }
        
        const source = audioContext.createBufferSource();
        source.buffer = bufferedSounds[soundKey];
        
        const gainNode = audioContext.createGain();
        gainNode.gain.value = 0.18; // UI sounds are always at this volume
        
        source.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        source.start(0);
        return;
      } catch (error) {
        console.warn(`Failed to play buffered sound: ${soundKey}`, error);
        // Fall back to HTML5 Audio
      }
    }
    
    // Fallback to HTML5 Audio
    const audio = audioElements[soundKey];
    if (audio) {
      // Reset and play
      audio.pause();
      audio.currentTime = 0;
      
      // Use promise with better error handling
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .catch(err => {
            console.warn(`Failed to play sound: ${soundKey}`, err);
            // Remove the problematic audio element to prevent future errors
            if (err.name === 'NotSupportedError' || err.name === 'NotAllowedError') {
              audioElements[soundKey] = null;
            }
          });
      }
    }
  }
  
  /**
   * Play background music
   */
  static playBackgroundMusic(): void {
    if (this.isMuted) return;
    
    const audio = audioElements['BACKGROUND_MUSIC'];
    if (audio) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.backgroundMusicPlaying = true;
            console.log('Background music started playing');
          })
          .catch(err => {
            console.warn('Failed to play background music', err);
            this.backgroundMusicPlaying = false;
          });
      }
    }
  }
  
  /**
   * Pause background music
   */
  static pauseBackgroundMusic(): void {
    const audio = audioElements['BACKGROUND_MUSIC'];
    if (audio) {
      audio.pause();
      this.backgroundMusicPlaying = false;
      console.log('Background music paused');
    }
  }
  
  /**
   * Check if background music is currently playing
   */
  static isBackgroundMusicPlaying(): boolean {
    return this.backgroundMusicPlaying;
  }

  /**
   * Play welcome sound
   */
  static playWelcome(): void {
    this.play('WELCOME');
  }

  /**
   * Play add to cart sound
   */
  static playAddToCart(): void {
    this.play('ADD_TO_CART');
  }

  /**
   * Play success sound
   */
  static playSuccess(): void {
    this.play('SUCCESS');
  }

  /**
   * Play error sound
   */
  static playError(): void {
    this.play('ERROR');
  }

  /**
   * Play notification sound
   */
  static playNotification(): void {
    this.play('NOTIFICATION');
  }

  /**
   * Play custom sound
   */
  static playCustomSound(): void {
    this.play('CUSTOM_SOUND');
  }
}

export default SoundService; 