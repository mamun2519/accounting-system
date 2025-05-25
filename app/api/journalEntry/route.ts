import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// post api for journal entries with embedded lines

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const createdEntry = await prisma.journalEntry.create({
      data: {
        date: body.date,
        // demo: body.demo as string,
      },
    });

    if (body.lines && Array.isArray(body.lines)) {
      const linesData = body.lines.map(
        (line: { debit: number; credit: number }) => ({
          debit: line.debit,
          credit: line.credit,
          journalEntryId: createdEntry.id,
          accountId: body.accountId,
        })
      );
      await prisma.journalEntryLine.createMany({
        data: linesData,
      });
    }

    return NextResponse.json(createdEntry, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create journal entry" },
      { status: 500 }
    );
  }
}
