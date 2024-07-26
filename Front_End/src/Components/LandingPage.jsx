import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";  
import logo from "../assets/querulous.png";
import { useNavigate } from "react-router-dom";
// import Fire from "./Firebase";
import { initializeApp } from 'firebase/app';
import 'firebase/firestore';
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth';
export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav=useNavigate();
  // const userEmail = localStorage.getItem("email")
  // console.log(userEmail)
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
      console.log(response)
      if (response.status === 200 && response.data) {
        localStorage.setItem("email",email)
        nav("/home")
        console.log("success");
      }
    } catch (error) {
      alert(error.response ? error.response.data.message : "An error occurred");
      console.log("failed");
    }
  };
  

  if (isLoading) {
    return (
      <>
        <div className="flex justify-center items-center h-screen">
          <div className="rounded-full h-20 w-20 bg-orange-700 animate-ping"></div>
        </div>
      </>
    );
  }


const firebaseConfig = {
    apiKey: "AIzaSyBmE0qlNTqCb31URcrHj3q4hKGfulsE69Y",
    authDomain: "querulous-5a08f.firebaseapp.com",
    projectId: "querulous-5a08f",
    storageBucket: "querulous-5a08f.appspot.com",
    messagingSenderId: "405949316971",
    appId: "1:405949316971:web:f208e18ec2bea87943162e",
    measurementId: "G-QZP3KTJ82D"
};


