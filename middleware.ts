import { NextRequest } from "next/server";

export const middleware = async (request: NextRequest) => {
  console.log("hello from Middleware", request.nextUrl);
};
