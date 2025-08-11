# Product Components

This directory contains components related to product display and functionality.

## ProductAccordion Component

The `ProductAccordion` component is a collapsible accordion that displays product information in organized sections.

### Features

- **Product Description**: Shows the product description with HTML support
- **Additional Information**: Displays product details, variants, options, and metadata
- **Related Products**: Shows related products based on collection and tags
- **Responsive Design**: Works on all device sizes
- **Smooth Animations**: CSS transitions for smooth open/close animations

### Usage

```tsx
import ProductAccordion from "@/components/product/product-accordion";

<ProductAccordion product={productData} countryCode="in" />;
```

### Props

- `product`: The product object containing all product information
- `countryCode`: The country code for region-specific data

### Sections

1. **Product Description**

   - Displays the product description
   - Supports HTML content
   - Shows "No description available" if none exists

2. **Additional Information**

   - Product details (SKU, type, collection, tags, status)
   - Variants and options information
   - Inventory status
   - Product metadata
   - Variant details table with pricing and inventory

3. **Related Products**
   - Fetches related products based on collection and tags
   - Displays up to 6 related products
   - Shows loading state while fetching
   - Includes "View More" button

### Styling

The component uses the `product-accordion.css` file for styling, which includes:

- Modern accordion design with shadows and rounded corners
- Brand color scheme (#CD8973)
- Responsive breakpoints for mobile devices
- Smooth transitions and hover effects
- Bootstrap-compatible table styling

### Dependencies

- React hooks (useState)
- Lucide React icons (ChevronDown, ChevronUp)
- Bootstrap CSS classes
- Custom CSS for styling

### Related Components

- `RelatedProductsInline`: Client-side component for displaying related products
- `ProductCard`: Component for displaying individual product cards
- `ProductDetails`: Main product display component

## File Structure

```
product/
├── index.tsx              # Main ProductDetails component
├── product-accordion.tsx  # Accordion component
├── product-accordion.css  # Accordion styles
├── related.tsx            # Server-side related products
├── related-products-inline.tsx # Client-side related products
├── product-image-carousel.tsx # Product image display
├── product-price.tsx      # Price display component
├── option-select.tsx      # Product option selection
└── README.md              # This documentation
```
