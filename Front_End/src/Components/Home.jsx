import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "../assets/querulous.png";
import { Link } from "react-router-dom";

export default function HomePage() {
    const [data, setData] = useState([]);
    const [isClicked, setIsClicked] = useState(false);
    const [ispop,setPop] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5001/api/user/data");
                if (response.data.message === "successfull") {
                    setData(response.data.data); 
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const handleClick = () => {
        setIsClicked(!isClicked);
    };

    const handleDoubleClick = () => {
        setIsClicked(false);
    };
    const clickHandle = ()=>{
        setPop(!ispop);
    }
    const doubleClick = ()=>{
        setPop(false);
    }
    console.log(data)
    return (
        <>
            <div className="mt-3 flex justify-between shadow-md">
                <div className="w-[19%] flex justify-between">
                    <img src={logo} alt="Logo" />
                    <form className="flex items-center max-w-sm mx-auto">
                        <label htmlFor="simple-search" className="sr-only">Search</label>
                        <div className="relative w-full">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-4 h-4 text-orange-500 dark:text-orange-400 ml-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                id="simple-search"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[700%] pl-10 py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ml-5"
                                placeholder="Search Content"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="p-3 ml-[360%] text-sm font-medium text-white bg-orange-700 rounded-lg border border-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
                        >
                            <svg className="w-6 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                            <span className="sr-only">Search</span>
                        </button>
                    </form>
                </div>

                <div>
                    <ul className="flex justify-between w-[30%] absolute right-20 top-8">
                        <li>
                            <Link to="/post">
                                <svg className="h-8 w-8 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                                </svg>
                                <p className="text-xs mt-1 mr-2">Post</p>
                            </Link>
                        </li>
                        <li>
                        <Link to="/connected">
                                <div className="relative">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                    <span className="relative flex h-3 w-3">
                                        <span className="animate-ping absolute bottom-8 left-5 inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                                        <span className="relative bottom-8 left-5 inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                                    </span>
                                </div>
                                <div>
                                    <p className="text-xs absolute bottom-0.5 left-[25%]">connected list</p>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to='/news'>
                                <svg className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                </svg>
                                <p className="text-xs mt-1 mr-2">NEWS</p>
                            </Link>
                        </li>
                        <li>
                            <Link to="/profile">
                                <svg className="h-8 w-8 text-red-500" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <circle cx="12" cy="12" r="9" />
                                    <line x1="9" y1="9" x2="9.01" y2="9" />
                                    <line x1="15" y1="9" x2="15.01" y2="9" />
                                    <path d="M8 13a4 4 0 1 0 8 0m0 0H8" />
                                </svg>
                                <p className="text-xs ml-2 mt-1">Me</p>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="w-full bg-gray-300 h-screen">
            {data.length > 0 ? (
  data.map((post, index) => (
    <div key={index} className="w-[60%] h-screen bg-orange-400 ml-[20%]">
      <div className="border rounded-lg h-[85%] w-[45%] ml-[7%] top-[15%] bg-gray-300 absolute">
        <p>Added by: {post.added_by}</p>
        <div className="grid bg-white absolute rounded-lg top-[8%] left-[5%] h-[80%] w-[90%]">
          {post.img && <img src={post.img} alt="Post" className="my-4" />}
          {post.vid && (
            <video width="320" height="240" controls className="my-4">
              <source src={post.vid} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
          <div className="flex justify-between mt-[80%] ml-[10%] items-center">
            <div key={post._id} className="p-4 border-b border-gray-300">
            <svg
                className={`h-8 w-8 ${isClicked ? 'text-green-600' : 'text-orange-500'} hover:text-green-600 active:scale-90 transition-transform duration-150 ease-in-out focus:outline-none focus:ring focus:ring-violet-300 bottom-[4%]`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                onClick={handleClick}
                onDoubleClick={handleDoubleClick}
              >
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
              </svg>
              <div className="relative flex items-center group">
                <button
                  className={`relative flex items-center px-6 py-3 overflow-hidden font-medium transition-all ${ispop ? 'bg-slate-400' : 'bg-indigo-600'} rounded-md`}
                  onClick={clickHandle}
                  onDoubleClick={doubleClick}
                >
                  <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-mr-4 group-hover:-mt-4">
                    <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
                  </span>
                  <span className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-ml-4 group-hover:-mb-4">
                    <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
                  </span>
                  <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-indigo-600 rounded-md group-hover:translate-x-0"></span>
                  <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
                    {ispop ? 'connected' : 'connect'}
                  </span>
                </button>
                <span className="absolute left-[90%] top-1/2 transform -translate-y-1/2 ml-4 px-4 py-2 bg-green-600 text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm whitespace-nowrap">
                  Start Communicating with User
                </span>
                 

              </div>
            
            </div>
            
          </div>
        </div>
      </div>
    </div>
  ))
) : (
  <p>No posts available</p>
)}

               
                            {/* <div className="w-[60%] h-screen bg-orange-400 ml-[20%]"> */}
                    {/* <div className="border rounded-lg h-[85%] w-[45%] ml-[7%] top-[15%] bg-gray-300 absolute"> */}
                        {/* <div className="grid bg-white absolute rounded-lg top-[8%] left-[5%] h-[80%] w-[90%]">   
                           <div className="flex justify-between mt-[80%] ml-[10%]  items-center"> */}
                {/* <svg
                    className={`h-8 w-8 ${isClicked ? 'text-green-600' : 'text-orange-500'} hover:text-green-600  active:scale-90 transition-transform duration-150 ease-in-out focus:outline-none focus:ring focus:ring-violet-300 bottom-[4%]`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    onClick={handleClick}
                    onDoubleClick={handleDoubleClick}
                >
                    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                </svg>
                <div className="relative flex items-center group">
  <button
    className={`relative flex items-center px-6 py-3 overflow-hidden font-medium transition-all  ${ispop? 'bg-slate-400':'bg-indigo-600'}  rounded-md`}
    onClick={clickHandle}
    onDoubleClick={doubleClick}
  >
    <span
      className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-mr-4 group-hover:-mt-4"
    >
      <span
        className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"
      ></span>
    </span>
    <span
      className="absolute bottom-0 rotate-180 left-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-700 rounded group-hover:-ml-4 group-hover:-mb-4"
    >
      <span
        className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"
      ></span>
    </span>
    <span
      className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full bg-indigo-600 rounded-md group-hover:translate-x-0"
    ></span>
    <span
      className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white"
    >{ispop?'connected':'connect'}</span>
  </button>
  <span
    className="absolute left-[90%] top-1/2 transform -translate-y-1/2 ml-4 px-4 py-2 bg-green-600 text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm whitespace-nowrap"
  >Start Communicating with User</span>
</div> */}
                         </div>
                        {/* </div> */}
                    {/* </div> */}
                {/* </div>
            </div> */}
        </>
    );
}
