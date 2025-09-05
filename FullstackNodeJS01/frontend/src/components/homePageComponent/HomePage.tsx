import React, { useEffect, useState } from "react";
import { getProductByCategory, getProtected } from "../../services/auth/authApi";
import "./HomePage.css";

interface User {
  name: string;
  email: string;
}

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
}

const HomePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const fetchProtected = async () => {
      try {
        const res = await getProtected();
        setUser(res.data);
      } catch (error) {
        console.error("Token invalid or expired:", error);
      }
    };
    fetchProtected();
  }, []);

  useEffect(() => {
  const fetchProducts = async () => {
    setLoading(true); // Bắt đầu loading
    try {
      const res = await getProductByCategory({
        categoryId: "68bb131d8671b6a3957468f4",
        currentPage: page,
        limit: 6,
        search,
      });

      console.log("Products:", res.data);
      setProducts(res.data.products);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false); // Kết thúc loading
    }
  };
  fetchProducts();
}, [page, search]);


  return (
    <div className="home-container">
      {/* Header */}
      <header className="header">
        <h2>👋 Xin chào {user ? user.name : "Guest"}</h2>
        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Tìm sản phẩm..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </header>

      {/* Product Section */}
      <main className="product-section">
        {loading ? (
          <p className="loading">Đang tải sản phẩm...</p>
        ) : (
          <div className="product-grid">
            {products.map((product) => (
              <div className="product-card" key={product._id}>
                <img
                  src={
                    product.imageUrl ||
                    "https://via.placeholder.com/200x150?text=No+Image"
                  }
                  alt={product.name}
                />
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <span className="price">
                    {product.price.toLocaleString("vi-VN")} đ
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="pagination">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
          >
            ⬅ Trước
          </button>
          <span>
            Trang {page} / {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Sau ➡
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 YourApp. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
