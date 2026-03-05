import { PrismaPg } from "@prisma/adapter-pg";
import { appConfig } from "@/lib/config";
import { PrismaClient } from "./generated/client";

const adapter = new PrismaPg({ connectionString: appConfig.auth.db.url });

// Extend the global object type to include prisma
const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

// Use the existing global instance or create a new one
export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

// In development, attach the instance to the global object
if (appConfig.nodeEnv !== "production") {
  globalForPrisma.prisma = prisma;
}
