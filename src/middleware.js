import { NextResponse } from "next/server";
import { VerifyToken } from "../src/app/utility/JWTTokenHelper";

export async function middleware(req, res) {
  try {
    // Token Get
    const requestHeader = new Headers(req.headers);
    const token = requestHeader.get("token");

    let payload = await VerifyToken(token);

    requestHeader.set("email", payload["email"]);
    requestHeader.set("id", payload["id"]);

    return NextResponse.next({
      request: { headers: requestHeader },
    });
  } catch (e) {
    return NextResponse.json(
      { status: "fail", data: "Unauthorized" },
      { status: 401 }
    );
  }
}

export const config = {
  matcher: ["/api/dashboard/:path*"],
};
