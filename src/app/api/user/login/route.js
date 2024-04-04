import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { CreateToken } from "../../../utility/JWTTokenHelper";
export async function POST(req, res) {
  try {
    const prisma = new PrismaClient();
    let reqBody = await req.json();

    const result = await prisma.users.findMany({ where: reqBody });
    if (result.length === 0) {
      return NextResponse.json({ status: "fail", data: "No user found" });
    } else {
      let token = await CreateToken(result[0]["email"], result[0]["id"]);
      return NextResponse.json({ status: "success", data: token });
    }

    return NextResponse.json({ status: "success", data: result });
  } catch (e) {
    return NextResponse.json({ status: "fail", data: e });
  }
}
