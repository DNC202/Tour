import React, { useEffect } from "react";
import Blog from "../components/Admin/Blog";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ErrorPage from "../components/Layout/ErrorPage";
import { isAdmin } from "../shared/GlobalFunction";
import ReviewList from "../components/Admin/ReviewList"
const ReviewPage = () => {
  const { user } = useSelector((state: any) => state.user);
  console.log(user)

  return isAdmin(user) ? (
    <div>
      <ReviewList></ReviewList>
    </div>
  ) : (
    <ErrorPage></ErrorPage>
  );
};

export default ReviewPage;