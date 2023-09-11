import React from "react";
import "./Reviews.scss";
import Review from "../Review/Review";
import { useQuery } from "react-query";
import newRequest from "../../utils/newRequest";

const Reviews = ({ gigId }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: `Reviews${gigId}`,
    queryFn: async () => {
      const res = await newRequest.get(`/reviews/${gigId}`);
      return res.data;
    },
  });
  return (
    <div className="reviews">
      <h2>Reviews</h2>
      {isLoading
        ? "loading"
        : error
        ? "Something went wrong"
        : data.map((review) => <Review key={review._id} review={review} />)}
    </div>
  );
};

export default Reviews;
