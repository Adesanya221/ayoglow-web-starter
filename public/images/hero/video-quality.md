# Video Quality Enhancement Guide

The current `back-video.mp4` file is ~696KB, which might limit its quality. Here are steps to improve the video quality:

## Options for Higher Quality Video

### 1. Increase Video Bitrate & Resolution
Use a tool like FFmpeg to re-encode the video with higher quality settings:

```bash
# Example FFmpeg command for higher quality
ffmpeg -i original-video.mp4 -c:v libx264 -preset slow -crf 18 -vf "scale=1920:1080" -pix_fmt yuv420p back-video.mp4
```

### 2. Use Multiple Resolution Sources
Create multiple versions for different screen sizes:

```html
<video>
  <source src="/images/hero/back-video-4k.mp4" type="video/mp4" media="(min-width: 1440px)">
  <source src="/images/hero/back-video-1080p.mp4" type="video/mp4" media="(min-width: 720px)">
  <source src="/images/hero/back-video-720p.mp4" type="video/mp4">
</video>
```

### 3. Convert to WebM Format (Better Quality/Size Ratio)

```bash
ffmpeg -i back-video.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 -b:a 128k -c:a libopus back-video.webm
```

Then use both formats for browser compatibility:

```html
<video>
  <source src="/images/hero/back-video.webm" type="video/webm">
  <source src="/images/hero/back-video.mp4" type="video/mp4">
</video>
```

## Recommended Specs for High-Quality Background Video

- **Resolution**: 1920x1080 (1080p) or higher
- **Bitrate**: 5-8 Mbps for high quality
- **Format**: MP4 (H.264) and WebM (VP9)
- **Framerate**: 30fps
- **Duration**: Keep under 30 seconds to minimize file size
- **File Size Target**: 5-15MB for high quality

## Performance Considerations

- Videos over 5MB may impact page load time
- Consider adding a loading state while video is buffering 