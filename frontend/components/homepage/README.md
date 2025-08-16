# Homepage Components

This directory contains various components used on the FitFusion homepage.

## Banner Component

A simple, responsive image carousel banner component built with React and Next.js, similar to Deodap Zandu Care style.

## Features

- **Simple Image Carousel**: Clean, image-only design without extra content
- **Responsive Design**: Automatically adapts to mobile, tablet, and desktop screens
- **Auto-play**: Automatic slide transitions every 5 seconds
- **Navigation Controls**: Left/right arrow buttons for manual navigation
- **Dot Indicators**: Clickable dots to jump to specific slides
- **Performance**: Optimized with Next.js Image component

## Usage

```tsx
import Banner from "@/components/homepage/Banner";

export default function HomePage() {
  return (
    <div>
      <Banner />
      {/* Other components */}
    </div>
  );
}
```

## Props

This component doesn't accept any props and is self-contained.

## Features Included

### Carousel Functionality

- **Auto-play**: Slides change automatically every 5 seconds
- **Manual Navigation**: Left/right arrow buttons
- **Dot Indicators**: Click to jump to specific slides
- **Smooth Transitions**: CSS transitions for slide changes

### Image Management

- **5 Default Slides**: Each slide has separate mobile and desktop images
- **Responsive Images**: Automatically loads appropriate image based on device
- **Priority Loading**: First image loads with priority

### Responsive Breakpoints

- **Desktop**: 70vh height with full navigation
- **Tablet**: 50vh height with adjusted controls
- **Mobile**: 40vh height with compact controls

## Customization

### Images

Update the `slides` array in the component:

```tsx
const slides = [
  {
    id: 1,
    mobileImage: "/path/to/mobile-image1.webp",
    desktopImage: "/path/to/desktop-image1.webp",
    alt: "Description 1",
  },
  {
    id: 2,
    mobileImage: "/path/to/mobile-image2.webp",
    desktopImage: "/path/to/desktop-image2.webp",
    alt: "Description 2",
  },
  // Add more slides as needed
];
```

**Image Structure:**

- **Mobile Images**: Optimized for smaller screens (e.g., `mobile-1.webp`)
- **Desktop Images**: Higher resolution for larger screens (e.g., `desktop-1.webp`)
- **Automatic Detection**: Component automatically detects device type and loads appropriate image

### Timing

Change auto-play interval:

```tsx
setInterval(() => {
  setCurrentSlide((prev) => (prev + 1) % slides.length);
}, 5000); // 5 seconds - change this value
```

### Styling

Custom CSS is available in `Banner.css` for:

- Carousel dimensions and positioning
- Navigation button styles
- Dot indicator appearance
- Responsive breakpoints

## Dependencies

- React 18+
- Next.js 13+
- No external carousel libraries

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance Notes

- Images are optimized with Next.js Image component
- CSS transitions use GPU acceleration
- Minimal JavaScript for smooth performance
- Reduced motion support for accessibility

---

## VideoGallery Component

A modern, responsive video gallery component that displays videos in an Instagram reel-like carousel format.

### Features

- **Carousel Display**: Shows 5 videos at a time with navigation arrows
- **Instagram Reel Style**: Videos have a 3:4 aspect ratio similar to Instagram reels
- **Interactive Elements**:
  - Play button overlay on hover
  - View count display
  - Click to open modal
- **Modal Popup**:
  - Full-screen video player
  - Play/pause controls
  - Left/right navigation between videos
  - Share functionality
  - Video details display

### Usage

```tsx
import VideoGallery from "@/components/homepage/VideoGallery";
import { getVideos } from "@/lib/data/video";

export default async function Home() {
  const videos = await getVideos();

  return (
    <div>
      <VideoGallery videos={videos} />
    </div>
  );
}
```

### Video Data Structure

```typescript
interface Video {
  id: string;
  url: string;
  product_id: string;
  title?: string;
  description?: string;
  thumbnail?: string;
  views?: number;
  duration?: number;
}
```

### Styling

The component uses CSS modules with:

- Responsive design for mobile, tablet, and desktop
- Smooth animations and transitions
- Modern gradient backgrounds
- Hover effects and interactive states

### Backend Integration

To use real video data from the backend:

1. Ensure the video module is properly configured
2. Run the database migrations to add the new fields
3. Uncomment the `getVideos()` call in the homepage
4. Remove the mock data import

### Sample Videos

The component includes sample videos from Google's sample video collection for testing purposes. Replace these with your actual video URLs in production.

### Responsive Breakpoints

- **Desktop**: 5 videos visible, full navigation
- **Tablet**: 4 videos visible, adjusted spacing
- **Mobile**: 3 videos visible, compact layout

### Browser Support

- Modern browsers with ES6+ support
- Video element support required
- Web Share API for sharing (with clipboard fallback)
