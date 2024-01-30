import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { schema } from "../schema";

export async function POST(request: NextRequest) {
  const body = await request.json();

 
  const validation = schema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      { error: "Validation failed", details: validation.error.errors },
      { status: 400 }
    );
  }

  try {
    const newTask = await prisma.task.create({
      data: {
        taskName: body.taskName,
        description: body.description,
        urgency: body.urgency,
        dueDate: body.dueDate,
      },
    });
  
 
    return NextResponse.json(newTask, { status: 201 });
  } catch (error: any) {
    console.error("Error creating task:", error);
  

    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}