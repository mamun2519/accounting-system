import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// create a new user account
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const account = await prisma.account.create({
      data: body,
    });
    return NextResponse.json(account, { status: 201 });
  } catch (error) {
    console.error("POST /api/users error:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}

// fetch a user account by ID
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const account = await prisma.account.findUnique({
      where: { id },
    });

    if (!account) {
      return NextResponse.json({ error: "Account not found" }, { status: 404 });
    }

    return NextResponse.json(account, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch account" },
      { status: 500 }
    );
  }
}

// create a all accounts
export async function GET_ALL(req: NextRequest) {
  try {
    const accounts = await prisma.account.findMany();
    return NextResponse.json(accounts, { status: 200 });
  } catch (error) {
    console.error("GET /api/accounts error:", error);
    return NextResponse.json(
      { error: "Failed to fetch accounts" },
      { status: 500 }
    );
  }
}