const app=initializeApp(firebaseConfig)
//  const firestore = firebase.firestore();
const auth = getAuth()
const provider=new GoogleAuthProvider()
function sign(){
signInWithPopup(auth,provider).then((res)=>{
    console.log(res.user.email)
    axios.post("http://localhost:5001/api/user/verification",{email:res.user.email}).then((reso)=>{
      console.log(reso.data.message)
      if(reso.data.message==="Successfully email is checked"){
        localStorage.setItem("email",res.user.email)
        nav("/home")
      }
      else if(reso.data.message==="Invalid Email") {
        alert(reso.data.message)
      }
    }).catch((er)=>{
      console.log(er.message)
    })

})
}
 

  return (
    <>
      <div className="flex w-full h-full border shadow-md">
    <div className='w-96 relative'>
        <img className="absolute w-72 mt-2" src={logo} alt="Logo" />
    </div>
</div>
    <div className="flex h-screen">
        <div className="w-1/2  bg-gray-300 ">
            <div className="top-[11%] absolute left-[6%]">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
  <div
    className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10 mt-[10%]"
  >
    <div className="max-w-md mx-auto mt-[10%]">
      <div className="flex items-center space-x-5 justify-center font-extrabold">
        QUERULOUS
      </div>
      <div className="mt-5">
        <label
          className="font-semibold text-sm text-gray-600 pb-1 block"
          
          >E-mail</label
        >
        <input
          className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
          type="text"
          id="login"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label
          className="font-semibold text-sm text-gray-600 pb-1 block"
         
          >Password</label
        >
        <input
          className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="text-right mb-4">
        <Link to="/OTP"><a
          className="text-xs font-display font-semibold text-gray-500 hover:text-gray-600 cursor-pointer"
          href="#"
        >
          Forgot Password?
        </a></Link>
      </div>
      <div className="flex justify-center w-full items-center">
        <div>
          <button
            className="flex items-center justify-center py-2 px-20 bg-white hover:bg-gray-200 focus:ring-blue-500 focus:ring-offset-blue-200 text-gray-700 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg" onClick={sign}
          >
            <svg
              viewBox="0 0 24 24"
              height="25"
              width="25"
              y="0px"
              x="0px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12,5c1.6167603,0,3.1012573,0.5535278,4.2863159,1.4740601l3.637146-3.4699707 C17.8087769,1.1399536,15.0406494,0,12,0C7.392395,0,3.3966675,2.5999146,1.3858032,6.4098511l4.0444336,3.1929321 C6.4099731,6.9193726,8.977478,5,12,5z"
                fill="#F44336"
              ></path>
              <path
                d="M23.8960571,13.5018311C23.9585571,13.0101929,24,12.508667,24,12 c0-0.8578491-0.093689-1.6931763-0.2647705-2.5H12v5h6.4862061c-0.5247192,1.3637695-1.4589844,2.5177612-2.6481934,3.319458 l4.0594482,3.204834C22.0493774,19.135437,23.5219727,16.4903564,23.8960571,13.5018311z"
                fill="#2196F3"
              ></path>
              <path
                d="M5,12c0-0.8434448,0.1568604-1.6483765,0.4302368-2.3972168L1.3858032,6.4098511 C0.5043335,8.0800171,0,9.9801636,0,12c0,1.9972534,0.4950562,3.8763428,1.3582153,5.532959l4.0495605-3.1970215 C5.1484375,13.6044312,5,12.8204346,5,12z"
                fill="#FFC107"
              ></path>
              <path
                d="M12,19c-3.0455322,0-5.6295776-1.9484863-6.5922241-4.6640625L1.3582153,17.532959 C3.3592529,21.3734741,7.369812,24,12,24c3.027771,0,5.7887573-1.1248169,7.8974609-2.975708l-4.0594482-3.204834 C14.7412109,18.5588989,13.4284058,19,12,19z"
                fill="#00B060"
              ></path>
              <path
                opacity=".1"
                d="M12,23.75c-3.5316772,0-6.7072754-1.4571533-8.9524536-3.7786865C5.2453613,22.4378052,8.4364624,24,12,24 c3.5305786,0,6.6952515-1.5313721,8.8881226-3.9592285C18.6495972,22.324646,15.4981079,23.75,12,23.75z"
              ></path>
              <polygon
                opacity=".1"
                points="12,14.25 12,14.5 18.4862061,14.5 18.587492,14.25"
              ></polygon>
              <path
                d="M23.9944458,12.1470337C23.9952393,12.0977783,24,12.0493774,24,12 c0-0.0139771-0.0021973-0.0274658-0.0022583-0.0414429C23.9970703,12.0215454,23.9938965,12.0838013,23.9944458,12.1470337z"
                fill="#E6E6E6"
              ></path>
              <path
                opacity=".2"
                d="M12,9.5v0.25h11.7855721c-0.0157471-0.0825195-0.0329475-0.1680908-0.0503426-0.25H12z"
                fill="#FFF"
              ></path>
              <linearGradient
                gradientUnits="userSpaceOnUse"
                y2="12"
                y1="12"
                x2="24"
                x1="0"
                id="LxT-gk5MfRc1Gl_4XsNKba_xoyhGXWmHnqX_gr1"
              >
                <stop stop-opacity=".2" stop-color="#fff" offset="0"></stop>
                <stop stop-opacity="0" stop-color="#fff" offset="1"></stop>
              </linearGradient>
              <path
                d="M23.7352295,9.5H12v5h6.4862061C17.4775391,17.121582,14.9771729,19,12,19 c-3.8659668,0-7-3.1340332-7-7c0-3.8660278,3.1340332-7,7-7c1.4018555,0,2.6939087,0.4306641,3.7885132,1.140686 c0.1675415,0.1088867,0.3403931,0.2111206,0.4978027,0.333374l3.637146-3.4699707L19.8414307,2.940979 C17.7369385,1.1170654,15.00354,0,12,0C5.3725586,0,0,5.3725586,0,12c0,6.6273804,5.3725586,12,12,12 c6.1176758,0,11.1554565-4.5812378,11.8960571-10.4981689C23.9585571,13.0101929,24,12.508667,24,12 C24,11.1421509,23.906311,10.3068237,23.7352295,9.5z"
                fill="url(#LxT-gk5MfRc1Gl_4XsNKba_xoyhGXWmHnqX_gr1)"
              ></path>
              <path
                opacity=".1"
                d="M15.7885132,5.890686C14.6939087,5.1806641,13.4018555,4.75,12,4.75c-3.8659668,0-7,3.1339722-7,7 c0,0.0421753,0.0005674,0.0751343,0.0012999,0.1171875C5.0687437,8.0595093,8.1762085,5,12,5 c1.4018555,0,2.6939087,0.4306641,3.7885132,1.140686c0.1675415,0.1088867,0.3403931,0.2111206,0.4978027,0.333374 l3.637146-3.4699707l-3.637146,3.2199707C16.1289062,6.1018066,15.9560547,5.9995728,15.7885132,5.890686z"
              ></path>
              <path
                opacity=".2"
                d="M12,0.25c2.9750366,0,5.6829224,1.0983887,7.7792969,2.8916016l0.144165-0.1375122 l-0.110014-0.0958166C17.7089558,1.0843592,15.00354,0,12,0C5.3725586,0,0,5.3725586,0,12 c0,0.0421753,0.0058594,0.0828857,0.0062866,0.125C0.0740356,5.5558472,5.4147339,0.25,12,0.25z"
                fill="#FFF"
              ></path>
            </svg>
            <span className="ml-2">Sign in with Google</span>
          </button>

        </div>
      </div>
      <div className="mt-5">
        <button
          className="py-2 px-4 bg-orange-600 hover:bg-orange-700 focus:ring-orange-500 focus:ring-offset-orange-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
          type="submit" onClick={handleLogin}
        >
          Log in
        </button>
      </div>
      <div className="flex items-center justify-between mt-4">
        <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
        <Link to="/SignUp"><a
          className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
          href="#"
          >or sign up</a
        ></Link>
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