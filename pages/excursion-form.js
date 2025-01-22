"use client";

import Header from "../app/components/header";
import Footer from "../app/components/footer";
import "../src/globals.css"

export default function ExcursionForm() {
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent actual form submission
    alert("Form submitted (simulation for MS Clarity testing).");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-6 bg-gray-50">
        <h1 className="text-4xl font-bold mb-6">Upcoming Excursion Form</h1>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
          <div>
            <label className="block text-lg font-medium mb-2">Name:</label>
            <input type="text" className="w-full border px-4 py-2 rounded-lg" placeholder="Enter your name" />
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">Email:</label>
            <input type="email" className="w-full border px-4 py-2 rounded-lg" placeholder="Enter your email" />
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">Preferred Excursion Date:</label>
            <input type="date" className="w-full border px-4 py-2 rounded-lg" />
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">Select Your Child:</label>
            <select className="w-full border px-4 py-2 rounded-lg">
              <option value="">-- Select --</option>
              <option value="1">John Doe</option>
              <option value="2">Jane Smith</option>
            </select>
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">Comments:</label>
            <textarea className="w-full border px-4 py-2 rounded-lg" rows="4" placeholder="Any additional comments"></textarea>
          </div>
          <div>
            <label className="block text-lg font-medium mb-2">Upload Supporting Document:</label>
            <input type="file" className="w-full" />
          </div>
          <div className="flex items-center space-x-4">
            <label>
              <input type="radio" name="agreement" value="yes" className="mr-2" />
              Yes, I agree
            </label>
            <label>
              <input type="radio" name="agreement" value="no" className="mr-2" />
              No, I disagree
            </label>
          </div>
          <div>
            <button type="submit" className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-secondary">
              Submit
            </button>
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}
