// import { prisma } from "@/app/lib/prisma";
// import { PrismaClient } from "@prisma/client";
import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// const prisma = new PrismaClient();
// create a new user account
export async function POST(req: Request) {
  try {
    //* receive the request body
    const body = await req.json();

    const account = await prisma.account.create({
      data: body,
    });

    return NextResponse.json(account, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create user. Please try again" },
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
      // return NextResponse.json({ error: "Id is required" }, { status: 400 });
      const accounts = await prisma.account.findMany();
      return NextResponse.json(accounts, { status: 200 });
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
export async function GET_ALL() {
  try {
    const accounts = await prisma.account.findMany();
    return NextResponse.json(accounts, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch accounts" },
      { status: 500 }
    );
  }
}

//delete a user account by ID
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const account = await prisma.account.delete({
      where: { id },
    });

    return NextResponse.json(account, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete account" },
      { status: 500 }
    );
  }
}

// update a user account by ID
export async function PUT(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const body = await req.json();

    const account = await prisma.account.update({
      where: { id },
      data: body,
    });

    return NextResponse.json(account, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update account" },
      { status: 500 }
    );
  }
}
