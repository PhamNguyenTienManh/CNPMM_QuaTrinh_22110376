import React, { useEffect, useState } from 'react';
import { getProtected } from '../../services/auth/authApi';
import './HomePage.css';

const HomePage = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchProtected = async () => {
      try {
        const res = await getProtected();
        console.log("Users:", res.data);
        setUser(res.data);
      } catch (error) {
        console.error("Token invalid or expired:", error);
      }
    };
    fetchProtected();
  }, []);

  return (
    <div className="home-container">
      <div className="home-card shadow-lg p-4 rounded">
        <h2>Welcome to Your Dashboard</h2>
        {user ? (
          <p>Hello <b>{user.email}</b>, you have successfully logged in 🎉</p>
        ) : (
          <p>Loading user info...</p>
        )}
        <button className="btn btn-primary">Explore Dashboard</button>
      </div>
      <div className="footer">
        <p>&copy; 2025 YourApp. All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default HomePage;
