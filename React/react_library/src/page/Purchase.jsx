import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetPurchaseQuery, useAddRatingBookMutation } from '../redux/services/libApi';
import '../asset/css/purchase.css';
import { Rating } from '@mui/material';

const Purchase = () => {
  const { id } = useParams();
  const { data: purchase, refetch } = useGetPurchaseQuery(id);
  const [addRatingBook] = useAddRatingBookMutation(); // Mutation hook
  const [ratings, setRatings] = useState({}); // To store ratings for multiple books

  // Refetch data when the component mounts or when id changes
  useEffect(() => {
    refetch();
  }, [id, refetch]);

  useEffect(() => {
    if (purchase) {
      console.log('Purchase data:', purchase); // Perform any side effects here
    }
  }, [purchase]);

  if (purchase?.data?.length === 0) {
    return 'No data found';
  }

  // Handle rating submission
  const handleRatingChange = async (newValue, bookId) => {
    setRatings((prev) => ({ ...prev, [bookId]: newValue })); // Update rating state
    console.log(newValue);
// console.log(localStorage.getItem('userId'));

try {
  await addRatingBook({
    rating: newValue,
    id, 
    bookId,
  });
  console.log('Rating submitted successfully');
} catch (error) {
  console.error('Error submitting rating:', error);
}
  };

  return (
    <div className="container mt-5">
      <div className="card border-0 shadow-sm rounded-4">
        <div className="card-header text-center bg-light">
          <h3 className="mb-0">Purchased Books</h3>
        </div>
        <div className="card-body p-4 bg-light">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-dark">
                <tr>
                  <th>S.Num</th>
                  <th>Book Name</th>
                  <th>Author Name</th>
                  <th>Publisher</th>
                  <th>Category</th>
                  <th>Rating</th>
                </tr>
              </thead>
              <tbody>
                {purchase?.data?.map((val, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{val?.book?.name}</td>
                    <td>{val?.book?.authorName}</td>
                    <td>{val?.book?.publisher}</td>
                    <td>{val?.book?.category?.name}</td>
                    <td>
                      <Rating
                        name={`rating-${val.book.id}`}
                        value={ratings[val.book.id] || 0} // Set value based on ratings state
                        onChange={(event, newValue) =>
                          handleRatingChange(newValue, val.book.id)
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Purchase;