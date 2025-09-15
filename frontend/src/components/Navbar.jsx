function Navbar() {
  return (
    <nav className="bg-teal-600 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Santipur City of Devotion</h1>
      <button className="md:hidden p-2 border rounded-lg">☰</button>
      <ul className="hidden md:flex space-x-6">
        <li><a href="/" className="hover:text-gray-200">Home</a></li>
        <li><a href="/devotions" className="hover:text-gray-200">Devotions</a></li>
        <li><a href="/culture" className="hover:text-gray-200">Culture</a></li>
        <li><a href="/about" className="hover:text-gray-200">About</a></li>
      </ul>
    </nav>
  );
}
export default Navbar;
