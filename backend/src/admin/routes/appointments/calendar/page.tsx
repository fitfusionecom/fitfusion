import { defineRouteConfig } from "@medusajs/admin-sdk";
import { Container, Heading, Button, Text, StatusBadge } from "@medusajs/ui";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  User,
} from "@medusajs/icons";
import { useState, useEffect } from "react";

interface Appointment {
  id: string;
  patient_name: string;
  problem: string;
  appointment_date: string;
  appointment_time: string;
  status: "scheduled" | "completed" | "cancelled" | "rescheduled";
  payment_status: "pending" | "paid" | "refunded";
}

interface CalendarDay {
  date: Date;
  appointments: Appointment[];
  isCurrentMonth: boolean;
  isToday: boolean;
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

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointmentsForMonth();
  }, [currentDate]);

  const fetchAppointmentsForMonth = async () => {
    try {
      setLoading(true);
      const startDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      );
      const endDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      );

      const response = await fetch(
        `/admin/appointments?start_date=${
          startDate.toISOString().split("T")[0]
        }&end_date=${endDate.toISOString().split("T")[0]}`
      );
      const data = await response.json();
      setAppointments(data.appointments || []);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  const getCalendarDays = (): CalendarDay[] => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days: CalendarDay[] = [];
    const today = new Date();

    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);

      const dayAppointments = appointments.filter((apt) => {
        const aptDate = new Date(apt.appointment_date);
        // Compare dates by year, month, and day to avoid timezone issues
        return (
          aptDate.getFullYear() === date.getFullYear() &&
          aptDate.getMonth() === date.getMonth() &&
          aptDate.getDate() === date.getDate()
        );
      });

      days.push({
        date,
        appointments: dayAppointments,
        isCurrentMonth: date.getMonth() === month,
        isToday: date.toDateString() === today.toDateString(),
      });
    }

    return days;
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const isWeekend = (date: Date) => {
    return date.getDay() === 0 || date.getDay() === 6;
  };

  const isMonday = (date: Date) => {
    return date.getDay() === 1;
  };

  const calendarDays = getCalendarDays();
  const monthName = currentDate.toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });

  if (loading) {
    return (
      <Container className="p-6">
        <div className="text-center py-8">
          <Text>Loading calendar...</Text>
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
              Appointment Calendar
            </Heading>
            <Text className="mt-1 text-sm text-gray-600">
              View all appointments in calendar format
            </Text>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="small"
              onClick={() => navigateMonth("prev")}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Text className="text-lg font-semibold min-w-[200px] text-center">
              {monthName}
            </Text>
            <Button
              variant="secondary"
              size="small"
              onClick={() => navigateMonth("next")}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="bg-white border rounded-lg overflow-hidden">
          <div className="grid grid-cols-7 gap-px bg-gray-200">
            {/* Header */}
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="bg-gray-50 p-3 text-center font-semibold text-gray-700"
              >
                <Text className="text-sm font-medium">{day}</Text>
              </div>
            ))}

            {/* Calendar Days */}
            {calendarDays.map((day, index) => (
              <div
                key={index}
                className={`min-h-[120px] bg-white p-2 ${
                  !day.isCurrentMonth ? "text-gray-400" : ""
                } ${day.isToday ? "bg-blue-50 border-2 border-blue-200" : ""}`}
              >
                <div
                  className={`text-sm font-medium mb-1 ${
                    day.isToday ? "text-blue-600" : ""
                  }`}
                >
                  {day.date.getDate()}
                </div>

                {/* Unavailable indicators */}
                {isMonday(day.date) && (
                  <div className="text-xs text-red-500 font-medium mb-1">
                    No Slots
                  </div>
                )}
                {isWeekend(day.date) && !isMonday(day.date) && (
                  <div className="text-xs text-orange-500 font-medium mb-1">
                    Weekend
                  </div>
                )}

                {/* Appointments */}
                <div className="space-y-1">
                  {day.appointments.slice(0, 3).map((appointment) => (
                    <div
                      key={appointment.id}
                      className="text-xs p-2 rounded border-l-2 bg-gray-50"
                    >
                      <div className="flex items-center gap-1 mb-1">
                        <Clock className="h-3 w-3" />
                        <Text className="font-medium text-xs">
                          {formatTime(appointment.appointment_time)}
                        </Text>
                      </div>
                      <div className="flex items-center gap-1 mb-1">
                        <User className="h-3 w-3" />
                        <Text className="truncate text-xs">
                          {appointment.patient_name}
                        </Text>
                      </div>
                      <div className="flex items-center gap-1 mb-1">
                        <Text className="truncate text-xs">
                          {appointment.problem}
                        </Text>
                      </div>
                      <StatusBadge
                        color={getStatusColor(appointment.status)}
                        className="text-xs"
                      >
                        {appointment.status}
                      </StatusBadge>
                    </div>
                  ))}

                  {day.appointments.length > 3 && (
                    <Text className="text-xs text-gray-500 text-center">
                      +{day.appointments.length - 3} more
                    </Text>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="bg-white p-6 border rounded-lg">
          <Heading level="h2" className="text-lg font-medium mb-4">
            Status Legend
          </Heading>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-100 border border-blue-200 rounded"></div>
              <Text className="text-sm">Scheduled</Text>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-100 border border-green-200 rounded"></div>
              <Text className="text-sm">Completed</Text>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-100 border border-red-200 rounded"></div>
              <Text className="text-sm">Cancelled</Text>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-100 border border-yellow-200 rounded"></div>
              <Text className="text-sm">Rescheduled</Text>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <Text className="text-sm">No Slots (Monday)</Text>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded"></div>
              <Text className="text-sm">Weekend</Text>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export const config = defineRouteConfig({
  label: "Calendar",
  icon: Calendar,
});
