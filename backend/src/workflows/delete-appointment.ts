import { createWorkflow } from "@medusajs/framework/workflows-sdk"
import { deleteAppointmentStep } from "./steps/delete-appointment"

export type DeleteAppointmentInput = {
    id: string
}

export const deleteAppointmentWorkflow = createWorkflow(
    "delete-appointment",
    function (input: DeleteAppointmentInput): any {
        return deleteAppointmentStep(input)
    }
)
