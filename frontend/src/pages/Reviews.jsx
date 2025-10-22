import { useState, useEffect } from "react";
import axios from "axios";

export default function Reviews() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 5,
    message: "",
    suggestion: "",
  });
  const [reviews, setReviews] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/reviews", formData);
    setFormData({ name: "", email: "", rating: 5, message: "", suggestion: "" });
    setSubmitted(true);
    fetchReviews();
    setTimeout(() => setSubmitted(false), 3000);
  };

  const fetchReviews = async () => {
    const res = await axios.get("http://localhost:5000/api/reviews");
    setReviews(res.data);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h2 className="text-3xl font-bold text-center mb-8">Share Your Feedback</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-6 space-y-4 border border-gray-200"
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email (optional)"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
        />
        <label className="block text-gray-600 font-semibold">Rating:</label>
        <select
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
        >
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>
              {r} ⭐
            </option>
          ))}
        </select>
        <textarea
          name="message"
          placeholder="Your Review"
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full p-3 border rounded-lg h-28"
        />
        <textarea
          name="suggestion"
          placeholder="Any suggestions or ideas?"
          value={formData.suggestion}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg h-20"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold"
        >
          Submit Review
        </button>
        {submitted && (
          <p className="text-green-600 font-medium text-center">Thanks for your feedback!</p>
        )}
      </form>

      <div className="mt-10">
        <h3 className="text-2xl font-semibold mb-4">Recent Reviews</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev._id}
              className="border rounded-xl p-4 bg-gray-50 shadow-sm hover:shadow-md transition"
            >
              <h4 className="font-bold text-lg">{rev.name}</h4>
              <p className="text-yellow-500">{rev.rating} ⭐</p>
              <p className="text-gray-700 mt-2">{rev.message}</p>
              {rev.suggestion && (
                <p className="text-sm text-gray-500 mt-1">
                  💡 Suggestion: {rev.suggestion}
                </p>
              )}
              <p className="text-xs text-gray-400 mt-2">
                {new Date(rev.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
