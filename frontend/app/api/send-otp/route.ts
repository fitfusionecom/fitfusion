import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

// WhatsApp configuration (same as backend)
const WHATSAPP_CONFIG = {
  apiKey: "5b3acc6fcb52468091f9792a1543d444",
  apiUrl: "https://waba2waba.com/api/v1/sendTemplateMessage",
  languageCode: "en",
  headerImageUrl: "https://www.xyz.com//Files/b4063f333fdec6.jpeg"
};

// Simple encryption/decryption functions
function decryptOTP(encryptedOtp: string): string {
  try {
    // Decode base64 and remove salt
    const decoded = Buffer.from(encryptedOtp, 'base64').toString('utf8');
    const salt = 'fitfusion-otp-salt-2024';

    if (decoded.startsWith(salt)) {
      return decoded.substring(salt.length);
    } else {
      throw new Error('Invalid OTP format');
    }
  } catch (error) {
    throw new Error('Invalid OTP format');
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email, mobileNumber, otp } = await request.json();

    // Validate input
    if (!email || !mobileNumber || !otp) {
      return NextResponse.json({
        success: false,
        message: "Email, mobile number, and OTP are required"
      }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({
        success: false,
        message: "Invalid email format"
      }, { status: 400 });
    }

    // Validate mobile number format (10 digits)
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(mobileNumber)) {
      return NextResponse.json({
        success: false,
        message: "Invalid mobile number format. Please enter a 10-digit number."
      }, { status: 400 });
    }

    // Decrypt the OTP before sending
    let decryptedOtp;
    try {
      decryptedOtp = decryptOTP(otp);
    } catch (error) {
      return NextResponse.json({
        success: false,
        message: "Invalid OTP format"
      }, { status: 400 });
    }

    // Validate decrypted OTP format (6 digits)
    if (!/^\d{6}$/.test(decryptedOtp)) {
      return NextResponse.json({
        success: false,
        message: "Invalid OTP format"
      }, { status: 400 });
    }

    // Format mobile number with country code for WhatsApp
    const formattedMobileNumber = mobileNumber.startsWith('+91') ? mobileNumber : `+91${mobileNumber}`;

    // Send OTP via WhatsApp directly (matching template structure)
    const whatsappBody = {
      key: WHATSAPP_CONFIG.apiKey,
      to: formattedMobileNumber,
      languageCode: "en_GB",
      TemplateName: "reset_otp_fitfusion",
      headertype: "none",
      link: "",
      filename: "",
      headertext: "",
      BodyParameter: [
        {
          type: "text",
          text: decryptedOtp // Maps to {{1}} in template body
        }
      ],
      FooterParameter: [],
      ButtonParameter: [
        {
          type: "url",
          text: "Copy code",
          url: `https://www.whatsapp.com/otp/code/?otp_type=COPY_CODE&code_expiration_minutes=10&code=otp${decryptedOtp}`
        }
      ]
    };

    // Log the request for debugging
    console.log("WhatsApp API Request:", whatsappBody);

    const whatsappResponse = await axios.post(
      WHATSAPP_CONFIG.apiUrl,
      whatsappBody,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const whatsappResult = whatsappResponse.data;

    // Log the response for debugging
    console.log("WhatsApp API Response:", whatsappResult);
    console.log("Formatted Mobile Number:", formattedMobileNumber);
    console.log("Decrypted OTP:", decryptedOtp);

    if (whatsappResult.ErrorCode === "000") {
      return NextResponse.json({
        success: true,
        message: "OTP sent successfully to your WhatsApp",
        mobileNumber: mobileNumber.replace(/(\d{2})(\d{4})(\d{4})/, "$1****$3"), // Masked number
        debug: {
          formattedMobileNumber,
          templateName: "reset_otp_fitfusion",
          languageCode: WHATSAPP_CONFIG.languageCode
        }
      });
    } else {
      console.error("WhatsApp API Error:", whatsappResult);
      return NextResponse.json({
        success: false,
        message: "Failed to send OTP via WhatsApp",
        error: whatsappResult.ErrorMessage || "Unknown WhatsApp API error",
        response: whatsappResult, // Include full response for debugging
        debug: {
          formattedMobileNumber,
          templateName: "reset_otp_fitfusion",
          languageCode: WHATSAPP_CONFIG.languageCode
        }
      }, { status: 400 });
    }

  } catch (error) {
    console.error("Error sending OTP:", error);
    return NextResponse.json({
      success: false,
      message: "Error sending OTP",
      error: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
