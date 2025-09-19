import React, { useRef, useState, useEffect } from "react";
import "./RecommendProduct.css";
import { viewProduct } from "../../services/auth/authApi";
import { useNavigate } from "react-router-dom";

// Re-usable SimilarProduct carousel component
// Accepts a list of products with this interface:
// interface Product {
//   _id: string;
//   name: string;
//   description: string;
//   price: number;
//   imageUrl?: string;
// }

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
}

interface SimilarProductProps {
  products?: Product[]; // optional, fallback to demo data if not provided
  title?: string;
}

const CARD_GAP = 16; // px -- keep in sync with CSS


const RecommendProduct: React.FC<SimilarProductProps> = ({ products = [], title = "Similar products" }) => {
const navigate = useNavigate();

  const trackRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Thêm biến để kiểm tra xem có nên cuộn không
  const isScrollable = products.length > 5;

  useEffect(() => {
    const el = trackRef.current;
    if (!el || !isScrollable) return; // Thêm điều kiện isScrollable

    const update = () => {
      setCanScrollLeft(el.scrollLeft > 5);
      setCanScrollRight(el.scrollLeft + el.clientWidth + 5 < el.scrollWidth);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    el.addEventListener("scroll", update, { passive: true });
    return () => {
      ro.disconnect();
      el.removeEventListener("scroll", update);
    };
  }, [products, isScrollable]);

  const scrollByWidth = (direction: "left" | "right") => {
    const el = trackRef.current;
    if (!el) return;
    const amount = el.clientWidth - 40;
    const target = direction === "left" ? el.scrollLeft - amount : el.scrollLeft + amount;
    el.scrollTo({ left: target, behavior: "smooth" });
  };

  return (
    <div className="similar-products">
      <div className="similar-products__header">
        <h3>{title}</h3>
      </div>

      <div className="similar-products__wrapper">
        {isScrollable && (
          <button
            className={`carousel-btn left ${canScrollLeft ? "" : "disabled"}`}
            onClick={() => scrollByWidth("left")}
            aria-label="Previous"
            disabled={!canScrollLeft}
          >
            ‹
          </button>
        )}

        <div className={`similar-products__track ${isScrollable ? '' : 'no-scroll'}`} ref={trackRef}>
          {products.map((p) => (
            <div className="similar-products__card" key={p._id}>
              <div className="card-image">
                <img 
                  src={p.imageUrl ?? "https://via.placeholder.com/300x300?text=No+Image"} 
                  alt={p.name}
                  onClick={async () => {
                    try {
                      // Gọi API viewProduct trước
                      await viewProduct(p._id);
                      // Sau đó điều hướng sang trang chi tiết sản phẩm
                      navigate(`/products/${p._id}`);
                    } catch (error) {
                      console.error("Lỗi khi xử lý viewProduct:", error);
                      // vẫn cho navigate nếu muốn
                      navigate(`/products/${p._id}`);
                    }
                  }}
                  style={{ cursor: "pointer" }}
                />
              </div>
              <div className="card-body">
                <div className="card-name">{p.name}</div>
                {/* <div className="card-desc">{p.description}</div> */}
                <div className="card-price">{p.price.toLocaleString("vi-VN")} VNĐ</div>
              </div>
            </div>
          ))}
        </div>

        {isScrollable && (
          <button
            className={`carousel-btn right ${canScrollRight ? "" : "disabled"}`}
            onClick={() => scrollByWidth("right")}
            aria-label="Next"
            disabled={!canScrollRight}
          >
            ›
          </button>
        )}
      </div>
    </div>
  );
};

export default RecommendProduct;