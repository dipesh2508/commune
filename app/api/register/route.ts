import bcyrpt from "bcrypt";

import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    if (!email || !name || !password) {
      return new NextResponse("Missing parameter", { status: 400 });
    }

    const hashedPassword = await bcyrpt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });

    return NextResponse.json(user);
  } catch (err: any) {
    console.error(err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
