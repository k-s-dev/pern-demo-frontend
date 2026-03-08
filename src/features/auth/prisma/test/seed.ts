import { auth } from "../../lib/auth";
import { prisma } from "../client";

export async function seedTestDb() {
  await seedUsers();
}

export async function seedUsers() {
  const password = "12345678@Ab";

  try {
    const { user: user01 } = await auth.api.signUpEmail({
      body: {
        email: "test-user-01@example.com",
        name: "test user 01: admin",
        password: password,
      },
    });
    await prisma.user.update({
      where: { id: user01.id },
      data: {
        emailVerified: true,
        role: "ADMIN",
      },
    });

    const { user: user02 } = await auth.api.signUpEmail({
      body: {
        email: "test-user-02@example.com",
        name: "test user 02: user",
        password: password,
      },
    });
    await prisma.user.update({
      where: { id: user02.id },
      data: {
        emailVerified: true,
        role: "USER",
      },
    });

    const { user: user03 } = await auth.api.signUpEmail({
      body: {
        email: "test-user-03@example.com",
        name: "test user 03: user: unverified",
        password: password,
      },
    });
    await prisma.user.update({
      where: { id: user03.id },
      data: {
        emailVerified: false,
        role: "USER",
      },
    });
  } catch (error) {
    console.log(error);
  }
}
