import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { Modules } from "@medusajs/framework/utils";

interface ChangePasswordBody {
  email: string;
  newPassword: string;
}

export async function POST(req: MedusaRequest<ChangePasswordBody>, res: MedusaResponse) {
  const { email, newPassword } = req.body;

  // Validate input
  if (!email || !newPassword) {
    return res.status(400).json({
      message: "Missing required fields: email and newPassword"
    });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: "Invalid email format"
    });
  }

  // Validate password strength
  if (newPassword.length < 8) {
    return res.status(400).json({
      message: "Password must be at least 8 characters long"
    });
  }

  try {
    // Correct way to resolve the Auth Module service
    const authModuleService = req.scope.resolve(Modules.AUTH);

    const { success } = await authModuleService.updateProvider(
      "emailpass",
      {
        entity_id: email,
        password: newPassword,
      }
    );

    if (success) {
      return res.json({
        success: true,
        message: "Password updated successfully",
        email: email
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Password update failed"
      });
    }
  } catch (error) {
    console.error("Error updating password:", error);
    return res.status(500).json({
      success: false,
      message: "Error updating password",
      error: error.message
    });
  }
}
