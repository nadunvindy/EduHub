"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../app/components/header";
import Footer from "../app/components/footer";
import "../src/globals.css";
import { clarity } from "react-microsoft-clarity";

export default function ExcursionForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent actual form submission

    const agreementValue = e.target.elements.agreement.value;

    let agreementString = agreementValue.toString();

    window.clarity("set", "excursionagreement", agreementString);

    setIsSubmitted(true); // Show success message
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow p-6 bg-gray-50 flex items-center justify-center">
          <div className="text-center bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-4xl font-bold mb-4 text-green-600">
              Form Submitted Successfully!
            </h1>
            <p className="text-lg mb-6">
              Thank you for signing the excursion form. We’ll get back to you
              with more details soon.
            </p>
            <button
              onClick={() => router.push("/parent-dashboard")}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-secondary"
            >
              Back to Parent Dashboard
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-6 bg-gray-50">
        <h1 className="text-4xl font-bold mb-6">Upcoming Excursion Form</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md space-y-4"
        >
          <div>
            <label className="block text-lg font-medium mb-2">Name:</label>
            <input
              type="text"
              className="w-full border px-4 py-2 rounded-lg"
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">Email:</label>
            <input
              type="email"
              className="w-full border px-4 py-2 rounded-lg"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">
              Preferred Excursion Date:
            </label>
            <input
              type="date"
              className="w-full border px-4 py-2 rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">
              Select Your Child:
            </label>
            <select className="w-full border px-4 py-2 rounded-lg" required>
              <option value="">-- Select --</option>
              <option value="1">John Doe</option>
              <option value="2">Jane Smith</option>
            </select>
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">Comments:</label>
            <textarea
              className="w-full border px-4 py-2 rounded-lg"
              rows="4"
              placeholder="Any additional comments"
            ></textarea>
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">
              Upload Supporting Document:
            </label>
            <input type="file" className="w-full" />
          </div>
          <div className="flex items-center space-x-4">
            <label>
              <input
                type="radio"
                name="agreement"
                value="yes"
                className="mr-2"
                required
              />
              Yes, I agree
            </label>
            <label>
              <input
                type="radio"
                name="agreement"
                value="no"
                className="mr-2"
              />
              No, I disagree
            </label>
          </div>
          <div>
            <button
              type="submit"
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-secondary"
              onClick={() => {
                window.clarity("event", "Excursion Form Submit");
              }}
            >
              Submit
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}
