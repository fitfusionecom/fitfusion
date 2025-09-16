"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fitfusionConfig } from "@/lib/fitfusion-config";
import { appointmentService } from "@/lib/services/appointmentService";
import { AppointmentSuccessPopup } from "@/components/ui/AppointmentSuccessPopup";
import "./appointment.css";

interface TimeSlot {
  time: string;
  available: boolean;
}

interface AppointmentFormData {
  patient_name: string;
  patient_age: number;
  patient_address: string;
  contact_number: string;
  problem: string;
  appointment_date: string;
  appointment_time: string;
}

const problemOptions = [
  "Erectile dysfunction (ED)",
  "Premature ejaculation",
  "Low testosterone",
  "Infertility / low sperm count",
  "Testicular problems",
  "Sexually transmitted infections (STIs)",
  "Frequent urination",
  "Urinary tract infections (UTIs)",
  "Diabetes",
  "Metabolic syndrome",
  "Mental & Emotional Health",
  "Stress, anxiety",
  "Depression",
  "Sleep disorders",
  "Substance abuse (alcohol, smoking, drugs)",
  "Poor diet & malnutrition",
  "Digestive issues (acidity, constipation)",
  "General weakness",
  "Fatigue",
  "Low stamina",
  "Muscular weakness",
  "Lack of endurance",
];

