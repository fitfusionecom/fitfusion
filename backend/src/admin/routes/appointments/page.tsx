import { defineRouteConfig } from "@medusajs/admin-sdk";
import {
  Container,
  Heading,
  Button,
  Text,
  StatusBadge,
  Input,
  Select,
  Toaster,
} from "@medusajs/ui";
import {
  Calendar,
  Clock,
  User,
  Phone,
  MapPin,
  Eye,
  Trash,
} from "@medusajs/icons";
import { Stethoscope, Filter, Download } from "lucide-react";
import { useState, useEffect } from "react";

interface Appointment {
  id: string;
  patient_name: string;
  patient_age: number;
  patient_address: string;
  contact_number: string;
  problem: string;
  appointment_date: string;
  appointment_time: string;
  status: "scheduled" | "completed" | "cancelled" | "rescheduled";
  payment_status: "pending" | "paid" | "refunded";
  consultation_fee: number;
  doctor_notes?: string;
  cancellation_reason?: string;
  created_at: string;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "scheduled":
      return "blue";
    case "completed":
      return "green";
    case "cancelled":
      return "red";
    case "rescheduled":
      return "orange";
    default:
      return "grey";
  }
};

const getPaymentStatusColor = (status: string) => {
  switch (status) {
    case "paid":
      return "green";
    case "pending":
      return "orange";
    case "refunded":
      return "red";
    default:
      return "grey";
  }
};

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] =
    useState<Appointment | null>(null);
  const [filters, setFilters] = useState({
    status: "all",
    start_date: "",
    end_date: "",
    patient_name: "",
  });

  useEffect(() => {
    fetchAppointments();
  }, [filters]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      if (filters.status && filters.status !== "all")
        queryParams.append("status", filters.status);
      if (filters.start_date)
        queryParams.append("start_date", filters.start_date);
      if (filters.end_date) queryParams.append("end_date", filters.end_date);
      if (filters.patient_name)
        queryParams.append("patient_name", filters.patient_name);

      const response = await fetch(`/admin/appointments?${queryParams}`);
      const data = await response.json();
      setAppointments(data.appointments || []);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateAppointmentStatus = async (
    appointmentId: string,
    status: string,
    notes?: string
  ) => {
    try {
      const response = await fetch("/admin/appointments", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          appointment_id: appointmentId,
          status,
          doctor_notes: notes,
        }),
      });

      if (response.ok) {
        fetchAppointments(); // Refresh the list
      }
    } catch (error) {
      console.error("Error updating appointment status:", error);
    }
  };

  const openAppointmentDetails = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setShowModal(true);
  };

  const deleteAppointment = async (appointmentId: string) => {
    try {
      const response = await fetch("/admin/appointments", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: appointmentId,
        }),
      });

      if (response.ok) {
        fetchAppointments(); // Refresh the list
        setShowDeleteModal(false);
        setAppointmentToDelete(null);
      }
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  const openDeleteModal = (appointment: Appointment) => {
    setAppointmentToDelete(appointment);
    setShowDeleteModal(true);
  };

  const exportAppointments = () => {
    const csvContent = [
      [
        "Patient Name",
        "Age",
        "Contact",
        "Problem",
        "Date",
        "Time",
        "Status",
        "Payment Status",
        "Fee",
      ].join(","),
      ...appointments.map((apt) =>
        [
          apt.patient_name,
          apt.patient_age,
          apt.contact_number,
          apt.problem,
          new Date(apt.appointment_date).toLocaleDateString(),
          apt.appointment_time,
          apt.status,
          apt.payment_status,
          apt.consultation_fee,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `appointments-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  return (
    <Container className="p-6">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <Heading
              level="h1"
              className="text-2xl font-semibold text-gray-900"
            >
              Appointment Management
            </Heading>
            <Text className="mt-1 text-sm text-gray-600">
              Manage patient appointments and consultations
            </Text>
          </div>
          <Button
            variant="secondary"
            size="small"
            onClick={exportAppointments}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 border rounded-lg">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5" />
            <Heading level="h2" className="text-lg font-medium">
              Filters
            </Heading>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Text className="text-sm font-medium mb-2">Status</Text>
              <Select
                value={filters.status}
                onValueChange={(value) =>
                  setFilters({ ...filters, status: value })
                }
              >
                <Select.Trigger>
                  <Select.Value placeholder="All Statuses" />
                </Select.Trigger>
                <Select.Content>
                  <Select.Item value="all">All Statuses</Select.Item>
                  <Select.Item value="scheduled">Scheduled</Select.Item>
                  <Select.Item value="completed">Completed</Select.Item>
                  <Select.Item value="cancelled">Cancelled</Select.Item>
                  <Select.Item value="rescheduled">Rescheduled</Select.Item>
                </Select.Content>
              </Select>
            </div>
            <div>
              <Text className="text-sm font-medium mb-2">Start Date</Text>
              <Input
                type="date"
                value={filters.start_date}
                onChange={(e) =>
                  setFilters({ ...filters, start_date: e.target.value })
                }
              />
            </div>
            <div>
              <Text className="text-sm font-medium mb-2">End Date</Text>
              <Input
                type="date"
                value={filters.end_date}
                onChange={(e) =>
                  setFilters({ ...filters, end_date: e.target.value })
                }
              />
            </div>
            <div>
              <Text className="text-sm font-medium mb-2">Patient Name</Text>
              <Input
                placeholder="Search by name"
                value={filters.patient_name}
                onChange={(e) =>
                  setFilters({ ...filters, patient_name: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        {/* Appointments List */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-8">
              <Text>Loading appointments...</Text>
            </div>
          ) : appointments.length === 0 ? (
            <div className="bg-white p-8 border rounded-lg text-center">
              <Text className="text-gray-500">No appointments found</Text>
            </div>
          ) : (
            appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="bg-white p-4 border rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-500" />
                      <Text className="font-semibold text-lg">
                        {appointment.patient_name}
                      </Text>
                      <Text className="text-gray-500">
                        ({appointment.patient_age} years)
                      </Text>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <Text>{formatDate(appointment.appointment_date)}</Text>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <Text>{formatTime(appointment.appointment_time)}</Text>
                      </div>
                      <div className="flex items-center gap-1">
                        <Stethoscope className="h-4 w-4" />
                        <Text className="max-w-32 truncate">
                          {appointment.problem}
                        </Text>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex gap-2">
                      <StatusBadge color={getStatusColor(appointment.status)}>
                        {appointment.status}
                      </StatusBadge>
                      <StatusBadge
                        color={getPaymentStatusColor(
                          appointment.payment_status
                        )}
                      >
                        {appointment.payment_status}
                      </StatusBadge>
                    </div>

                    <Text className="text-lg font-semibold">
                      ₹{appointment.consultation_fee}
                    </Text>

                    <div className="flex gap-2">
                      <Button
                        size="small"
                        variant="secondary"
                        onClick={() => openAppointmentDetails(appointment)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>

                      {appointment.status === "scheduled" && (
                        <>
                          <Button
                            size="small"
                            onClick={() =>
                              updateAppointmentStatus(
                                appointment.id,
                                "completed"
                              )
                            }
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Complete
                          </Button>
                          <Button
                            size="small"
                            variant="secondary"
                            onClick={() =>
                              updateAppointmentStatus(
                                appointment.id,
                                "cancelled"
                              )
                            }
                          >
                            Cancel
                          </Button>
                        </>
                      )}

                      <Button
                        size="small"
                        variant="secondary"
                        onClick={() => openDeleteModal(appointment)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Appointment Details Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <Heading level="h2">Appointment Details</Heading>
              <Button
                variant="secondary"
                size="small"
                onClick={() => setShowModal(false)}
              >
                ✕
              </Button>
            </div>

            {selectedAppointment && (
              <div className="space-y-6">
                {/* Patient Information */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-gray-500" />
                    <Text className="text-xl font-semibold">
                      {selectedAppointment.patient_name}
                    </Text>
                    <Text className="text-gray-500">
                      ({selectedAppointment.patient_age} years)
                    </Text>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <Text>{selectedAppointment.contact_number}</Text>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <Text>
                        {formatDate(selectedAppointment.appointment_date)}
                      </Text>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <Text>
                        {formatTime(selectedAppointment.appointment_time)}
                      </Text>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Stethoscope className="h-4 w-4 text-gray-500" />
                      <Text>{selectedAppointment.problem}</Text>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-gray-500 mt-1" />
                    <Text>{selectedAppointment.patient_address}</Text>
                  </div>
                </div>

                {/* Status and Payment */}
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    <StatusBadge
                      color={getStatusColor(selectedAppointment.status)}
                    >
                      {selectedAppointment.status}
                    </StatusBadge>
                    <StatusBadge
                      color={getPaymentStatusColor(
                        selectedAppointment.payment_status
                      )}
                    >
                      {selectedAppointment.payment_status}
                    </StatusBadge>
                  </div>
                  <Text className="text-xl font-semibold">
                    ₹{selectedAppointment.consultation_fee}
                  </Text>
                </div>

                {/* Doctor Notes */}
                {selectedAppointment.doctor_notes && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <Text className="text-sm font-medium mb-2">
                      Doctor Notes:
                    </Text>
                    <Text className="text-sm">
                      {selectedAppointment.doctor_notes}
                    </Text>
                  </div>
                )}

                {/* Cancellation Reason */}
                {selectedAppointment.cancellation_reason && (
                  <div className="p-4 bg-red-50 rounded-lg">
                    <Text className="text-sm font-medium mb-2 text-red-700">
                      Cancellation Reason:
                    </Text>
                    <Text className="text-sm text-red-700">
                      {selectedAppointment.cancellation_reason}
                    </Text>
                  </div>
                )}

                {/* Action Buttons */}
                {selectedAppointment.status === "scheduled" && (
                  <div className="flex gap-3 pt-4 border-t">
                    <Button
                      onClick={() => {
                        updateAppointmentStatus(
                          selectedAppointment.id,
                          "completed"
                        );
                        setShowModal(false);
                      }}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Mark Complete
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        updateAppointmentStatus(
                          selectedAppointment.id,
                          "cancelled"
                        );
                        setShowModal(false);
                      }}
                    >
                      Cancel Appointment
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && appointmentToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <Trash className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <Heading
                  level="h2"
                  className="text-lg font-semibold text-gray-900"
                >
                  Delete Appointment
                </Heading>
                <Text className="text-sm text-gray-500">
                  This action cannot be undone.
                </Text>
              </div>
            </div>

            <div className="mb-6">
              <Text className="text-sm text-gray-700">
                Are you sure you want to delete the appointment for{" "}
                <span className="font-semibold">
                  {appointmentToDelete.patient_name}
                </span>{" "}
                scheduled on {formatDate(appointmentToDelete.appointment_date)}{" "}
                at {formatTime(appointmentToDelete.appointment_time)}?
              </Text>
            </div>

            <div className="flex gap-3 justify-end">
              <Button
                variant="secondary"
                onClick={() => {
                  setShowDeleteModal(false);
                  setAppointmentToDelete(null);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => deleteAppointment(appointmentToDelete.id)}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete Appointment
              </Button>
            </div>
          </div>
        </div>
      )}

      <Toaster />
    </Container>
  );
}

export const config = defineRouteConfig({
  label: "Appointments",
  icon: Calendar,
});
