import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function PostPage() {
  localStorage.getItem("email");
  const [posts, setPosts] = useState([]);
  const [showImage, setShowImage] = useState([]);
  const [expandedContent, setExpandedContent] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    const checkEmail = async () => {
      try {
        const res = await axios.get(`https://s60-mukilan-capstone-querulous-1.onrender.com/api/posts/logedinuserpost`, {withCredentials: true});
        if (res.data.posts.length > 0) {
          setPosts(res.data.posts);
          setShowImage(Array(res.data.posts.length).fill(false));
          setExpandedContent(Array(res.data.posts.length).fill(false));
        }
      } catch (error) {
        console.error("Error checking email:", error);
      }
    };

    checkEmail();
  }, []);

  console.log("posts:",posts);

  const handleArrowClick = (index) => {
    const newShowImage = [...showImage];
    newShowImage[index] = !newShowImage[index];
    setShowImage(newShowImage);
  };

  const handleReadMoreClick = (index) => {
    const newExpandedContent = [...expandedContent];
    newExpandedContent[index] = !newExpandedContent[index];
    setExpandedContent(newExpandedContent);
  };

  const handleDelete = async (postId) => {
    try {
      const res = await axios.delete(`https://s60-mukilan-capstone-querulous-1.onrender.com/api/posts/posts/${postId}`, {withCredentials: true});
      setPosts(res.data.posts);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleEdit = (id) => {
    nav(`/editPost/${id}`);
  };

  return (
    <div className="w-full h-screen flex">
      <div className="bg-slate-50 w-full h-[1200px]">
        <div className="pt-[3%] pl-[10%]">
          <div className="w-[15%] p-2 rounded-lg shadow-lg bg-slate-400 hover:bg-blue-400">
            <Link to="/add">
              <div className="flex justify-between items-center mb-4 mt-2">
                <h1 className="text-xl font-bold text-cyan-50">
                  Add your Posts:
                </h1>
                <button
                  title="Add New"
                  className="group cursor-pointer outline-none hover:rotate-90 duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50px"
                    height="50px"
                    viewBox="0 0 24 24"
                    className="stroke-orange-500 fill-none group-hover:fill-orange-800 group-active:stroke-orange-200 group-active:fill-orange-600 group-active:duration-0 duration-300"
                  >
                    <path
                      d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                      strokeWidth="1.5"
                    ></path>
                    <path d="M8 12H16" strokeWidth="1.5"></path>
                    <path d="M12 16V8" strokeWidth="1.5"></path>
                  </svg>
                </button>
              </div>
            </Link>
          </div>
          <div>
            <h2 className="text-2xl font-bold mt-[5%]">Your Posts:</h2>
            {posts.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post, index) => (
                  <div
                    key={index}
                    className="bg-white border rounded-lg shadow-md overflow-hidden"
                  >
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-2">
                        {post.title}
                      </h3>
                      <div className="flex flex-col space-y-2 mb-4">
                        {post.hasVid ? (
                          <>
                            <video className="w-full" src={post.vid} controls />
                            {post.hasImg && (
                              <>
                                <button
                                  className="mt-2 text-blue-500 hover:underline"
                                  onClick={() => handleArrowClick(index)}
                                >
                                  {showImage[index]
                                    ? "Hide Image"
                                    : "Show Image"}
                                </button>
                                {showImage[index] && (
                                  <img
                                    className="w-full h-60 object-cover mt-2"
                                    src={post.img}
                                    alt=""
                                  />
                                )}
                              </>
                            )}
                          </>
                        ) : (
                          post.hasImg && (
                            <img
                              className="w-full h-60 object-cover"
                              src={post.img}
                              alt=""
                            />
                          )
                        )}
                      </div>
                      <p className="text-gray-700 mb-4">
                        {expandedContent[index]
                          ? post.post
                          : `${post.post.slice(0, 100)}...`}
                      </p>
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-500">{post.date}</p>
                        <button
                          className="text-blue-500 hover:underline"
                          onClick={() => handleReadMoreClick(index)}
                        >
                          {expandedContent[index] ? "Read less" : "Read more"}
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <button
                        onClick={() => handleEdit(post._id)}
                        className="cursor-pointer transition-all bg-blue-500 text-white px-6 py-2 rounded-lg ml-5 mb-5 border-blue-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(post._id)}
                        className="cursor-pointer transition-all bg-orange-500 text-white px-6 py-2 mr-5 mb-5 rounded-lg border-orange-600 border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="font-semibold text-orange-600 text-xl mt-5">
                No posts found...
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
