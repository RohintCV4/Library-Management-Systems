import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import SignUp from './page/auth/SignUp';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './page/auth/SignIn';

import Layout from './page/users/Layout';


import ReturnBook from './page/users/ReturnBook';
import UserProfiles from './page/Librarian/UserProfiles';
import LibrarianLayout from './page/Librarian/LibrarianLayout';
import Purchase from './page/users/Purchase';
import Book from './page/users/Book';
import ProfileUpdate from './page/users/ProfileUpdate';
import PurchasedBook from './page/Librarian/PurchasedBook';
import UpdateLibrarian from './page/Librarian/updateLibrarian';
import OverDue from './page/Librarian/OverDue';
import AboutUs from './page/common/AboutUs';



function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<SignUp />}/>    
        <Route path='/signin' element={<SignIn />}/>
        <Route path='/library' element={<Layout />}>
        <Route path='/library/book/:id' element={<Book />}/>
        <Route path='/library/aboutus' element={<AboutUs />}/>
        <Route path='/library/profileupdate/:id' element={<ProfileUpdate />} />
        <Route path='/library/purchase/:id' element={<Purchase />}/>
        <Route path='/library/return/:id' element={<ReturnBook />}/>
        </Route>
        <Route path='/librarian' element={<LibrarianLayout />}>
        <Route path='/librarian/userlist' element={<UserProfiles />}/>
        <Route path='/librarian/purchased' element={<PurchasedBook />}/>
        <Route path='/librarian/overdue' element={<OverDue />}/>
        <Route path='/librarian/aboutus' element={<AboutUs />}/>
        <Route path='/librarian/updatelibrarian/:id' element={<UpdateLibrarian />} />
        </Route>
        
      </Routes>
    </Router>
  )
}

export default App;
