import React from "react";
import styles from "./Home.module.css";

const Home: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-blue-100 to-blue-300 min-h-screen flex items-center justify-center">
      <div className={`text-center px-4 ${styles.customBox}`}>
        <h1 className="text-5xl font-extrabold text-gray-800 mb-6">
          Welcome to <span className="text-blue-600">LocalCMM</span>
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Your fast and efficient rental solution connecting tenants and owners
        </p>
        <a
          href="http://localhost:5173/signin"
          className="inline-block px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-blue-700 transition"
          target="_blank"
          rel="noopener noreferrer"
        >
          Access the project
        </a>
      </div>
    </div>
  );
};

export default Home;
