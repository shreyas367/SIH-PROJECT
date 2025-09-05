import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Prescription from "@/lib/models/Prescription";
import mongoose from "mongoose";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const body = await req.json();
    const { patientId, doctorId, title, notes, fileUrl } = body;

    if (!patientId || !doctorId || !title) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const prescription = await Prescription.create({
      patientId: new mongoose.Types.ObjectId(patientId),
      doctorId: new mongoose.Types.ObjectId(doctorId),
      title,
      notes,
      fileUrl,
    });

    return NextResponse.json({ prescription }, { status: 201 });
  } catch (error) {
    console.error("Prescription upload error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
