import { resetTestDb } from "@/features/auth/prisma/test/reset";
import { NextResponse } from "next/server";

export async function GET() {
  if (
    process.env.DATABASE_URL !==
    "postgres://postgres:postgres@localhost:5432/pernDemoTest"
  ) {
    console.log("/api/test/db/reset:get route should be run in test env only.");
    return NextResponse.json("Test db reset failed.");
  }

  await resetTestDb();

  return NextResponse.json("Test db reset.");
}
