import Slideshow from "../components/Slideshow";
import Card from "../components/Card";

function Home() {
  return (
    <div className="space-y-10">
      {/* Hero Slideshow */}
      <Slideshow />

      {/* About Section */}
      <section className="text-center space-y-4">
        <h2 className="text-3xl font-bold">Welcome to Santipur</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Santipur is a city rich in devotion, culture, and tradition. Explore its ancient temples, vibrant festivals, and unique handloom heritage.
        </p>
      </section>

      {/* Card Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card
          title="Temples"
          description="Explore centuries-old temples and sacred sites."
          image="https://source.unsplash.com/400x300/?temple"
        />
        <Card
          title="Festivals"
          description="Experience the vibrant festivals of Santipur."
          image="https://source.unsplash.com/400x300/?festival"
        />
        <Card
          title="Culture & Handloom"
          description="Discover handloom sarees and rich cultural heritage."
          image="https://source.unsplash.com/400x300/?handloom"
        />
      </section>
    </div>
  );
}
export default Home;
