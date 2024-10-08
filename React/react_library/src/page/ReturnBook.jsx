// import React from 'react'

// const ReturnBook = () => {
//   return (
//     <div>ReturnBook</div>
//   )
// }

// export default ReturnBook
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAddReturnBookMutation, useGetPurchaseQuery } from '../redux/services/libApi';

const ReturnBook = () => {
  const { id } = useParams();
  const { data: purchase } = useGetPurchaseQuery(id);
  const[returnData]=useAddReturnBookMutation();
  const navigate=useNavigate();
  const handleReturn = (bookId) => {
    console.log(`Returning book with ID: ${bookId}`);
    returnData(bookId)
    // navigate(`library/return/${id}`);
  };
  if(purchase?.data?.length===0){
    return("No data found");
  }

  return (
    <div className="container mt-5">
      <div className="card border-0 shadow-sm ">
        <div className="card-header  text-center bg-light">
          <h3 className="mb-0">Return Books</h3>
        </div>
        <div className="card-body p-4 bg-light rounded-4">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-dark">
                <tr>
                  <th>S.No</th>
                  <th>Book Name</th>
                  <th>Author Name</th>
                  <th>Publisher</th>
                  <th>Category</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {purchase?.data?.slice(0,3)?.map((val, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{val?.book?.name}</td>
                    <td>{val?.book?.authorName}</td>
                    <td>{val?.book?.publisher}</td>
                   <td>{val?.book?.category?.name}</td> 
                   {console.log(val.id)}
                    <td>
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => handleReturn(val?.id)}
                        // onClick={() => navigate(`library/return/${val?.id}`)} 
                      >
                        Return
                      </button>
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

export default ReturnBook;
