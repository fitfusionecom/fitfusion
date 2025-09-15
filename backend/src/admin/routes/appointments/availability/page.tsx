import { defineRouteConfig } from "@medusajs/admin-sdk";
import {
  Container,
  Heading,
  Button,
  Text,
  Input,
  Textarea,
  StatusBadge,
  toast,
  Toaster,
} from "@medusajs/ui";
import { Calendar, Plus, X, CheckCircle } from "@medusajs/icons";
import { useState, useEffect } from "react";

interface Holiday {
  id: string;
  name: string;
  date: string;
  is_recurring: boolean;
  description?: string;
}

interface DoctorAvailability {
  id: string;
  date: string;
  is_available: boolean;
  unavailable_reason?: string;
  unavailable_type?: "full_day" | "partial_day" | "specific_hours";
  start_time?: string;
  end_time?: string;
  max_slots: number;
  slot_duration: number;
  notes?: string;
}

export default function AvailabilityPage() {
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [availabilities, setAvailabilities] = useState<DoctorAvailability[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [showHolidayForm, setShowHolidayForm] = useState(false);
  const [showAvailabilityForm, setShowAvailabilityForm] = useState(false);
  const [showUnavailabilityForm, setShowUnavailabilityForm] = useState(false);
  const [showDeleteHolidayModal, setShowDeleteHolidayModal] = useState(false);
  const [holidayToDelete, setHolidayToDelete] = useState<Holiday | null>(null);

  // Holiday form state
  const [holidayForm, setHolidayForm] = useState({
    name: "",
    date: "",
    is_recurring: false,
    description: "",
  });

  // Availability form state
  const [availabilityForm, setAvailabilityForm] = useState({
    date: "",
    is_available: true,
    unavailable_reason: "",
    start_time: "14:00",
    end_time: "18:00",
    max_slots: 10,
    slot_duration: 15,
  });

  // Unavailability form state
  const [unavailabilityForm, setUnavailabilityForm] = useState({
    date: "",
    unavailable_reason: "",
    unavailable_type: "full_day" as
      | "full_day"
      | "partial_day"
      | "specific_hours",
    start_time: "",
    end_time: "",
    notes: "",
  });

  useEffect(() => {
    fetchHolidays();
    fetchAvailabilities();
  }, []);

  const fetchHolidays = async () => {
    try {
      const response = await fetch("/admin/appointments/holidays");
      const data = await response.json();
      setHolidays(data.holidays || []);
    } catch (error) {
      console.error("Error fetching holidays:", error);
    }
  };

  const fetchAvailabilities = async () => {
    try {
      const response = await fetch("/admin/appointments/availability");
      const data = await response.json();
      setAvailabilities(data.availabilities || []);
    } catch (error) {
      console.error("Error fetching availabilities:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateHoliday = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/admin/appointments/holidays", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(holidayForm),
      });

      if (response.ok) {
        setMessage("Holiday created successfully");
        setHolidayForm({
          name: "",
          date: "",
          is_recurring: false,
          description: "",
        });
        setShowHolidayForm(false);
        fetchHolidays();
        toast.success("Holiday created successfully");
      } else {
        const error = await response.json();
        setMessage(error.message || "Failed to create holiday");
        toast.error("Failed to create holiday");
      }
    } catch (error) {
      setMessage("Error creating holiday");
      toast.error("Error creating holiday");
    }
  };

  const handleCreateAvailability = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/admin/appointments/availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(availabilityForm),
      });

      if (response.ok) {
        setMessage("Availability updated successfully");
        setAvailabilityForm({
          date: "",
          is_available: true,
          unavailable_reason: "",
          start_time: "14:00",
          end_time: "18:00",
          max_slots: 10,
          slot_duration: 15,
        });
        setShowAvailabilityForm(false);
        fetchAvailabilities();
        toast.success("Availability updated successfully");
      } else {
        const error = await response.json();
        setMessage(error.message || "Failed to update availability");
        toast.error("Failed to update availability");
      }
    } catch (error) {
      setMessage("Error updating availability");
      toast.error("Error updating availability");
    }
  };

  const handleDeleteHoliday = async (id: string) => {
    try {
      const response = await fetch("/admin/appointments/holidays", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        setMessage("Holiday deleted successfully");
        fetchHolidays();
        toast.success("Holiday deleted successfully");
        setShowDeleteHolidayModal(false);
        setHolidayToDelete(null);
      } else {
        setMessage("Failed to delete holiday");
        toast.error("Failed to delete holiday");
      }
    } catch (error) {
      setMessage("Error deleting holiday");
      toast.error("Error deleting holiday");
    }
  };

  const openDeleteHolidayModal = (holiday: Holiday) => {
    setHolidayToDelete(holiday);
    setShowDeleteHolidayModal(true);
  };

  const handleUnavailabilitySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/admin/appointments/availability", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(unavailabilityForm),
      });

      if (response.ok) {
        setMessage("Doctor marked as unavailable successfully!");
        setShowUnavailabilityForm(false);
        setUnavailabilityForm({
          date: "",
          unavailable_reason: "",
          unavailable_type: "full_day",
          start_time: "",
          end_time: "",
          notes: "",
        });
        fetchAvailabilities();
        toast.success("Doctor marked as unavailable successfully!");
      } else {
        const error = await response.json();
        setMessage(error.message || "Failed to mark doctor as unavailable");
        toast.error("Failed to mark doctor as unavailable");
      }
    } catch (error) {
      setMessage("Error marking doctor as unavailable");
      toast.error("Error marking doctor as unavailable");
    }
  };

  const handleSetAvailable = async (date: string) => {
    try {
      const response = await fetch("/admin/appointments/availability", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date }),
      });

      if (response.ok) {
        setMessage("Doctor marked as available successfully!");
        fetchAvailabilities();
        toast.success("Doctor marked as available successfully!");
      } else {
        const error = await response.json();
        setMessage(error.message || "Failed to mark doctor as available");
        toast.error("Failed to mark doctor as available");
      }
    } catch (error) {
      setMessage("Error marking doctor as available");
      toast.error("Error marking doctor as available");
    }
  };

  const handleToggleAvailability = async (id: string, isAvailable: boolean) => {
    try {
      const response = await fetch(`/admin/appointments/availability/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_available: isAvailable }),
      });

      if (response.ok) {
        setMessage("Availability updated successfully");
        fetchAvailabilities();
        toast.success("Availability updated successfully");
      } else {
        setMessage("Failed to update availability");
        toast.error("Failed to update availability");
      }
    } catch (error) {
      setMessage("Error updating availability");
      toast.error("Error updating availability");
    }
  };

  if (loading) {
    return (
      <Container className="p-6">
        <div className="text-center py-8">
          <Text>Loading availability data...</Text>
        </div>
      </Container>
    );
  }

  return (
    <Container className="p-6">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <Heading
              level="h1"
              className="text-2xl font-semibold text-gray-900"
            >
              Doctor Availability Management
            </Heading>
            <Text className="mt-1 text-sm text-gray-600">
              Manage doctor availability and holidays
            </Text>
          </div>
        </div>

        {message && (
          <div
            className={`p-4 rounded-md ${
              message.includes("successfully")
                ? "bg-green-100 text-green-700 border border-green-200"
                : "bg-red-100 text-red-700 border border-red-200"
            }`}
          >
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Holiday Management */}
          <div className="bg-white p-6 border rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <Heading
                level="h2"
                className="text-lg font-medium flex items-center gap-2"
              >
                <Calendar className="h-5 w-5" />
                Holiday Management
              </Heading>
              <Button
                variant="primary"
                size="small"
                onClick={() => setShowHolidayForm(!showHolidayForm)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Holiday
              </Button>
            </div>

            {showHolidayForm && (
              <form
                onSubmit={handleCreateHoliday}
                className="space-y-4 mb-6 p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <Text className="text-sm font-medium mb-1">
                    Holiday Name *
                  </Text>
                  <Input
                    value={holidayForm.name}
                    onChange={(e) =>
                      setHolidayForm({ ...holidayForm, name: e.target.value })
                    }
                    placeholder="e.g., Diwali, Christmas"
                    required
                  />
                </div>
                <div>
                  <Text className="text-sm font-medium mb-1">Date *</Text>
                  <Input
                    type="date"
                    value={holidayForm.date}
                    onChange={(e) =>
                      setHolidayForm({ ...holidayForm, date: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Text className="text-sm font-medium mb-1">Description</Text>
                  <Textarea
                    value={holidayForm.description}
                    onChange={(e) =>
                      setHolidayForm({
                        ...holidayForm,
                        description: e.target.value,
                      })
                    }
                    placeholder="Optional description"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="recurring"
                    checked={holidayForm.is_recurring}
                    onChange={(e) =>
                      setHolidayForm({
                        ...holidayForm,
                        is_recurring: e.target.checked,
                      })
                    }
                    className="rounded"
                  />
                  <Text className="text-sm">Recurring annually</Text>
                </div>
                <div className="flex gap-2">
                  <Button type="submit" size="small">
                    Create Holiday
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    size="small"
                    onClick={() => setShowHolidayForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            )}

            <div className="space-y-2">
              {holidays.length === 0 ? (
                <Text className="text-gray-500">No holidays configured</Text>
              ) : (
                holidays.map((holiday) => (
                  <div
                    key={holiday.id}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <Text className="font-medium">{holiday.name}</Text>
                      <Text className="text-sm text-gray-600">
                        {new Date(holiday.date).toLocaleDateString()}
                        {holiday.is_recurring && " (Annual)"}
                      </Text>
                    </div>
                    <Button
                      variant="secondary"
                      size="small"
                      onClick={() => openDeleteHolidayModal(holiday)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Doctor Unavailability Management */}
          <div className="bg-white p-6 border rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <Heading
                level="h2"
                className="text-lg font-medium flex items-center gap-2"
              >
                <X className="h-5 w-5" />
                Doctor Unavailability
              </Heading>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  size="small"
                  onClick={() =>
                    setShowUnavailabilityForm(!showUnavailabilityForm)
                  }
                >
                  <X className="h-4 w-4 mr-2" />
                  Mark Unavailable
                </Button>
                <Button
                  variant="primary"
                  size="small"
                  onClick={() => setShowAvailabilityForm(!showAvailabilityForm)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Set Custom Hours
                </Button>
              </div>
            </div>

            {showAvailabilityForm && (
              <form
                onSubmit={handleCreateAvailability}
                className="space-y-4 mb-6 p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <Text className="text-sm font-medium mb-1">Date *</Text>
                  <Input
                    type="date"
                    value={availabilityForm.date}
                    onChange={(e) =>
                      setAvailabilityForm({
                        ...availabilityForm,
                        date: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="available"
                    checked={availabilityForm.is_available}
                    onChange={(e) =>
                      setAvailabilityForm({
                        ...availabilityForm,
                        is_available: e.target.checked,
                      })
                    }
                    className="rounded"
                  />
                  <Text className="text-sm">Available on this date</Text>
                </div>
                {!availabilityForm.is_available && (
                  <div>
                    <Text className="text-sm font-medium mb-1">
                      Reason for unavailability
                    </Text>
                    <Input
                      value={availabilityForm.unavailable_reason}
                      onChange={(e) =>
                        setAvailabilityForm({
                          ...availabilityForm,
                          unavailable_reason: e.target.value,
                        })
                      }
                      placeholder="e.g., Personal leave, Emergency"
                    />
                  </div>
                )}
                {availabilityForm.is_available && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Text className="text-sm font-medium mb-1">
                          Start Time
                        </Text>
                        <Input
                          type="time"
                          value={availabilityForm.start_time}
                          onChange={(e) =>
                            setAvailabilityForm({
                              ...availabilityForm,
                              start_time: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <Text className="text-sm font-medium mb-1">
                          End Time
                        </Text>
                        <Input
                          type="time"
                          value={availabilityForm.end_time}
                          onChange={(e) =>
                            setAvailabilityForm({
                              ...availabilityForm,
                              end_time: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Text className="text-sm font-medium mb-1">
                          Max Slots
                        </Text>
                        <Input
                          type="number"
                          value={availabilityForm.max_slots}
                          onChange={(e) =>
                            setAvailabilityForm({
                              ...availabilityForm,
                              max_slots: parseInt(e.target.value),
                            })
                          }
                          min="1"
                          max="20"
                        />
                      </div>
                      <div>
                        <Text className="text-sm font-medium mb-1">
                          Slot Duration (minutes)
                        </Text>
                        <Input
                          type="number"
                          value={availabilityForm.slot_duration}
                          onChange={(e) =>
                            setAvailabilityForm({
                              ...availabilityForm,
                              slot_duration: parseInt(e.target.value),
                            })
                          }
                          min="15"
                          max="60"
                        />
                      </div>
                    </div>
                  </>
                )}
                <div className="flex gap-2">
                  <Button type="submit" size="small">
                    Update Availability
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    size="small"
                    onClick={() => setShowAvailabilityForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            )}

            {showUnavailabilityForm && (
              <form
                onSubmit={handleUnavailabilitySubmit}
                className="space-y-4 mb-6 p-4 bg-red-50 rounded-lg border border-red-200"
              >
                <div>
                  <Text className="text-sm font-medium mb-1">Date *</Text>
                  <Input
                    type="date"
                    value={unavailabilityForm.date}
                    onChange={(e) =>
                      setUnavailabilityForm({
                        ...unavailabilityForm,
                        date: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <div>
                  <Text className="text-sm font-medium mb-1">
                    Reason for Unavailability *
                  </Text>
                  <Input
                    value={unavailabilityForm.unavailable_reason}
                    onChange={(e) =>
                      setUnavailabilityForm({
                        ...unavailabilityForm,
                        unavailable_reason: e.target.value,
                      })
                    }
                    placeholder="e.g., Personal leave, Emergency, Conference"
                    required
                  />
                </div>
                <div>
                  <Text className="text-sm font-medium mb-1">
                    Unavailability Type *
                  </Text>
                  <select
                    value={unavailabilityForm.unavailable_type}
                    onChange={(e) =>
                      setUnavailabilityForm({
                        ...unavailabilityForm,
                        unavailable_type: e.target.value as
                          | "full_day"
                          | "partial_day"
                          | "specific_hours",
                      })
                    }
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="full_day">Full Day</option>
                    <option value="partial_day">Partial Day</option>
                    <option value="specific_hours">Specific Hours</option>
                  </select>
                </div>
                {(unavailabilityForm.unavailable_type === "partial_day" ||
                  unavailabilityForm.unavailable_type === "specific_hours") && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Text className="text-sm font-medium mb-1">
                        Start Time
                      </Text>
                      <Input
                        type="time"
                        value={unavailabilityForm.start_time}
                        onChange={(e) =>
                          setUnavailabilityForm({
                            ...unavailabilityForm,
                            start_time: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Text className="text-sm font-medium mb-1">End Time</Text>
                      <Input
                        type="time"
                        value={unavailabilityForm.end_time}
                        onChange={(e) =>
                          setUnavailabilityForm({
                            ...unavailabilityForm,
                            end_time: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>
                )}
                <div>
                  <Text className="text-sm font-medium mb-1">
                    Notes (Optional)
                  </Text>
                  <Textarea
                    value={unavailabilityForm.notes}
                    onChange={(e) =>
                      setUnavailabilityForm({
                        ...unavailabilityForm,
                        notes: e.target.value,
                      })
                    }
                    placeholder="Additional details about the unavailability"
                    rows={3}
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit" size="small" variant="secondary">
                    Mark Unavailable
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    size="small"
                    onClick={() => setShowUnavailabilityForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            )}

            <div className="space-y-2">
              {availabilities.length === 0 ? (
                <Text className="text-gray-500">
                  Doctor is available by default. Only unavailability records
                  are shown here.
                </Text>
              ) : (
                availabilities
                  .filter((availability) => !availability.is_available) // Only show unavailability records
                  .map((availability) => (
                    <div
                      key={availability.id}
                      className="flex justify-between items-center p-3 bg-red-50 rounded-lg border border-red-200"
                    >
                      <div>
                        <Text className="font-medium">
                          {new Date(availability.date).toLocaleDateString()}
                        </Text>
                        <div className="flex items-center gap-2 mt-1">
                          <StatusBadge color="red">Unavailable</StatusBadge>
                          {availability.unavailable_reason && (
                            <Text className="text-sm text-gray-600">
                              {availability.unavailable_reason}
                            </Text>
                          )}
                          {availability.unavailable_type && (
                            <Text className="text-sm text-gray-500">
                              ({availability.unavailable_type.replace("_", " ")}
                              )
                            </Text>
                          )}
                        </div>
                        {availability.start_time && availability.end_time && (
                          <Text className="text-sm text-gray-600 mt-1">
                            {availability.start_time} - {availability.end_time}
                          </Text>
                        )}
                        {availability.notes && (
                          <Text className="text-sm text-gray-500 mt-1">
                            {availability.notes}
                          </Text>
                        )}
                      </div>
                      <Button
                        variant="secondary"
                        size="small"
                        onClick={() => handleSetAvailable(availability.date)}
                      >
                        Mark Available
                      </Button>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Delete Holiday Confirmation Modal */}
      {showDeleteHolidayModal && holidayToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <X className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <Heading
                  level="h2"
                  className="text-lg font-semibold text-gray-900"
                >
                  Delete Holiday
                </Heading>
                <Text className="text-sm text-gray-500">
                  This action cannot be undone.
                </Text>
              </div>
            </div>

            <div className="mb-6">
              <Text className="text-sm text-gray-700">
                Are you sure you want to delete the holiday{" "}
                <span className="font-semibold">{holidayToDelete.name}</span>{" "}
                scheduled for{" "}
                {new Date(holidayToDelete.date).toLocaleDateString()}?
              </Text>
            </div>

            <div className="flex gap-3 justify-end">
              <Button
                variant="secondary"
                onClick={() => {
                  setShowDeleteHolidayModal(false);
                  setHolidayToDelete(null);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => handleDeleteHoliday(holidayToDelete.id)}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete Holiday
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
  label: "Availability",
  icon: Calendar,
});
