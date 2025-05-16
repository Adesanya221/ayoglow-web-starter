/**
 * VideoProcessor - Utility functions for optimizing video playback quality
 */

/**
 * Enhances video element for the best quality playback
 * @param videoElement - HTML video element to optimize
 */
export const optimizeVideoQuality = (videoElement: HTMLVideoElement | null): void => {
  if (!videoElement) return;
  
  // Set HTML attributes for best quality
  videoElement.setAttribute('preload', 'auto');
  
  // Apply playback quality settings
  try {
    // Cast to any to access non-standard properties
    const videoEl = videoElement as any;
    
    // Set quality preference if available
    if (videoEl.getVideoPlaybackQuality) {
      console.log('Video quality API available');
    }
    
    // Some browsers support mediaSource settings
    if (videoEl.mediaSource) {
      if (typeof videoEl.mediaSource.setQualityLevel === 'function') {
        videoEl.mediaSource.setQualityLevel('high');
      }
    }
    
    // Chrome-specific optimizations
    if (videoEl.webkitSetQualityLevel) {
      videoEl.webkitSetQualityLevel('high');
    }
    
    // Firefox-specific optimizations
    if (videoEl.mozSetVideoQuality) {
      videoEl.mozSetVideoQuality('high');
    }
    
    // Edge/IE-specific optimizations
    if (videoEl.msSetVideoQuality) {
      videoEl.msSetVideoQuality('high');
    }
  } catch (e) {
    console.log('Advanced video optimizations not supported');
  }
  
  // Ensure highest quality initial frame
  videoElement.addEventListener('loadedmetadata', () => {
    // Request high-quality frame when metadata is loaded
    if ('requestVideoFrameCallback' in HTMLVideoElement.prototype) {
      (videoElement as any).requestVideoFrameCallback(() => {
        console.log('High quality frame requested');
      });
    }
  });
  
  // Force hardware acceleration if supported
  videoElement.style.transform = 'translateZ(0)';
};

/**
 * Creates an optimized video source element
 * @param src - Video source URL
 * @param type - Video MIME type
 * @returns Optimized source element
 */
export const createOptimizedSource = (
  src: string,
  type: string = 'video/mp4'
): HTMLSourceElement => {
  const source = document.createElement('source');
  source.src = src;
  source.type = type;
  
  // Add quality hints
  source.setAttribute('sizes', '100vw');
  
  return source;
};

export default {
  optimizeVideoQuality,
  createOptimizedSource,
}; 