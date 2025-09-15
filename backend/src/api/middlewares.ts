import {
  authenticate,
  defineMiddlewares,
  validateAndTransformBody,
  validateAndTransformQuery,
} from "@medusajs/framework/http";
import { PostStoreReviewSchema } from "./store/reviews/route";
import { GetAdminReviewsSchema } from "./admin/reviews/route";
import { PostAdminUpdateReviewsStatusSchema } from "./admin/reviews/status/route";
import { GetStoreReviewsSchema } from "./store/products/[id]/reviews/route";
import { PostAdminBlogSchema, GetAdminBlogsSchema } from "./admin/blogs/route";
import { PutAdminBlogSchema } from "./admin/blogs/[id]/route";
import { GetAvailableSlotsSchema, CreateAppointmentSchema } from "./store/appointments/route";
import { GetAdminAppointmentsSchema, UpdateAppointmentStatusSchema } from "./admin/appointments/route";

import multer from "multer";

// Configure multer middleware for file uploads
const upload = multer({ storage: multer.memoryStorage() });

export default defineMiddlewares({
  routes: [
    {
      matcher: "/store/slide",
      method: "POST",
    },
    {
      matcher: "/store/slide",
      method: "GET",
    },

    {
      method: ["POST"],
      matcher: "/store/reviews",
      middlewares: [
        authenticate("customer", ["session", "bearer"]),
        // @ts-ignore
        validateAndTransformBody(PostStoreReviewSchema),
      ],
    },
    {
      matcher: "/store/reviews",
      method: ["GET"],
      middlewares: [
        authenticate("customer", ["session", "bearer"]),

      ],
    },
    {
      matcher: "/admin/reviews",
      method: ["GET"],
      middlewares: [
        validateAndTransformQuery(GetAdminReviewsSchema, {
          isList: true,
          defaults: [
            "id",
            "title",
            "content",
            "rating",
            "product_id",
            "customer_id",
            "status",
            "created_at",
            "updated_at",
            "product.*",
          ],
        }),
      ],
    },

    {
      matcher: "/admin/reviews/status",
      method: ["POST"],
      middlewares: [
        // @ts-ignore
        validateAndTransformBody(PostAdminUpdateReviewsStatusSchema),
      ],
    },

    {
      matcher: "/admin/blogs",
      method: ["GET"],
      middlewares: [
        validateAndTransformQuery(GetAdminBlogsSchema, {
          isList: true,
          defaults: [
            "id",
            "title",
            "subtitle",
            "tags",
            "cover_image",
            "content",
            "author_name",
            "status",
            "slug",
            "created_at",
            "updated_at",
          ],
        }),
      ],
    },
    {
      matcher: "/admin/blogs",
      method: ["POST"],
      middlewares: [
        // @ts-ignore
        validateAndTransformBody(PostAdminBlogSchema),
      ],
    },
    {
      matcher: "/admin/blogs/:id",
      method: ["PUT"],
      middlewares: [
        // @ts-ignore
        validateAndTransformBody(PutAdminBlogSchema),
      ],
    },

    {
      matcher: "/admin/products/bulk-upload",
      middlewares: [upload.single("csvFile")],
    },

    {
      matcher: "/store/products/:id/reviews",
      method: ["GET"],
      middlewares: [
        validateAndTransformQuery(GetStoreReviewsSchema, {
          isList: true,
          defaults: [
            "id",
            "rating",
            "title",
            "first_name",
            "last_name",
            "content",
            "created_at",
          ],
        }),
      ],
    },

    // Store Appointments Routes
    {
      matcher: "/store/appointments",
      method: ["GET"],
      middlewares: [
        validateAndTransformQuery(GetAvailableSlotsSchema, {
          isList: false,
        }),
      ],
    },
    {
      matcher: "/store/appointments",
      method: ["POST"],
      middlewares: [
        // @ts-ignore
        validateAndTransformBody(CreateAppointmentSchema),
      ],
    },

    // Admin Appointments Routes
    {
      matcher: "/admin/appointments",
      method: ["GET"],
      middlewares: [
        validateAndTransformQuery(GetAdminAppointmentsSchema, {
          isList: true,
          defaults: [
            "id",
            "patient_name",
            "patient_age",
            "patient_address",
            "contact_number",
            "problem",
            "appointment_date",
            "appointment_time",
            "status",
            "payment_status",
            "consultation_fee",
            "doctor_notes",
            "cancellation_reason",
            "created_at",
            "updated_at",
          ],
        }),
      ],
    },
    {
      matcher: "/admin/appointments",
      method: ["PATCH"],
      middlewares: [
        // @ts-ignore
        validateAndTransformBody(UpdateAppointmentStatusSchema),
      ],
    },

  ],
});
