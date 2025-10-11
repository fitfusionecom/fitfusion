# Cart Abandonment Notification System

A comprehensive cart abandonment notification system for Fit Fusion Ayurveda built with Medusa v2 framework, featuring cursor-based batch processing for efficient handling of large cart datasets.

## Overview

This system automatically identifies abandoned carts and sends WhatsApp notifications to customers at strategic intervals to encourage cart completion. It uses cursor-based pagination to efficiently process large numbers of carts without memory issues.

## Features

### Core Functionality

- **Automatic Detection**: Identifies abandoned carts based on creation time and activity
- **Two-Stage Notifications**: Sends first notification after 24 hours, second after 48 hours
- **WhatsApp Integration**: Uses existing WhatsApp service for notifications
- **Cursor-Based Processing**: Efficiently processes carts in batches using pagination
- **Metadata Tracking**: Stores notification status in cart metadata to prevent duplicates
- **Error Handling**: Comprehensive error handling with detailed logging

### Scheduling

- **Automated Processing**: Runs every hour via scheduled job
- **Manual Triggering**: Can be triggered manually via API endpoints
- **Configurable Timing**: Customizable notification delays

## Architecture

### Components

1. **CartAbandonmentService** (`cart-abandonment-service.ts`)

   - Core business logic for cart abandonment processing
   - Handles notification status tracking
   - Implements cursor-based batch processing

2. **Scheduled Job** (`cart-abandonment-notifications.ts`)

   - Runs every hour automatically
   - Processes all carts using cursor pagination
   - Provides detailed logging and statistics

3. **Workflow** (`cart-abandonment-processing.ts`)

   - Medusa workflow for cart abandonment processing
   - Can be triggered manually or via API
   - Supports batch processing with cursor

4. **API Routes** (`/admin/cart-abandonment/`)
   - Statistics endpoint for monitoring
   - Manual processing trigger endpoint
   - Configuration options

### Data Flow

```
Cart Created → Wait 24h → First Notification → Wait 48h → Second Notification → Stop
```

## Configuration

### Default Settings

```typescript
{
    batchSize: 100,                    // Carts processed per batch
    firstNotificationDelayHours: 24,   // Hours before first notification
    secondNotificationDelayHours: 48,  // Hours before second notification
    enableWhatsApp: true,              // Enable WhatsApp notifications
    enableEmail: false                 // Enable email notifications (future)
}
```

### Cart Metadata Structure

```typescript
{
    notifications: {
        firstSent: boolean,           // Whether first notification sent
        secondSent: boolean,          // Whether second notification sent
        firstSentAt: string,          // Timestamp of first notification
        secondSentAt: string,         // Timestamp of second notification
        firstError?: string,          // Error from first notification
        secondError?: string          // Error from second notification
    }
}
```

## Usage

### Automatic Processing

The system runs automatically every hour via the scheduled job. No manual intervention required.

### Manual Processing

```bash
# Process all carts
POST /admin/cart-abandonment/process

# Process with custom configuration
POST /admin/cart-abandonment/process
{
    "batchSize": 50,
    "firstNotificationDelayHours": 12,
    "secondNotificationDelayHours": 36,
    "enableWhatsApp": true
}

# Process single batch from cursor
POST /admin/cart-abandonment/process
{
    "cursor": "eyJpZCI6ImNhcnRfMTIzIn0="
}
```

### Statistics

```bash
# Get cart abandonment statistics
GET /admin/cart-abandonment
```

## WhatsApp Templates

The system uses two WhatsApp templates:

1. **cart_abandonment_first**: First notification template
   - Parameters: Customer name, Cart ID, Cart link
2. **cart_abandonment_second**: Second notification template
   - Parameters: Customer name, Cart ID, Cart link

### Template Setup

Ensure these templates are approved in your WhatsApp Business API:

- Template names: `cart_abandonment_first`, `cart_abandonment_second`
- Language: English
- Category: Marketing

## Cursor-Based Processing

### Benefits

- **Memory Efficient**: Processes carts in small batches
- **Scalable**: Handles thousands of carts without issues
- **Resumable**: Can resume processing from any cursor position
- **Non-Blocking**: Doesn't lock the database for extended periods

### How It Works

1. Fetch carts in batches (default: 100 per batch)
2. Process each cart for notification eligibility
3. Send notifications and update metadata
4. Use cursor to fetch next batch
5. Continue until all carts processed

## Monitoring and Logging

### Job Logs

The scheduled job provides detailed logging:

- Total carts processed
- Notifications sent (first/second)
- Error count and details
- Success rates and statistics

### Error Handling

- Individual cart errors don't stop batch processing
- Failed notifications are logged with error details
- Metadata tracks notification status for debugging

## Performance Considerations

### Batch Size

- Default: 100 carts per batch
- Adjust based on system capacity
- Larger batches = faster processing, more memory usage
- Smaller batches = slower processing, less memory usage

### Timing

- Job runs every hour
- 24-hour delay for first notification
- 48-hour delay for second notification
- Configurable delays per business needs

### Database Impact

- Uses cursor pagination to minimize database load
- Small delays between batches prevent overwhelming
- Metadata updates are atomic and efficient

## Future Enhancements

### Planned Features

- Email notification support
- SMS notification support
- A/B testing for notification content
- Customer segmentation for targeted notifications
- Analytics dashboard for conversion tracking
- Dynamic notification timing based on customer behavior

### Integration Points

- Customer analytics for personalization
- Inventory management for stock-based notifications
- Marketing automation for follow-up campaigns
- A/B testing framework for optimization

## Troubleshooting

### Common Issues

1. **No notifications sent**

   - Check WhatsApp service configuration
   - Verify template names are correct
   - Check mobile number extraction logic

2. **Duplicate notifications**

   - Verify metadata tracking is working
   - Check notification status before sending

3. **Performance issues**
   - Reduce batch size
   - Increase delay between batches
   - Monitor database performance

### Debugging

- Check job logs for detailed error information
- Verify cart metadata contains notification status
- Test WhatsApp service independently
- Monitor database query performance

## Security Considerations

- Mobile numbers are extracted securely from cart data
- WhatsApp API credentials are stored securely
- Cart metadata is validated before processing
- Error messages don't expose sensitive information

## Maintenance

### Regular Tasks

- Monitor job execution logs
- Review notification success rates
- Update WhatsApp templates as needed
- Adjust timing based on business metrics

### Updates

- Template content updates
- Timing adjustments
- New notification channels
- Performance optimizations
