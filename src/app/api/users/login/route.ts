import connectDB from "@/db/config";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        {
          error: "User does not exists",
        },
        {
          status: 400,
        }
      );
    }

    const isValidPassword = await bcryptjs.compare(password, user.password);

    if (!isValidPassword) {
      return NextResponse.json(
        {
          error: "Invalid details.",
        },
        {
          status: 400,
        }
      );
    }
    const data = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    const token = generateToken(data);

    const response = NextResponse.json({
      message: "Login Successfully",
      success: true,
    });
    response.cookies.set("token", token, { httpOnly: true, secure: true });
    return response;
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

const generateToken = (data: { id: any; username: any; email: any }) => {
  const token = jwt.sign(data, process.env.TOKEN_SECRET!, {
    expiresIn: "1d",
  });
  return token;
};
