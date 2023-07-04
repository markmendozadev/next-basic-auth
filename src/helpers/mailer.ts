import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

// to update type of parameter
export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // create a hashed token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    } else {
      throw new Error("Email type not found");
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "fee1df4e7c4c8d",
        pass: "965036669eaa9e",
      },
    });
    const mailoptions = {
      from: "support@mark.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${
        process.env.domain
      }/verifyemail?token=${hashedToken}">here</a>${
        emailType === "VERIFY" ? "Verify your email" : "Reset your password"
      }</p>`,
    };
    const mailresponse = await transport.sendMail(mailoptions);
    return mailresponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
