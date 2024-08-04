import { useState } from 'react';
import Splash_Page from './Components/Splash_Page';
import {Routes,Route} from "react-router-dom";
import LandingPage from './Components/LandingPage';
import SignUp from './Components/SignUp';
import ChoicePage from './Components/Choice';
import HomePage from './Components/Home';
import Profile from "./Components/Profile"
import ProfileEdit from './Components/ProfileEdit';
import PostPage from './Components/Post';
import PostAdd from './Components/PostAdd';
import Edit from './Components/Edit';
function App() {

  return (
    <>
    
       <Routes>
           <Route path="/" element={<Splash_Page/>}/>
           <Route path="/landingPage" element={<LandingPage/>}/>
           <Route path="/SignUp" element={<SignUp/>}/>
           <Route path="/choice" element={<ChoicePage/>}/>
           <Route path="/home" element={<HomePage/>}/>
           <Route path="/profile" element={<Profile/>}/>
           <Route path="/edit" element={<ProfileEdit/>}/>
           <Route path="/post" element={<PostPage/>}/>
           <Route path="/add" element={<PostAdd/>}/>
           <Route path="/editPost/:id" element={<Edit/>}/>
       </Routes>
   
    </>
  );
}

export default App;
