import { seedTestDb } from "@/features/auth/prisma/test/seed";
import { NextResponse } from "next/server";

export async function GET() {
  if (
    process.env.DATABASE_URL !==
    "postgres://postgres:postgres@localhost:5432/pernDemoTest"
  ) {
    console.log("/api/test/db/seed:get route should be run in test env only.");
    return NextResponse.json("Test db seed failed.");
  }

  await seedTestDb();

  return NextResponse.json("Test db seeded.");
}
