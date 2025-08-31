import { Link } from "react-router-dom";

const MainHome = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4">
      <h1 className="text-4xl md:text-6xl font-bold tracking-wide text-center">
        MINATO FOUNDATION
      </h1>
      <p className="text-lg md:text-xl text-gray-400 mt-4 text-center">
        {/* Empowering lives through technology and innovation */}
      </p>

      <div className="mt-8">
        <Link
          to="/admin_Login"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-all duration-300 ease-in-out"
        >
          Admin Login
        </Link>
      </div>
    </div>
  );
};

export default MainHome;
