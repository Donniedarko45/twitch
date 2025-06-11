import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

// In next-js if something changes it reloads due to Hot reloading due to which prisma client will create on every render but to neglect this in next js there is globalThis which dont reload on this so we are storing prisma client on globalThis

export const db = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
