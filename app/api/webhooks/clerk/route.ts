import { verifyWebhook, WebhookEvent } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import { use } from "react";

export async function POST(req: NextRequest) {
  try {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
    if (!WEBHOOK_SECRET) {
      throw new Error("Please add CLERK_WEBHOOK_SECRET from Clerk dashboard");
    }

    // Get the headers
    const headersList = await headers();
    const svix_id = headersList.get("svix-id");
    const svix_timestamp = headersList.get("svix-timestamp");
    const svix_signature = headersList.get("svix-signature");

    if (!svix_id || !svix_timestamp || !svix_signature) {
      console.error("Missing svix headers:", {
        svix_id,
        svix_timestamp,
        svix_signature,
      });
      return new Response("Missing svix headers", { status: 400 });
    }

    // Verify the webhook first
    const evt: WebhookEvent = await verifyWebhook(req);
    const eventType = evt.type;

    console.log("Received webhook event:", eventType, evt.data);

    if (eventType === "user.created") {
      // Type assertion since we know it's a user event
      const userData = evt.data as {
        id: string;
        username: string | null;
        image_url: string;
      };

      const username = userData.username || userData.id;

      console.log("Creating user in database:", {
        id: userData.id,
        username,
        imageUrl: userData.image_url,
      });

      const user = await db.user.create({
        data: {
          externalUserId: userData.id,
          username,
          imageUrl: userData.image_url,
        },
      });

      console.log("Successfully created user:", user);
    }

    if (eventType === "user.created") {
      const userData = evt.data as {
        id: string;
        username: string;
        image_url: string;
      };

      const currentUser = await db.user.findUnique({
        where: {
          externalUserId: userData.id,
        },
      });
      if (!currentUser) {
        return new Response("User not found", { status: 404 });
      }

      await db.user.update({
        where: {
          externalUserId: userData.id,
        },
        data: {
          username: userData.username,
          imageUrl: userData.image_url,
        },
      });
    }

    if (eventType === "user.deleted") {
      const userData = evt.data as {
        id: string;
      };

      await db.user.delete({
        where: {
          externalUserId: userData.id,
        },
      });
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error processing webhook:", err);
    return new Response(
      `Webhook error: ${err instanceof Error ? err.message : "Unknown error"}`,
      { status: 500 },
    );
  }
}
