# Cart Abandonment Admin Interface

A comprehensive admin interface for managing cart abandonment notifications in Fit Fusion Ayurveda.

## Features

### 📊 **Dashboard Overview**

- **Statistics Cards**: Total carts, active carts, and abandoned carts
- **Real-time Data**: Live statistics updated from the database
- **Visual Indicators**: Color-coded status badges for easy identification

### 🔍 **Cart Listing & Filtering**

- **Complete Cart List**: View all carts with detailed information
- **Advanced Filters**: Filter by status, date range, and email
- **Status Categories**:
  - **Active**: Carts that haven't been completed
  - **Abandoned**: Carts with both notifications sent
  - **Completed**: Carts that have been completed
- **Search Functionality**: Find carts by customer email

### 📋 **Cart Details**

- **Customer Information**: Name, email, phone number
- **Cart Contents**: List of items with quantities and prices
- **Notification Status**: Track which notifications have been sent
- **Timestamps**: Creation date, notification send times
- **Error Tracking**: View any notification errors

### 🧪 **Testing Interface**

- **Test Processing Button**: Manually trigger cart abandonment processing
- **Configurable Parameters**:
  - **Batch Size**: Number of carts to process at once (1-100)
  - **First Notification Delay**: Hours before first notification (default: 1 hour for testing)
  - **Second Notification Delay**: Hours before second notification (default: 2 hours for testing)
  - **Notification Channels**: Enable/disable WhatsApp and email notifications
- **Real-time Results**: See processing results immediately

### 📈 **Export Functionality**

- **CSV Export**: Download cart data for analysis
- **Comprehensive Data**: Includes all cart details and notification status
- **Date-stamped Files**: Automatic filename with current date

## Usage

### 1. **View Cart Statistics**

- Navigate to the Cart Abandonment page in the admin panel
- View the statistics cards at the top for quick overview

### 2. **Filter and Search Carts**

- Use the filters section to narrow down cart listings
- Filter by status, date range, or email address
- Results update automatically as you change filters

### 3. **View Cart Details**

- Click the "View Details" option in any cart's dropdown menu
- See complete cart information including:
  - Customer details
  - Cart items and pricing
  - Notification status and timestamps
  - Any error messages

### 4. **Test Cart Abandonment Processing**

- Click the "Test Processing" button
- Configure test parameters in the modal:
  - Set batch size (recommended: 10 for testing)
  - Adjust notification delays (reduced for testing)
  - Enable/disable notification channels
- Click "Run Test" to execute processing
- View results in the alert dialog

### 5. **Export Data**

- Click "Export CSV" to download cart data
- File includes all cart information and notification status
- Useful for analysis and reporting

## Configuration

### **Default Test Settings**

- **Batch Size**: 10 carts (safe for testing)
- **First Notification**: 1 hour delay (reduced from 24 hours)
- **Second Notification**: 2 hours delay (reduced from 48 hours)
- **WhatsApp**: Enabled
- **Email**: Disabled

### **Production Settings**

For production use, update the test configuration to:

- **First Notification**: 24 hours delay
- **Second Notification**: 48 hours delay
- **Batch Size**: 100 carts (or based on system capacity)

## Status Indicators

### **Cart Status Colors**

- 🔵 **Blue**: Active cart (no notifications sent)
- 🟠 **Orange**: First notification sent
- 🔴 **Red**: Abandoned cart (both notifications sent) or error
- 🟢 **Green**: Completed cart

### **Notification Status**

- **Not Sent**: No notification has been sent
- **Sent**: Notification was successfully sent
- **Error**: Notification failed (check error details)

## Troubleshooting

### **Common Issues**

1. **No Carts Showing**

   - Check if carts exist in the database
   - Verify date filters aren't too restrictive
   - Ensure cart service is working properly

2. **Processing Errors**

   - Check WhatsApp service configuration
   - Verify mobile number extraction logic
   - Check network connectivity

3. **Notification Failures**
   - Review error messages in cart details
   - Check WhatsApp template approval
   - Verify mobile number format

### **Debug Information**

- All processing results are logged in the console
- Error details are shown in cart details modal
- Processing statistics are displayed after each test run

## Integration

### **API Endpoints Used**

- `GET /admin/cart-abandonment` - Statistics
- `POST /admin/cart-abandonment/process` - Processing
- `GET /admin/carts` - Cart listing

### **Data Flow**

1. Admin page loads cart statistics and listings
2. User configures test parameters
3. Processing API is called with configuration
4. Results are displayed and data is refreshed
5. Cart metadata is updated with notification status

## Security

- All API calls require admin authentication
- Sensitive data is properly handled
- Error messages don't expose internal details
- Mobile numbers are validated before sending notifications

## Performance

- Carts are loaded in batches for better performance
- Filters are applied server-side to reduce data transfer
- Real-time updates only refresh necessary data
- Export functionality handles large datasets efficiently
