import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";  
import logo from "../assets/querulous.png";

export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5001/api/user/login", { email, password });
      console.log(response);
      if (response.status === 200 && response.data) {
        localStorage.setItem("email", email);
        nav("/home");
        console.log("success");
      }
    } catch (error) {
      alert(error.response ? error.response.data.message : "An error occurred");
      console.log("failed");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="rounded-full h-20 w-20 bg-orange-700 animate-ping"></div>
      </div>
    );
  }

  return (
    <>
      <div className="flex w-full h-full border shadow-md">
        <div className='w-96 relative'>
          <img className="absolute w-72 mt-2" src={logo} alt="Logo" />
        </div>
      </div>
      <div className="flex h-screen">
        <div className="w-1/2 bg-gray-300">
          <div className="top-[11%] absolute left-[6%]">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
              <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10 mt-[10%]">
                <div className="max-w-md mx-auto mt-[10%]">
                  <div className="flex items-center space-x-5 justify-center font-extrabold">
                    QUERULOUS
                  </div>
                  <div className="mt-5">
                    <label className="font-semibold text-sm text-gray-600 pb-1 block">E-mail</label>
                    <input
                      className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                      type="text"
                      id="login"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label className="font-semibold text-sm text-gray-600 pb-1 block">Password</label>
                    <input
                      className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                      type="password"
                      id="password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="text-right mb-4">
                    <Link to="/OTP" className="text-xs font-display font-semibold text-gray-500 hover:text-gray-600 cursor-pointer">Forgot Password?</Link>
                  </div>
                  <div className="flex justify-center w-full items-center">
                    <button
                      className="py-2 px-4 bg-orange-600 hover:bg-orange-700 focus:ring-orange-500 focus:ring-offset-orange-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                      type="submit"
                      onClick={handleLogin}
                    >
                      Log in
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                    <Link to="/SignUp" className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline">or sign up</Link>
                    <span className="w-1/5 border-b dark:border-gray-400 md:w-1/4"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-3/4 bg-orange-400">
          <div className="bg-orange-500 min-h-screen">
            <div className="container w-[80%] ml-[10%]">
              <h1 className="text-4xl font-bold text-white mb-8 ml-[26%] pt-[2%]">Welcome to Querulous</h1>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">Solving Everyday Problems, One Solution at a Time</h2>
                <div className="mb-6">
                  <h3 className="text-xl font-medium mb-2">Why Choose Us?</h3>
                  <p className="text-gray-700">
                    In the hustle and bustle of daily life, we all encounter challenges that can be a bit overwhelming.
                    Whether it's managing time, improving productivity, or simply finding a better way to do something, 
                    the quest for solutions is constant.
                  </p>
                </div>
                <div className="mb-6">
                  <h3 className="text-xl font-medium mb-2">What We Offer</h3>
                  <ul className="list-disc list-inside text-gray-700">
                    <li>Practical Tips & Tricks: Learn from our community of problem-solvers who share their best practices and insights.</li>
                    <li>Curated Resources: Discover a handpicked selection of tools, apps, and resources designed to make your daily tasks easier.</li>
                    <li>Inspiring Stories: Be inspired by real-life stories of individuals who have successfully overcome obstacles in their lives.</li>
                  </ul>
                </div>
                <div className="mb-6">
                  <h3 className="text-xl font-medium mb-2">Join Our Community now</h3>
                  <p className="text-gray-700">
                    Become a part of our growing community of problem-solvers! Share your own tips and tricks, 
                    connect with like-minded individuals, and contribute to a collective knowledge base aimed at making life easier for everyone.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
