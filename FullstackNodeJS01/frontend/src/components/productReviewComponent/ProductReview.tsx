import React, {useEffect, useState} from "react";
import "./ProductReview.css";
import { getProductFeedback } from "../../services/auth/authApi";

interface User {
  _id: string;
  name: string;
}

interface Feedback {
  _id: string;
  userId: User;
  rating: number;
  comment: string;
  createdAt: string;
}

// const reviews: Review[] = [
//   {
//     id: 1,
//     name: "Samantha D.",
//     date: "August 14, 2023",
//     rating: 5,
//     comment:
//       "I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It’s become my favorite go-to shirt.",
//   },
//   {
//     id: 2,
//     name: "Alex M.",
//     date: "August 15, 2023",
//     rating: 5,
//     comment:
//       "The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I’m quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me.",
//   },
//   {
//     id: 3,
//     name: "Ethan R.",
//     date: "August 16, 2023",
//     rating: 4,
//     comment:
//       "This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer’s touch in every aspect of this shirt.",
//   },
//   {
//     id: 4,
//     name: "Olivia P.",
//     date: "August 17, 2023",
//     rating: 5,
//     comment:
//       "As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It’s evident that the designer poured their creativity into making this t-shirt stand out.",
//   },
// ];

interface ProductReviewProps {
  productId: string | undefined; // hoặc string nếu bạn chắc chắn id luôn có
}

const ProductReview: React.FC<ProductReviewProps> = ({productId}) => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  useEffect(() => {
    if (!productId) return;
    const fetchFeedback = async () => {
      try {
        // setLoading(true);
        const data = await getProductFeedback(productId);
        setFeedbacks(data);
      } catch (err) {
        console.error("Lỗi lấy chi tiết sản phẩm:", err);
      } finally {
        // setLoading(false);
      }
    };
  
      fetchFeedback();
    }, [productId]);


  return (
    <div className="product-review">
      <div className="product-review__header">
        <h4>All Reviews ({feedbacks ? feedbacks.length : 0})</h4>
        <div className="product-review__actions">
          {/* <button className="filter-btn">Latest   v</button> */}
          <button className="write-btn">Write a Review</button>
        </div>
      </div>

      <div className="product-review__list">
        {feedbacks.map((feedback) => (
          <div key={feedback._id} className="review-card">
            <div className="review-card__rating">
              {"★".repeat(feedback.rating)}
              {"☆".repeat(5 - feedback.rating)}
            </div>
            <div className="review-card__author">
              <strong>{feedback.userId.name}</strong>
            </div>
            <p className="review-card__comment">{feedback.comment}</p>
            <span className="review-card__date">
              Posted on {feedback.createdAt}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReview;
