import React from 'react'
import {BrowserRouter ,Routes,Route} from "react-router-dom";
import Home from './pages/Home.jsx';
import SignIn from './pages/SignIn.jsx';
import SignUp from './pages/SignUp.jsx';
import About from './pages/About.jsx';
import Profile from './pages/Profile.jsx';
import Header from './components/Header.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import PostVacany from './pages/PostVacany.jsx';
import Post from './pages/Post.jsx';
import Search from './pages/Search.jsx';
import UpdatePost from "./pages/UpdatePost.jsx";
import Footer from './components/Footer.jsx';
const App = () => {
  return (
    
<BrowserRouter>
             <Header/>
             <Routes>
                 <Route path="/" element={<Home/>}/>
                 <Route path="/sign-in" element={<SignIn/>}/>
                 <Route path="/sign-up" element={<SignUp/>}/>
                 <Route path="/about" element={<About/>}/>
                 <Route path="/post/:postId" element={<Post/>}/>
                 <Route path="/search" element={<Search/>}/>
                 <Route element={<PrivateRoute/>}>
                 <Route path="/profile" element={<Profile/>}/>
                 <Route path="/post-vacancy" element={<PostVacany/>}/>
                 <Route path="/update-post/:postId" element={<UpdatePost />} />
                 </Route>
               
               


                 
             </Routes>
               <Footer/>
         </BrowserRouter>
         
  )
};
export default App;

