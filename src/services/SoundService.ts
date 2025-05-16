// Sound files paths
const SOUNDS = {
  WELCOME: '/audio/welcome.mp3',
  ADD_TO_CART: '/audio/add-to-cart.mp3',
  SUCCESS: '/audio/success.mp3',
  ERROR: '/audio/error.mp3',
  NOTIFICATION: '/audio/notification.mp3',
  BACKGROUND_MUSIC: '/audio/background-music.mp3', // Background music track
};

// Pre-load audio objects
const audioElements: { [key: string]: HTMLAudioElement | null } = {};

// Initialize audio elements
Object.entries(SOUNDS).forEach(([key, path]) => {
  try {
    const audio = new Audio(path);
    
    // Set different default volume for background music
    if (key === 'BACKGROUND_MUSIC') {
      audio.volume = 0.5; // Medium volume (50%)
      audio.loop = true; // Loop the background music
    } else {
      audio.volume = 0.3; // Default volume at 30% for other sounds
    }
    
    audio.preload = 'auto';
    
    // Add error handler for loading failures
    audio.addEventListener('error', (e) => {
      console.warn(`Failed to load sound: ${path}`, e);
      audioElements[key] = null;
    });
    
    audioElements[key] = audio;
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
   * Play a sound by key if not muted
   */
  static play(soundKey: keyof typeof SOUNDS): void {
    if (this.isMuted) return;
    
    const audio = audioElements[soundKey];
    if (audio) {
      // Reset and play
      audio.pause();
      audio.currentTime = 0;
      
      // Use promise with better error handling
      audio.play()
        .catch(err => {
          console.warn(`Failed to play sound: ${soundKey}`, err);
          // Remove the problematic audio element to prevent future errors
          if (err.name === 'NotSupportedError' || err.name === 'NotAllowedError') {
            audioElements[soundKey] = null;
          }
        });
    }
  }
  
  /**
   * Play background music
   */
  static playBackgroundMusic(): void {
    if (this.isMuted) return;
    
    const audio = audioElements['BACKGROUND_MUSIC'];
    if (audio) {
      audio.play()
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
}

export default SoundService; 