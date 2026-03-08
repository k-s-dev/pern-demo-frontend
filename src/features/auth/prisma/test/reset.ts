import { prisma } from "../client";

export async function resetTestDb() {
  try {
    await prisma.user.deleteMany({});
  } catch (error) {
    console.error("Database reset failed:", error);
  }
}
