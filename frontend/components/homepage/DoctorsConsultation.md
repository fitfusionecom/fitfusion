# Doctors Consultation Component

A responsive doctors consultation section with a carousel that matches the FitFusion project's design style.

## Features

- **Interactive Carousel**: Swiper-based carousel with navigation arrows and pagination dots
- **Doctor Profiles**: Detailed doctor information with images, specializations, and experience
- **WhatsApp Integration**: Direct WhatsApp consultation booking with pre-filled messages
- **Benefits Section**: Six key benefits with icons and descriptions
- **Responsive Design**: Mobile-first approach with Bootstrap grid system
- **Hover Effects**: Smooth animations and transitions

## Usage

### Basic Implementation

```tsx
import DoctorsConsultation from "@/components/homepage/DoctorsConsultation";

export default function HomePage() {
  return (
    <div>
      {/* Other components */}
      <DoctorsConsultation />
      {/* Other components */}
    </div>
  );
}
```

### Customization

#### WhatsApp Number

Update the phone number in the `handleWhatsAppConsultation` function:

```tsx
const handleWhatsAppConsultation = (doctorName: string) => {
  const phoneNumber = "+919876543210"; // Replace with your actual WhatsApp number
  const message = `Hi, I would like to book a free consultation with ${doctorName} for Ayurvedic treatment.`;
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;
  window.open(whatsappUrl, "_blank");
};
```

#### Doctor Data

Modify the `doctors` array to add/remove doctors or update their information:

```tsx
const doctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. Pragati Panwar",
    image: "/assets/images/doctors/doctor-1.jpg",
    specialization: [
      "Gynecological",
      "Stomach",
      "Skin",
      "Panchakarma",
      "Lifestyle Issues",
    ],
    experience: "2+ Years",
    languages: ["Hindi", "English"],
    description:
      "Dr. Pragati Panwar is an experienced Ayurvedic practitioner...",
    patients: "3,000+",
  },
  // Add more doctors...
];
```

#### Benefits

Update the `benefits` array to modify the benefits section:

```tsx
const benefits = [
  {
    icon: FaCheck,
    title: "Expert Ayurveda Doctors",
    description: "Qualified and experienced practitioners",
  },
  // Add more benefits...
];
```

## Required Assets

### Images

Place doctor images in the following directory structure:

```
public/assets/images/doctors/
├── doctor-1.jpg
├── doctor-2.jpg
├── doctor-3.jpg
├── doctor-4.jpg
├── doctor-5.jpg
├── doctor-side-1.jpg
└── doctor-side-2.jpg
```

### Image Specifications

- **Main doctor images**: 200x250px (4:5 aspect ratio)
- **Side doctor images**: 80x100px (4:5 aspect ratio)
- **Format**: JPG or PNG
- **Optimization**: Compressed for web use

## Dependencies

- **Swiper**: Carousel functionality
- **React Icons**: Icon components
- **Next.js Image**: Optimized image handling
- **Bootstrap**: Grid system and responsive utilities

## Styling

The component uses custom CSS that matches the FitFusion design system:

- **Primary Colors**: Dark green (#2d5016), Golden (#d4af37)
- **Secondary Colors**: Olive green (#556b2f), WhatsApp green (#25d366)
- **Background**: Light gradient from white to light green
- **Typography**: Consistent with existing components
- **Shadows**: Subtle depth with hover effects

## Responsive Breakpoints

- **Desktop**: Full layout with side-by-side content
- **Tablet**: Adjusted spacing and typography
- **Mobile**: Stacked layout with centered content

## Accessibility

- **ARIA Labels**: Navigation buttons include proper labels
- **Keyboard Navigation**: Arrow keys and tab navigation supported
- **Screen Reader**: Semantic HTML structure for better compatibility
- **Focus States**: Visible focus indicators for interactive elements

## Performance

- **Lazy Loading**: Swiper initializes only when component mounts
- **Image Optimization**: Next.js Image component for automatic optimization
- **Smooth Animations**: CSS transitions for better performance
- **Memory Management**: Proper cleanup of Swiper instances

## Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile Browsers**: iOS Safari, Chrome Mobile, Samsung Internet
- **Fallbacks**: Graceful degradation for older browsers

## Troubleshooting

### Swiper Not Working

- Ensure Swiper CSS is imported
- Check browser console for JavaScript errors
- Verify Swiper package is installed

### Images Not Loading

- Check image paths in the `public` directory
- Verify image file names match the component
- Ensure images are properly optimized

### WhatsApp Link Issues

- Verify phone number format (include country code)
- Test message encoding for special characters
- Check if WhatsApp is available on the device

## License

This component is part of the FitFusion project and follows the same licensing terms.
