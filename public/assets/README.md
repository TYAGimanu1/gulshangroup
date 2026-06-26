# Assets Folder Guide

This folder contains all static assets for the Gulshan Group project.

## Folder Structure

- **images/** - Store property photos, hero images, and other visuals
- **icons/** - Store icon files (SVG, PNG)
- **logos/** - Store brand logos and branding assets

## How to Use in Your Project

### In React Components:
```jsx
<img src="/assets/images/property.jpg" alt="Property" />
```

### In CSS:
```css
background-image: url('/assets/images/hero-bg.jpg');
```

### In Next.js Image Component (Optimized):
```jsx
import Image from 'next/image';

<Image
  src="/assets/images/property.jpg"
  alt="Property"
  width={800}
  height={600}
/>
```

## File Size Tips
- Optimize images before adding (use tools like TinyPNG, ImageOptim)
- Use PNG for icons and logos
- Use JPEG for photographs
- Consider using WebP for better compression

## Supported Formats
- JPEG (.jpg, .jpeg)
- PNG (.png)
- SVG (.svg)
- WebP (.webp)
- GIF (.gif)
