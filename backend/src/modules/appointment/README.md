# Appointment Scheduling System

A comprehensive appointment scheduling system for Fit Fusion Ayurveda built with Medusa v2 framework.

## Features

### For Patients

- **Book Appointments**: Easy online booking with form validation
- **Slot Selection**: Real-time availability checking with 15-minute slots
- **Payment Integration**: Secure Razorpay payment for ₹99 consultation fee
- **Instant Confirmation**: Email/SMS notifications for booking confirmation
- **Time Restrictions**: 2:00 PM - 6:00 PM, Monday to Friday (no Mondays)

### For Admin/Doctors

- **Appointment Dashboard**: View all appointments with filtering and search
- **Calendar View**: Visual calendar showing all booked slots
- **Status Management**: Mark appointments as scheduled, completed, cancelled, or rescheduled
- **Availability Management**: Set doctor availability and holidays
- **Payment Tracking**: Monitor consultation fees and generate reports
- **Notification System**: Send updates to patients automatically

## Architecture

### Models

- **Appointment**: Core appointment data with patient info and scheduling
- **DoctorAvailability**: Manage doctor availability and working hours
- **Holiday**: Track holidays and recurring unavailable dates

### Services

- **AppointmentModuleService**: Core business logic for appointment management
- **NotificationService**: Handle email/SMS notifications

### Workflows

- **createAppointmentWorkflow**: Book new appointments with validation
- **updateAppointmentStatusWorkflow**: Update appointment status
- **getAvailableSlotsWorkflow**: Get available time slots for a date
- **sendAppointmentNotificationWorkflow**: Send notifications to patients

### API Routes

- **Store Routes**: Public booking and slot checking
- **Admin Routes**: Management interface for appointments
- **Payment Routes**: Razorpay integration for secure payments

## Database Schema

### Appointment Table

```sql
CREATE TABLE "appointment" (
  "id" text PRIMARY KEY,
  "patient_name" text NOT NULL,
  "patient_age" integer NOT NULL,
  "patient_address" text NOT NULL,
  "contact_number" text NOT NULL,
  "problem" text NOT NULL,
  "appointment_date" timestamptz NOT NULL,
  "appointment_time" text NOT NULL,
  "status" text NOT NULL DEFAULT 'scheduled',
  "payment_status" text NOT NULL DEFAULT 'pending',
  "payment_id" text,
  "consultation_fee" integer NOT NULL DEFAULT 99,
  "doctor_notes" text,
  "cancellation_reason" text,
  "rescheduled_from" text
  -- created_at and updated_at are automatically added by Medusa
);
```

### Doctor Availability Table

```sql
CREATE TABLE "doctor_availability" (
  "id" text PRIMARY KEY,
  "date" timestamptz NOT NULL,
  "is_available" boolean NOT NULL DEFAULT true,
  "unavailable_reason" text,
  "start_time" text,
  "end_time" text,
  "max_slots" integer NOT NULL DEFAULT 10,
  "slot_duration" integer NOT NULL DEFAULT 15
  -- created_at and updated_at are automatically added by Medusa
);
```

### Holiday Table

```sql
CREATE TABLE "holiday" (
  "id" text PRIMARY KEY,
  "name" text NOT NULL,
  "date" timestamptz NOT NULL,
  "is_recurring" boolean NOT NULL DEFAULT false,
  "description" text
  -- created_at and updated_at are automatically added by Medusa
);
```

## API Endpoints

### Store Endpoints

- `GET /store/appointments` - Get available slots for a date
- `POST /store/appointments` - Book a new appointment
- `POST /store/appointments/payment` - Create Razorpay payment order
- `POST /store/appointments/payment/verify` - Verify payment and confirm appointment

### Admin Endpoints

- `GET /admin/appointments` - List appointments with filters
- `PATCH /admin/appointments` - Update appointment status
- `GET /admin/appointments/stats` - Get appointment statistics
- `PATCH /admin/appointments/availability` - Update doctor availability
- `POST /admin/appointments/availability` - Create holiday

## Usage Examples

### Book an Appointment

```typescript
const response = await fetch("/store/appointments", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    patient_name: "John Doe",
    patient_age: 30,
    patient_address: "123 Main St, City",
    contact_number: "+919876543210",
    problem: "Digestive Issues",
    appointment_date: "2024-12-15T00:00:00.000Z",
    appointment_time: "14:30",
    payment_id: "pay_123456789",
  }),
});
```

### Get Available Slots

```typescript
const response = await fetch("/store/appointments?date=2024-12-15");
const data = await response.json();
console.log(data.available_slots); // ['14:00', '14:15', '14:30', ...]
```

### Update Appointment Status

```typescript
const response = await fetch("/admin/appointments", {
  method: "PATCH",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    appointment_id: "apt_123",
    status: "completed",
    doctor_notes: "Patient responded well to treatment",
  }),
});
```

## Configuration

### Environment Variables

```env
# Razorpay Configuration
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
RAZORPAY_WEBHOOK_SECRET=your_webhook_secret

# SMS Configuration (optional)
SMS_API_KEY=your_sms_api_key

# Email Configuration (optional)
SENDGRID_API_KEY=your_sendgrid_api_key
```

### Medusa Configuration

Add the appointment module to your `medusa-config.ts`:

```typescript
modules: [
  // ... other modules
  {
    resolve: "./src/modules/appointment",
  },
];
```

## Business Rules

1. **Slot Duration**: Each appointment is 15 minutes long
2. **Working Hours**: 2:00 PM - 6:00 PM (14:00 - 18:00)
3. **No Mondays**: Appointments are not available on Mondays
4. **Maximum Slots**: 10 slots per day maximum
5. **Payment Required**: ₹99 consultation fee must be paid to confirm
6. **Holiday Blocking**: System automatically blocks slots on holidays
7. **No Double Booking**: Slots are locked once booked

## Admin Interface

### Appointment Dashboard

- List view with filtering by status, date range, patient name
- Status management with one-click updates
- Export functionality for reports
- Real-time updates

### Calendar View

- Visual calendar showing all appointments
- Color-coded status indicators
- Available/unavailable slot visualization
- Month navigation

### Availability Management

- Set doctor availability for specific dates
- Create and manage holidays
- Quick actions for common scenarios
- Recurring holiday support

## Notification System

### Types of Notifications

1. **Booking Confirmation**: Sent immediately after successful payment
2. **Status Updates**: Sent when appointment status changes
3. **Reminders**: Sent 24 hours before appointment
4. **Cancellation**: Sent when appointment is cancelled

### Notification Channels

- SMS (via TextLocal, Twilio, etc.)
- Email (via SendGrid, AWS SES, etc.)
- WhatsApp (via WhatsApp Business API)

## Security Features

- Payment signature verification
- Input validation and sanitization
- Rate limiting on API endpoints
- Secure payment processing via Razorpay
- No storage of sensitive payment data

## Scalability

- Modular architecture for easy extension
- Database indexing for performance
- Caching for frequently accessed data
- Queue system for notifications
- Horizontal scaling support

## Future Enhancements

- Multi-doctor support
- Video consultation integration
- Prescription management
- Patient history tracking
- Advanced reporting and analytics
- Mobile app integration
- Automated follow-up reminders
