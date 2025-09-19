import React, { useState, useEffect } from "react";
import "./ProductDetailPage.css";
import ProductReview from "../productReviewComponent/ProductReview";
import RecommendProduct from "../recommendProduct/RecommendProduct";
import { useParams } from "react-router-dom";
import { addFavoriteProduct, checkFavoriteProduct, getProductInfo, getSimilarProducts, getViewedProductRecent, removeFavoriteProduct } from "../../services/auth/authApi";
import { FaHeart } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";


const HeartIcon = FaHeart as unknown as React.FC<React.SVGProps<SVGSVGElement>>;




interface Variant {
  _id: string;
  colorId: { _id: string; name: string; hex: string };
  sizeId: { _id: string; name: string };
  quantity: number;
}

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId: { _id: string; name: string };
  productVariants: Variant[];
}

interface ViewedProduct {
  _id: string;
  productId: Product;
  userId: string;
  viewedAt: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}



const ProductDetail: React.FC = () => {
  const navigate = useNavigate();
  
  //const product = sampleProduct;
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string | null>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);


  
  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getProductInfo(id);
        setProduct(data);
        setSelectedColor(data.productVariants[0].colorId._id);
      } catch (err) {
        console.error("Lỗi lấy chi tiết sản phẩm:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);
  
  // Tìm những sản phẩm đã xem gần đây
  useEffect(() => {
  const fetchRecent = async () => {
    const data: ViewedProduct[] = await getViewedProductRecent();
    if (data) {
      // chỉ lấy productId ra
      const products = data.map(item => item.productId);
      setRecentProducts(products);
    }
  };
  fetchRecent();
}, []);

// Tìm những sản phẩm tương tự
  useEffect(() => {
      if (!id) return;
      const fetchSimilar = async () => {
      const data = await getSimilarProducts(id);
      setSimilarProducts(data);
    };
    fetchSimilar();
  }, [id]);

  // Kiểm tra sản phẩm yêu thích
  useEffect(() => {
      if (!id) return;
      const fetchFavorite = async () => {
      const data = await checkFavoriteProduct(id);
      setIsFavorite(data.isFavorite);
    };
    fetchFavorite();
  }, [id]);

  // Kiểm tra sản phẩm có load lên chưa, nếu k có thì báo ra màn hình
  if (loading) return <p>Đang tải chi tiết sản phẩm...</p>;
  if (!product) return <p>Không tìm thấy sản phẩm</p>;

  // Lấy danh sách màu không trùng
  const uniqueColors = Array.from(
    new Map(product.productVariants.map(v => [v.colorId._id, v.colorId])).values()
  );

  // Lấy size theo màu đang chọn (ví dụ mặc định chọn màu đầu tiên)
  const sizes = product.productVariants.filter(v => v.colorId._id === selectedColor);

  // Tìm variant khớp với màu và size đã chọn
  const selectedVariant = product.productVariants.find(
    (v) => v.colorId._id === selectedColor && v.sizeId.name === selectedSize
  );

  // Xử lý set màu trái tim
 const toggleFavorite = async () => {
  if (!id) return;
    try {
      if (isFavorite) {
        // Xóa khỏi danh sách yêu thích
        await removeFavoriteProduct(id);
        setIsFavorite(false);
      } else {
        // Thêm vào danh sách yêu thích
        await addFavoriteProduct(id);
        setIsFavorite(true);
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật sản phẩm yêu thích:", error);
    } finally {
      setLoading(false);
    }
  };

  // function addToCart() {
  //   console.log("Add to cart:", { productId: product._id, quantity, selectedColor, selectedSize });
  //   alert(`Added ${quantity} × ${product.name} (size: ${selectedSize ?? "-"}, color: ${selectedColor}) to cart (demo)`);
  // }

  return (
    <div className="product-detail">
      {/* Breadcrumb */}
      <nav className="breadcrumb">
          <span
              className="breadcrumb-link"
              onClick={() => navigate("/home")}
          >
              Home
          </span>
          <span className="breadcrumb-separator">→</span>
          <span className="breadcrumb-current">Product</span>
      </nav>
      <div className="product-detail__content">
        <button className="favorite-btn" onClick={toggleFavorite}>
          <HeartIcon className={`heart-icon ${isFavorite ? "active" : ""}`} />
        </button>

        <div className="product-detail__image-section">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="product-detail__main-image"
          />
        
        </div>

        <div className="product-detail__info">
          <h1 className="product-title">{product.name}</h1>
          <div className="product-price">
            <span className="current-price">{product.price.toLocaleString("vi-VN")} VNĐ</span>
          </div>

          <p className="product-description">{product.description}</p>

          <div className="color-selector">
            <h4>Select Colors</h4>
            <div className="options">
              {uniqueColors.map((c) => (
                <button
                  key={c._id}
                  onClick={() => setSelectedColor(c._id)}
                  className={`color ${selectedColor === c._id ? "selected" : ""}`}
                  style={{ backgroundColor: c.hex ?? "#ddd" }}
                />
              ))}
            </div>
          </div>

          <div className="size-selector">
            <h4>Choose Size</h4>
            <div className="options">
              {sizes.map((s) => (
                <button
                  key={s.sizeId._id}
                  onClick={() => setSelectedSize(s.sizeId.name)}
                  className={`size ${selectedSize === s.sizeId.name ? "selected" : ""}`}
                >
                  {s.sizeId.name}
                </button>
              ))}
            </div>
          </div>

          <div className="variant-stock">
            <h4>Rest Stock: <span style={{color: "black"}}> {selectedVariant ? selectedVariant.quantity : ""} </span> </h4>
          </div>

          <div className="quantity-section">
            <div className="quantity-control">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>−</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity((q) => q + 1)}>+</button>
            </div>
            <button onClick={()=>{}} className="add-to-cart">Add to Cart</button>
          </div>

        
        </div>
      </div>
      <ProductReview productId={id}/>
      <RecommendProduct products = {similarProducts} title="Sản phẩm tương tự"/>
      <RecommendProduct products = {recentProducts} title="Sản phẩm đã xem gần đây"/>
    </div>
  );
};

export default ProductDetail;
