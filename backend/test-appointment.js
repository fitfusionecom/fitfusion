import fetch from "node-fetch";

async function testAppointmentBooking() {
  try {
    // Test booking the same slot twice
    const appointmentData = {
      patient_name: "Jane Smith",
      patient_age: 28,
      patient_address: "456 Park Avenue, Delhi, Delhi 110001",
      contact_number: "9876543211",
      problem: "Digestive Issues",
      appointment_date: "2024-12-15T00:00:00.000Z",
      appointment_time: "14:30",
    };

    console.log("Testing appointment booking for already booked slot...");

    const response = await fetch("http://localhost:9000/store/appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-publishable-api-key":
          "pk_3d79b2a10114952d733d9c374c717a6b5610dc865e81dfde5598822f805dd765",
      },
      body: JSON.stringify(appointmentData),
    });

    const result = await response.text();
    console.log("Status:", response.status);
    console.log("Response:", result);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

testAppointmentBooking();
