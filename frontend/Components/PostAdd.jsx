import React, { useState, useRef, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
export default function PostAdd() {
  const [post, setPost] = useState("");
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  const email = localStorage.getItem("email");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const nav = useNavigate();
  const cloudinary = useRef();
  const widgetRef = useRef();
  const cloudinary2 = useRef();
  const widgetRef2 = useRef();

  useEffect(() => {
    if (!window.cloudinary) {
      console.log("Cloudinary script not loaded.");
      return;
    }

    cloudinary.current = window.cloudinary;
    widgetRef.current = cloudinary.current.createUploadWidget(
      {
        cloudName: 'dioirlnnn',
        uploadPreset: 'dawl8vga',
      },
      (error, result) => {
        if (error) {
          console.log("Upload error:", error);
        } else if (result && result.event === "success") {
          console.log("Upload result:", result.info.secure_url);
          setImage(result.info.secure_url);
        }
      }
    );
  }, []);

  useEffect(() => {
    if (!window.cloudinary) {
      console.log("Cloudinary script not loaded.");
      return;
    }
    cloudinary2.current = window.cloudinary;
    widgetRef2.current = cloudinary2.current.createUploadWidget(
      {
        cloudName: 'dioirlnnn',
        uploadPreset: 'rlz83089',
      },
      (error, result) => {
        if (error) {
          console.log("Upload error 2:", error);
        } else if (result && result.event === "success") {
          console.log("Upload result2:", result.info.secure_url);
          setVideo(result.info.secure_url);
        }
      }
    );
  }, []);

  const PostFunc = (e) => {
    const { value } = e.target;
    setPost(value);
  };

  const titleChange = (e) => {
    const { value } = e.target;
    setTitle(value);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    
    const containerValue = {
      post: post,
      img: image,
      vid: video,
      added_by: email,
      title: title,
      date: date
    };

    try {
      const response = await axios.post('http://localhost:5001/api/user/post', containerValue, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 201) {
        console.log('Post created successfully');
        nav('/post')
      } else {
        console.error('Error creating post');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const dateFunc = async () => {
    try {
      const res = await axios.get('http://localhost:5001/api/user/date');
      console.log('Current Date:', res.data.currentDate); 
      setDate(res.data.currentDate);
    } catch (error) {
      console.error('Error fetching date:', error);
    }
  };

  useEffect(() => {
    dateFunc();
  }, []);

  return (
    <div className="bg-orange-200 w-full h-screen">
      <div className="pt-[5%] pl-[25%]">
        <div className="bg-white border border-slate-200 grid grid-cols-6 gap-2 rounded-xl p-2 text-sm h-[570px] w-[70%]">
          <h1 className="text-center text-orange-500 text-xl font-bold col-span-6">
            Post
          </h1>
          <input 
            type="text" 
            placeholder="   Title" 
            onChange={titleChange} 
            className="w-[40%] h-[30px] bg-orange-200 font-bold text-xl text-orange-700 placeholder:text-orange-600 placeholder:opacity-50 border border-slate-200 col-span-6 resize-none outline-none rounded-lg p-2 duration-300 focus:border-orange-600"
          />
          <textarea
            onChange={PostFunc}
            name="post"
            value={post}
            placeholder="What do you want to talk about..."
            className="bg-orange-100 font-bold h-[400px] placeholder:text-orange-600 placeholder:opacity-50 border border-slate-200 col-span-6 resize-none outline-none rounded-lg p-2 duration-300 focus:border-orange-600"
          />
          <button 
            className="fill-slate-600 col-span-1 flex justify-center items-center rounded-lg p-2 duration-300 bg-slate-100 hover:border-slate-600 focus:fill-blue-200 focus:bg-orange-400 border border-slate-200" 
            onClick={() => widgetRef.current.open()}
          >
            <div className="w-full max-w-sm mx-auto">
              <label>
                <svg
                  className="h-8 w-8 ml-9 text-gray-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                <input
                  name="media"
                  value={image}
                  className="custom-file-input hidden"
                />
              </label>
              <h1 className="font-bold text-gray-400">Add Image</h1>
            </div>
          </button>
          <button 
            className="fill-slate-600 col-span-1 flex justify-center items-center rounded-lg p-2 duration-300 bg-slate-100 hover:border-slate-600 focus:fill-blue-200 focus:bg-orange-400 border border-slate-200" 
            onClick={() => widgetRef2.current.open()}
          >
            <label>
              <svg
                className="h-8 w-8 text-gray-500 ml-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <input
                name="doc"
                value={video}
                className="custom-file-input hidden"
              />
              <h1 className="font-bold text-gray-400">Add Video</h1>
            </label>
          </button>
          <span className="col-span-2"></span>
          <button
            onClick={handleClick}
            className="bg-slate-100 stroke-orange-600 border border-orange-200 col-span-2 flex justify-center rounded-lg p-2 duration-300 hover:border-orange-600 hover:text-white focus:stroke-blue-200 focus:bg-orange-400"
          >
            <svg
              fill="none"
              viewBox="0 0 24 24"
              height="30px"
              width="30px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="1.5"
                d="M7.39999 6.32003L15.89 3.49003C19.7 2.22003 21.77 4.30003 20.51 8.11003L17.68 16.6C15.78 22.31 12.66 22.31 10.76 16.6L9.91999 14.08L7.39999 13.24C1.68999 11.34 1.68999 8.23003 7.39999 6.32003Z"
              />
              <path
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="1.5"
                d="M10.11 13.6501L13.69 10.0601"
              />
            </svg>
          </button>
        </div>
      </div>
      <div>
      </div>
    </div>
  );
}
