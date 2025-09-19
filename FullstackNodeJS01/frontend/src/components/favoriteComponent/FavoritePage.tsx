import React, { useEffect, useState } from "react";
import { getFavoriteProducts, getProtected, viewProduct} from "../../services/auth/authApi";
import "./FavoritePage.css";
import { useNavigate } from "react-router-dom";


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

interface Favorite {
  _id: string;
  userId: string;
  productId: Product[];
}


const FavoritePage: React.FC = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  

  // Lấy thông tin user
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



// Lấy sản phẩm yêu thích
useEffect(() => {
    const fetchProducts = async () => {
    setLoading(true);
    try {
        const res : Favorite = await getFavoriteProducts();
        setProducts(res.productId);
    }  
    catch (error) {
        console.error("Error fetching products:", error);
    } finally {
        setLoading(false);
    }
    };
    fetchProducts();
}, []); 

  return (
    <div className="favorite-container">
        {/* Header */}
        <header className="header">
            <h2>👋 Xin chào {user ? user.name : "Guest"}</h2>
            <div className="title-page">
                <h4>Danh sách sản phẩm yêu thích</h4>
            </div>
        </header>


        {/* Product Section */}
        <main className="product-section">
         <nav className="breadcrumb">
            <span
                className="breadcrumb-link"
                onClick={() => navigate("/home")}
            >
                Home
            </span>
            <span className="breadcrumb-separator">→</span>
            <span className="breadcrumb-current">Favorite</span>
        </nav>
        {loading ? (
            <p className="loading">Đang tải sản phẩm...</p>
        ) : (
            <div className="product-grid">
            {products.map((product) => (
                <div className="product-card" key={product._id}>
                <img
                    src={product.imageUrl || ""}
                    alt={product.name}
                    onClick={async () => {
                    try {
                        // Gọi API viewProduct trước
                        await viewProduct(product._id);
                        // Sau đó điều hướng sang trang chi tiết sản phẩm
                        navigate(`/products/${product._id}`);
                    } catch (error) {
                        console.error("Lỗi khi xử lý viewProduct:", error);
                        // vẫn cho navigate nếu muốn
                        navigate(`/products/${product._id}`);
                    }
                    }}
                    style={{ cursor: "pointer" }}
                />
                <div className="product-info">
                    <h3>{product.name}</h3>
                    {/* <p>{product.description}</p> */}
                    <span className="price">{product.price.toLocaleString("vi-VN")} đ</span>
                </div>
                </div>
            ))}
            </div>
        )}
        </main>


        {/* Footer */}
        <footer className="footer">
            <p>&copy; 2025 YourApp. All Rights Reserved.</p>
        </footer>

    </div>
  );
};

export default FavoritePage;
