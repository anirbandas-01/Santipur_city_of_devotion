import React from "react";
import Slideshow from "../components/Slideshow";

function Home() {
  return (
    <div className="flex flex-col">
      {/* Slideshow Hero */}
      <Slideshow />

      {/* Expanded History Section */}
      <section className="py-20 px-6 md:px-20 bg-gray-50 text-center">
        <h2 className="text-4xl font-playfair font-bold mb-12">
          The History of Santipur
        </h2>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto text-left">
          <div>
            <h3 className="text-2xl font-bold text-primary-600 mb-4">
              Ancient Roots
            </h3>
            <p className="text-gray-700 font-inter">
              Santipur has been a center of devotion and learning for centuries.
              Known from ancient times for its rich traditions, it became a hub
              of scholars, saints, and artisans. The city’s foundations reflect
              a blend of culture, spirituality, and heritage.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-primary-600 mb-4">
              Handloom & Weaving
            </h3>
            <p className="text-gray-700 font-inter">
              Santipur is world-famous for its handloom sarees and traditional
              weaving techniques, passed down through generations. The unique
              Santipuri Saree is not only a cultural symbol but also a
              representation of the city’s artistry.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-primary-600 mb-4">
              Festivals & Culture
            </h3>
            <p className="text-gray-700 font-inter">
              Festivals like Rash Utsav and Holi are celebrated with grandeur,
              attracting thousands of devotees and tourists. The city’s cultural
              life blends music, art, and devotion into everyday traditions.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-primary-600 mb-4">
              Spiritual Influence
            </h3>
            <p className="text-gray-700 font-inter">
              Santipur is often called the “City of Devotion.” Many saints and
              spiritual leaders have lived and preached here, leaving behind a
              legacy of peace and devotion that continues to inspire.
            </p>
          </div>
        </div>
      </section>

      {/* Devotional Section */}
      <section className="py-20 px-6 md:px-20 text-center">
        <h2 className="text-4xl font-playfair font-bold mb-8">
          A Devotional Legacy
        </h2>
        <p className="text-gray-700 font-inter max-w-3xl mx-auto mb-10">
          With deep roots in spirituality, Santipur has been home to poets,
          philosophers, and saints who spread the message of devotion and love.
          The city’s temples, rituals, and community practices keep this
          devotional energy alive.
        </p>
        <div className="flex justify-center gap-6">
          <button className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-inter shadow-md">
            Explore Temples
          </button>
          <button className="px-6 py-3 border-2 border-primary-600 text-primary-600 rounded-lg font-inter hover:bg-primary-50">
            Join Community
          </button>
        </div>
      </section>
    </div>
  );
}

export default Home;

