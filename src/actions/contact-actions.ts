"use server";

export async function submitContactForm(formData: FormData) {
  // Mock delay to simulate network request
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const name = formData.get("name");
  const email = formData.get("email");
  const subject = formData.get("subject");
  const message = formData.get("message");

  if (!name || !email || !subject || !message) {
    return { error: "All fields are required." };
  }

  // Basic email validation
  if (!/^\S+@\S+\.\S+$/.test(email as string)) {
    return { error: "Please enter a valid email address." };
  }

  // In a real application, you would send this via nodemailer, Resend, or save to DB.
  console.log("Mock Contact Submission:", { name, email, subject, message });

  return { success: true };
}
