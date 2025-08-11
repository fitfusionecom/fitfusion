# Banner Component

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
