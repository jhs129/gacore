import type { NextApiRequest, NextApiResponse } from "next";
import { MembershipFormData } from "../../types/membership";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const formData = req.body as MembershipFormData;

    // Log the form data to console
    console.log(
      "Received membership application:",
      JSON.stringify(formData, null, 2)
    );

    // Here you would typically save to a database
    // For now, we'll just send back a success response
    res.status(200).json({
      message: "Application received successfully",
      data: formData,
    });
  } catch (error) {
    console.error("Error processing membership application:", error);
    res.status(500).json({ message: "Error processing application" });
  }
}
