"use server";

import * as nodemailer from "nodemailer";
import { appConfig } from "../config";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: appConfig.email.id,
    pass: appConfig.email.password,
  },
});

export async function sendMail(dataIn: {
  to: string;
  html: string;
  text: string;
  from?: string;
  subject?: string;
}) {
  if (!dataIn.from) {
    dataIn.from = `${appConfig.name} <${appConfig.email.id}>`;
  }

  if (appConfig.nodeEnv === "production" && !appConfig.isTest) {
    await transporter.sendMail(dataIn);
  } else {
    console.log(dataIn.html);
    console.log(`send email: ${dataIn.to}, ${dataIn.subject}`);
  }
}
