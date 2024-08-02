import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Profile() {
  const [userInfo, setUserInfo] = useState({});
  const email = localStorage.getItem("email");
  console.log(email)
 

  const LoadingFunc = async () => {
    try {
      const res = await axios.post("http://localhost:5001/api/user/profile", { email });
     if(res.data.detail.data[0]){
      setUserInfo(res.data.detail.data[0]);
      console.log(res.data.detail.data[0]);
     }
     else{
      alert("Please Update Profile")
     }
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(()=>{
    LoadingFunc();
  },[])
 
  return (
    <div className="p-16 bg-orange-300 bg-[url('./assets/profileBg.png')]">
      <Link to="/home">
        <button className="cursor-pointer duration-200 hover:scale-125 active:scale-100 flex bg-slate-500 w-[10%] border-r-8" title="Go Back">
          <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="0 0 24 24" className="stroke-orange-700">
            <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="1.5" d="M11 6L5 12M5 12L11 18M5 12H19"></path>
          </svg>
          <h2 className="text-xl mt-2 font-bold text-white mt-1 ">Go Back</h2>
        </button>
      </Link>
      {userInfo && (
        <div className="p-8 bg-white shadow mt-24">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
              <div>
                <p className="font-bold text-gray-700 text-xl"></p>
                <p className="text-gray-400">Friends</p>
              </div>
              <div>
                <p className="font-bold text-gray-700 text-xl"></p>
                <p className="text-gray-400">Photos</p>
              </div>
              <div>
                <p className="font-bold text-gray-700 text-xl"></p>
                <p className="text-gray-400">Comments</p>
              </div>
            </div>
            <div className="relative">
              <div className="w-56 h-56 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                <img className="rounded-full h-56 w-56" src={userInfo.profileImage} alt="Profile" />
              </div>
            </div>
            <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
              <button className="text-white py-2 px-4 uppercase rounded bg-orange-400 hover:bg-orange-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                Connection
              </button>
              <Link to="/edit">
                <button className="text-white flex py-4 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                <svg className="h-8 w-8 text-orange-500"  viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />  <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />  <line x1="16" y1="5" x2="19" y2="8" /></svg>
                  Edit profile
                </button>
              </Link>
            </div>
          </div>
          <div className="mt-20 text-center border-b pb-12">
            <h1 className="text-4xl font-medium text-gray-700">{userInfo.fullname}, <span className="font-light text-gray-500">{userInfo.age}</span></h1>
            <p className="font-light text-gray-600 mt-3">Location {userInfo.location}</p>
            <p className="mt-8 text-gray-500">You working as {userInfo.professional}</p>
            <p className="mt-2 text-gray-500">You working at </p>
          </div>
          <div className="mt-12 flex flex-col justify-center">
            <p className="text-gray-600 text-center font-light lg:px-16">About {userInfo.about}</p>
          </div>
        </div>
      )}
    </div>
  );
}
export default Profile;