export default function AppointmentPage() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState("");
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [bookedAppointment, setBookedAppointment] =
    useState<AppointmentFormData | null>(null);

  const [formData, setFormData] = useState<AppointmentFormData>({
    patient_name: "",
    patient_age: 0,
    patient_address: "",
    contact_number: "",
    problem: "",
    appointment_date: "",
    appointment_time: "",
  });

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  // Get minimum date (today)
  const minDate = today;

  // Get maximum date (30 days from today)
  const maxDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "patient_age" ? parseInt(value) || 0 : value,
    }));
  };

  const handleDateChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setSelectedDate(date);
    setFormData((prev) => ({
      ...prev,
      appointment_date: date,
      appointment_time: "",
    }));

    if (date) {
      await fetchAvailableSlots(date);
    } else {
      setAvailableSlots([]);
    }
  };

  const fetchAvailableSlots = async (date: string) => {
    setLoading(true);
    setError("");

    try {
      const result = await appointmentService.getAvailableSlots(date);

      if (result.error) {
        setError(result.error);
        setAvailableSlots([]);
      } else {
        const slots = result.slots.map((time: string) => ({
          time,
          available: true,
        }));
        setAvailableSlots(slots);
      }
    } catch (err) {
      setError("Failed to fetch available slots. Please try again.");
      setAvailableSlots([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess("");

    // Validate form data
    const validation = appointmentService.validateAppointmentData(formData);
    if (!validation.valid) {
      setError(validation.errors.join(", "));
      setSubmitting(false);
      return;
    }

    try {
      const result = await appointmentService.bookAppointment(formData);

      if (result.success) {
        // Store the booked appointment data for the popup
        setBookedAppointment({ ...formData });
        setShowSuccessPopup(true);
        setSuccess(
          "Appointment booked successfully! You will receive a confirmation shortly."
        );
        // Reset form
        setFormData({
          patient_name: "",
          patient_age: 0,
          patient_address: "",
          contact_number: "",
          problem: "",
          appointment_date: "",
          appointment_time: "",
        });
        setSelectedDate("");
        setAvailableSlots([]);
      } else {
        setError(
          result.error || "Failed to book appointment. Please try again."
        );
      }
    } catch (err) {
      setError("Failed to book appointment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const formatTime = (time: string) => {
    return appointmentService.formatTime(time);
  };

  const handleClosePopup = () => {
    setShowSuccessPopup(false);
    setBookedAppointment(null);
  };

  return (
    <div className="appointment-container py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="appointment-header">
          <h1 className="appointment-title">Book Your Appointment</h1>
          <p className="appointment-subtitle">
            Schedule a consultation with our Ayurvedic expert
          </p>
          <div className="appointment-info-card">
            <p className="appointment-info-text">
              {/* <strong>Consultation Fee:</strong> ₹99 |   */}
              <strong> Available Hours:</strong> 2:00 PM - 6:00 PM |
              <strong> Doctor's Day Off:</strong> Monday
            </p>
          </div>
        </div>

        {/* Success Message */}
        {success && (
          <div className="success-message">
            <p>{success}</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Appointment Form */}
          <div className="lg:col-span-2 appointment-form-card">
            <h2 className="appointment-form-title">Patient Information</h2>

            <form onSubmit={handleSubmit}>
              {/* Personal Information Section */}
              <div className="form-section">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Personal Information
                </h3>

                {/* Patient Name */}
                <div className="form-group">
                  <label htmlFor="patient_name" className="form-label">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="patient_name"
                    name="patient_name"
                    value={formData.patient_name}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Patient Age and Contact Number Row */}
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="patient_age" className="form-label">
                      Age *
                    </label>
                    <input
                      type="number"
                      id="patient_age"
                      name="patient_age"
                      value={formData.patient_age || ""}
                      onChange={handleInputChange}
                      required
                      min="1"
                      max="120"
                      className="form-input"
                      placeholder="Enter your age"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact_number" className="form-label">
                      Contact Number *
                    </label>
                    <input
                      type="tel"
                      id="contact_number"
                      name="contact_number"
                      value={formData.contact_number}
                      onChange={handleInputChange}
                      required
                      pattern="[0-9]{10}"
                      className="form-input"
                      placeholder="Enter 10-digit mobile number"
                    />
                  </div>
                </div>

                {/* Patient Address */}
                <div className="form-group">
                  <label htmlFor="patient_address" className="form-label">
                    Address *
                  </label>
                  <textarea
                    id="patient_address"
                    name="patient_address"
                    value={formData.patient_address}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="form-textarea"
                    placeholder="Enter your complete address"
                  />
                </div>
              </div>

              {/* Medical Information Section */}
              <div className="form-section">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Medical Information
                </h3>

                {/* Problem/Issue */}
                <div className="form-group">
                  <label htmlFor="problem" className="form-label">
                    What brings you here? *
                  </label>
                  <select
                    id="problem"
                    name="problem"
                    value={formData.problem}
                    onChange={handleInputChange}
                    required
                    className="form-select"
                  >
                    <option value="">Select a concern</option>
                    {problemOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Appointment Scheduling Section */}
              <div className="form-section">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Appointment Scheduling
                </h3>

                {/* Appointment Date and Time Row */}
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="appointment_date" className="form-label">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      id="appointment_date"
                      name="appointment_date"
                      value={selectedDate}
                      onChange={handleDateChange}
                      required
                      min={minDate}
                      max={maxDate}
                      className="form-input"
                    />
                  </div>

                  {/* Available Time Slots */}
                  {selectedDate && (
                    <div className="form-group">
                      <label className="form-label">
                        Available Time Slots *
                      </label>
                      {loading ? (
                        <div className="text-center py-6">
                          <div className="loading-spinner"></div>
                          <p className="mt-3 text-sm text-gray-600">
                            Loading available slots...
                          </p>
                        </div>
                      ) : availableSlots.length > 0 ? (
                        <div className="time-slot-grid">
                          {availableSlots.map((slot) => (
                            <button
                              key={slot.time}
                              type="button"
                              onClick={() =>
                                setFormData((prev) => ({
                                  ...prev,
                                  appointment_time: slot.time,
                                }))
                              }
                              className={`time-slot-button ${
                                formData.appointment_time === slot.time
                                  ? "selected"
                                  : ""
                              }`}
                            >
                              {formatTime(slot.time)}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-4">
                          <p className="text-sm text-red-600 font-medium">
                            No available slots for this date. Please select
                            another date.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting || !formData.appointment_time}
                className="submit-button"
              >
                {submitting ? "Booking Appointment..." : "Book Appointment"}
              </button>
            </form>
          </div>

          {/* Appointment Details & Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Appointment Summary */}
            {formData.appointment_time && (
              <div className="appointment-summary-card">
                <h3 className="appointment-summary-title">
                  Appointment Summary
                </h3>
                <div className="space-y-3">
                  <div className="summary-item">
                    <span className="summary-label">Date:</span>
                    <span className="summary-value">
                      {appointmentService.formatDate(formData.appointment_date)}
                    </span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Time:</span>
                    <span className="summary-value">
                      {formatTime(formData.appointment_time)}
                    </span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Consultation Fee:</span>
                    <span
                      className="summary-value"
                      style={{ color: "#10b981" }}
                    >
                      ₹99
                    </span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Duration:</span>
                    <span className="summary-value">15 minutes</span>
                  </div>
                </div>
              </div>
            )}

            <br />
            {/* Important Notes */}
            <div className="important-notes-card">
              <h3 className="important-notes-title">Important Notes</h3>
              <ul className="important-notes-list">
                <li className="important-notes-item">
                  Please arrive 10 minutes before your scheduled appointment
                </li>
                {/* <li className="important-notes-item">
                  Bring a valid ID proof for verification
                </li> */}
                {/* <li className="important-notes-item">
                  Consultation fee of ₹99 is payable at the clinic
                </li> */}
                {/* <li className="important-notes-item">
                  Cancellations must be made at least 2 hours in advance
                </li> */}
                <li className="important-notes-item">
                  Doctor is not available on Mondays
                </li>
                <li className="important-notes-item">
                  Available consultation hours: 2:00 PM - 6:00 PM
                </li>
              </ul>
            </div>
            <br />
          </div>
        </div>
      </div>

      {/* Success Popup */}
      <AppointmentSuccessPopup
        isOpen={showSuccessPopup}
        onClose={handleClosePopup}
        patientName={bookedAppointment?.patient_name}
        appointmentDate={bookedAppointment?.appointment_date}
        appointmentTime={bookedAppointment?.appointment_time}
        contactNumber={bookedAppointment?.contact_number}
      />
    </div>
  );
}
