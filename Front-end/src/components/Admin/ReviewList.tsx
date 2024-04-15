import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from "redux";
import { getAllBlogs } from "../../redux/actions/blog";
import BlogItem from "./BlogItem";
import { getAllReviews } from "../../redux/actions/review";
import ReviewItem from "./ReviewItem";


const ReviewList = () => {
  const dispatch = useDispatch();
  const { reviews, isLoading } = useSelector((state: any) => state.reviews);
  // console.log(reviews);
  const [blogsData, setblogsData] = useState(reviews);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage, setPaymentPerPage] = useState(8);
  const lastPostIndex = currentPage * blogsPerPage;
  const firstPostIndex = lastPostIndex - blogsPerPage;

  let currentReview = blogsData.slice(firstPostIndex, lastPostIndex);
  console.log(blogsData)

  let pages = [];

  const totalPage = Math.ceil(blogsData.length / blogsPerPage);

  for (let i = 1; i <= totalPage; i++) {
    pages.push(i);
  } 

  useEffect(() => {
    dispatch(getAllReviews() as unknown as AnyAction);
  }, [dispatch]);
 
  console.log(reviews)

  return (
   <div className="container">
    <div className="row">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            id="review_id"
            placeholder="Blog ID"
            // onChange={handleFindByTransaction}
          />
        </div>
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Title"
            // onChange={handleFindByBuyer}
          />
        </div>
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            id="tour"
            placeholder="Tour Name..."
            // onChange={handleFindByTourName}
          />
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            {/* <th scope="col">Blog ID</th> */}
            <th scope="col">Full Name</th>
            <th scope="col">Email</th>
            <th scope="col">Rating</th>
            <th scope="col">Commnent</th>
            <th scope="col">Sentiment</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
        {blogsData.map((comment: any, index: number) => (<>
        <tr>
          <td>{comment.user.name}</td>
          <td>{comment.user.email}</td>
          <td>{comment.rating}</td>
          <td>{comment.comments}</td>
          <td>{comment.probret}</td>
          </tr>
        </>))}
        </tbody>
      </table>
   </div>
  )
}

export default ReviewList