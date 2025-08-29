# Floating Chatbot Component

A floating chatbot button that appears on all pages with a popover containing a WhatsApp query button.

## Features

- Floating chat button positioned at bottom-right corner
- Smooth animations and transitions
- WhatsApp integration for instant customer support
- Click outside to close functionality
- Responsive design for mobile devices
- Customizable WhatsApp number and message

## Customization

### WhatsApp Number
To change the WhatsApp number, edit the `phoneNumber` variable in `FloatingChatbot.tsx`:

```typescript
const phoneNumber = '+919876543210'; // Update this with your actual number
```

### WhatsApp Message
To customize the default message, edit the `message` variable:

```typescript
const message = 'Hi! I have a query about Fit Fusion Ayurveda products.';
```

### Styling
The component uses Tailwind CSS classes and custom CSS. You can modify:
- Colors in the component (currently using green theme)
- Animations in `FloatingChatbot.css`
- Positioning and sizing
- Icons (using Lucide React icons)

## Usage

The component is automatically included in the main layout (`components/layouts/primary/index.tsx`) and will appear on all pages.

## Dependencies

- React hooks (useState, useEffect, useRef)
- Lucide React icons
- Tailwind CSS
- Custom CSS animations
