"use server";
import nodemailer from "nodemailer";

export async function submitContactForm(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !subject || !message) {
    return { error: "All fields are required." };
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return { error: "Please enter a valid email address." };
  }

  // Check if email environment variables exist
  const SMTP_EMAIL = process.env.SMTP_EMAIL;
  const SMTP_PASSWORD = process.env.SMTP_PASSWORD;

  if (!SMTP_EMAIL || !SMTP_PASSWORD) {
    // Fallback to mock mode if credentials are not configured to prevent crashes
    console.warn("SMTP credentials not configured in .env.local. Falling back to mock submission.");
    console.log("Mock Contact Submission:", { name, email, subject, message });
    return { success: true };
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: SMTP_EMAIL,
        pass: SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: SMTP_EMAIL,
      to: SMTP_EMAIL, // Send it to yourself
      replyTo: email, // So you can hit 'reply' and it goes to the user
      subject: `Memora Contact: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    // Return a friendly error to the user without crashing the site
    return { error: "There was an issue sending your message. Please try again later." };
  }
}
