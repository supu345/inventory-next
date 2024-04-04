import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { headers } from "next/headers";

// Category Create
export async function POST(req, res) {
  try {
    let headerList = headers();
    let user_id = parseInt(headerList.get("id"));
    const prisma = new PrismaClient();

    let reqBody = await req.json();
    reqBody.user_id = user_id;

    const result = await prisma.categories.create({
      data: reqBody,
    });

    return NextResponse.json({ status: "success", data: result });
  } catch (e) {
    return NextResponse.json({ status: "fail", data: e });
  }
}

// Category Select
export async function GET(req, res) {
  try {
    let headerList = headers();
    let user_id = parseInt(headerList.get("id"));
    const prisma = new PrismaClient();

    const result = await prisma.categories.findMany({
      where: { user_id: user_id },
    });

    return NextResponse.json({ status: "success", data: result });
  } catch (e) {
    return NextResponse.json({ status: "fail", data: e });
  }
}

//Category Update
export async function PUT(req, res) {
  try {
    let headerList = headers();
    let user_id = parseInt(headerList.get("id"));
    const prisma = new PrismaClient();

    let { searchParams } = new URL(req.url);
    let id = parseInt(searchParams.get("id"));

    let reqBody = await req.json();

    const result = await prisma.categories.update({
      where: { id: id, user_id: user_id },
      data: reqBody,
    });

    return NextResponse.json({ status: "success", data: result });
  } catch (e) {
    return NextResponse.json({ status: "fail", data: e });
  }
}

// Category Delete
export async function DELETE(req, res) {
  try {
    let headerList = headers();
    let user_id = parseInt(headerList.get("id"));
    const prisma = new PrismaClient();

    let { searchParams } = new URL(req.url);
    let id = parseInt(searchParams.get("id"));

    const result = await prisma.categories.delete({
      where: { id: id, user_id: user_id },
    });

    return NextResponse.json({ status: "success", data: result });
  } catch (e) {
    return NextResponse.json({ status: "fail", data: e });
  }
}
