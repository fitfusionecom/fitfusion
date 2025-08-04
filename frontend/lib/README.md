# FitFusion Configuration System

This directory contains the configuration system for the FitFusion website. The main configuration file is `config.ts` which centralizes all brand information, contact details, and other configurable variables.

## Configuration File: `config.ts`

The configuration file contains the following sections:

### Brand Information
- Company name, short name, and tagline
- Logo URL and alt text
- Website URL
- Founded year

### Contact Information
- Support, sales, and info email addresses
- Phone number and WhatsApp
- Complete address details
- Business hours and working days

### Social Media
- Links to all social media platforms

### Business Information
- GST number, PAN number
- Company registration details
- Business type and industry

### Shipping & Delivery
- Free shipping threshold
- Delivery timeframes
- Delivery coverage

### Return & Refund Policy
- Return window and refund processing time
- Return conditions and non-returnable items

### Legal Information
- Last updated dates for all policies

### Payment Methods
- Accepted payment methods
- Security information

### Customer Support
- Response times and availability

## Usage

To use the configuration in any component:

```typescript
import { fitfusionConfig } from "@/lib/config";

// Access brand information
const brandName = fitfusionConfig.brand.name;
const logoUrl = fitfusionConfig.brand.logo;

// Access contact information
const supportEmail = fitfusionConfig.contact.supportEmail;
const phoneNumber = fitfusionConfig.contact.phone;

// Access return policy
const returnWindow = fitfusionConfig.return.returnWindow;
```

## Benefits

1. **Centralized Management**: All brand information is stored in one place
2. **Easy Updates**: Change contact details, policies, or brand information by updating the config file
3. **Consistency**: Ensures all pages use the same information
4. **Maintainability**: Reduces the need to update multiple files when information changes

## Policy Pages

The following policy pages have been created and use the configuration:

- `/terms` - Terms of Service
- `/privacy` - Privacy Policy  
- `/return-policy` - Return & Refund Policy
- `/contact` - Contact Us

All pages follow the existing design patterns and use the configuration variables for dynamic content.

## Footer Links

The footer has been updated to include links to the policy pages and uses configuration variables for contact information.

## Updating Configuration

To update any information:

1. Open `frontend/lib/config.ts`
2. Modify the relevant section
3. Save the file
4. All pages will automatically use the updated information

## Adding New Configuration

To add new configuration sections:

1. Add the new section to the `fitfusionConfig` object
2. Update this README to document the new section
3. Use the new configuration in your components

## Example: Adding a New Email Address

```typescript
// In config.ts
contact: {
  supportEmail: "support@fitfusion.com",
  salesEmail: "sales@fitfusion.com",
  infoEmail: "info@fitfusion.com",
  // Add new email
  marketingEmail: "marketing@fitfusion.com",
}
```

Then use it in components:

```typescript
const marketingEmail = fitfusionConfig.contact.marketingEmail;
``` 