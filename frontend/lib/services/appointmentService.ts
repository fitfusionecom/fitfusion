interface AppointmentData {
  patient_name: string;
  patient_age: number;
  patient_address: string;
  contact_number: string;
  problem: string;
  appointment_date: string;
  appointment_time: string;
  payment_id?: string;
}

interface AvailableSlotsResponse {
  available_slots: string[];
}

interface AppointmentResponse {
  appointment: any;
  message: string;
}

interface ApiError {
  code: string;
  type: string;
  message: string;
}

export class AppointmentService {
  private baseUrl: string;
  private publishableKey: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || '';
    this.publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || '';
  }

  /**
   * Fetch available appointment slots for a specific date
   */
  async getAvailableSlots(date: string): Promise<{ slots: string[]; error?: string }> {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      if (this.publishableKey) {
        headers['x-publishable-api-key'] = this.publishableKey;
      }

      const response = await fetch(`${this.baseUrl}/store/appointments?date=${date}`, {
        method: 'GET',
        headers,
      });

      const data = await response.json();

      if (response.ok) {
        return { slots: data.available_slots || [] };
      } else {
        return {
          slots: [],
          error: data.message || 'Failed to fetch available slots'
        };
      }
    } catch (error) {
      console.error('Error fetching available slots:', error);
      return {
        slots: [],
        error: 'Network error. Please check your connection and try again.'
      };
    }
  }

  /**
   * Book a new appointment
   */
  async bookAppointment(appointmentData: AppointmentData): Promise<{ success: boolean; data?: any; error?: string }> {
    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      if (this.publishableKey) {
        headers['x-publishable-api-key'] = this.publishableKey;
      }

      const response = await fetch(`${this.baseUrl}/store/appointments`, {
        method: 'POST',
        headers,
        body: JSON.stringify(appointmentData),
      });

      const data = await response.json();

      if (response.ok) {
        return {
          success: true,
          data: data
        };
      } else {
        return {
          success: false,
          error: data.message || 'Failed to book appointment'
        };
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
      return {
        success: false,
        error: 'Network error. Please check your connection and try again.'
      };
    }
  }

  /**
   * Validate appointment data before submission
   */
  validateAppointmentData(data: AppointmentData): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!data.patient_name?.trim()) {
      errors.push('Patient name is required');
    }

    if (!data.patient_age || data.patient_age < 1 || data.patient_age > 120) {
      errors.push('Please enter a valid age between 1 and 120');
    }

    if (!data.contact_number?.trim()) {
      errors.push('Contact number is required');
    } else if (!/^[0-9]{10}$/.test(data.contact_number)) {
      errors.push('Please enter a valid 10-digit contact number');
    }

    if (!data.patient_address?.trim()) {
      errors.push('Patient address is required');
    }

    if (!data.problem?.trim()) {
      errors.push('Please select a problem/concern');
    }

    if (!data.appointment_date) {
      errors.push('Appointment date is required');
    }

    if (!data.appointment_time) {
      errors.push('Please select an appointment time slot');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * Format time for display
   */
  formatTime(time: string): string {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  }

  /**
   * Format date for display
   */
  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  /**
   * Check if a date is valid for appointment booking
   */
  isValidAppointmentDate(date: string): { valid: boolean; reason?: string } {
    const appointmentDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if date is in the past
    if (appointmentDate < today) {
      return { valid: false, reason: 'Cannot book appointments for past dates' };
    }

    // Check if date is more than 30 days in the future
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    if (appointmentDate > maxDate) {
      return { valid: false, reason: 'Cannot book appointments more than 30 days in advance' };
    }

    // Check if it's a Monday (doctor's day off)
    if (appointmentDate.getDay() === 1) {
      return { valid: false, reason: 'Doctor is not available on Mondays' };
    }

    return { valid: true };
  }
}

// Export a singleton instance
export const appointmentService = new AppointmentService();
