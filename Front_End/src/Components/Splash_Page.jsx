import "../index.css";
import logo from "../assets/querulous.png";
import bgimg1 from "../assets/Ai1.png";
import bgimg2 from "../assets/Ai2.png"
import bgimg3 from "../assets/Ai3.png"
import bgimg4 from "../assets/Ai4.png"
import { Link } from "react-router-dom";
import { gsap } from 'gsap';
import { useEffect, useRef } from "react";

export default function Splash_Page() {
  const myfunc1 = useRef(null);
  const myfunc2 = useRef(null);
  const myfunc3 = useRef(null);
  const myfunc4 = useRef(null);
  const myfunc5 = useRef(null);

  useEffect(() => {
    const t = gsap.timeline({ repeat: 2, yoyo: true });
    t.to(myfunc1.current, { x: 400, y: -30, duration: 2.5 }, "=1")
     .to(myfunc2.current, { y: 200, x: -100, duration: 2.5 }, "-=1.25")
     .to(myfunc3.current, { y: -240, x: 20, duration: 2.5 }, "-=1.25")
     .to(myfunc4.current, { x: -360, y: -15, duration: 2.5 }, "-=1.5");
  }, []);

  const splitText = (text) => {
    return text.split('').map((char, index) => (
      <span key={index}>{char}</span>
    ));
  };
  useEffect(() => {
    const letters = myfunc5.current.querySelectorAll('span');
    gsap.to(letters, {
      y: 20,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      repeat: 1,
      yoyo: true
    });
  }, []);
 

  return (
    <>
      <div className="flex w-full h-full border shadow-md">
        <div className='w-96 relative'>
          <img className="absolute w-72 mt-2" src={logo} alt="Logo" />
        </div>
      </div>
      <div className="flex">
        <div className="min-h-screen grid items-center justify-center bg-orange-300 w-1/2 shadow-orange-200">
        <h1 className="text-4xl font-bold text-gray-800 mt-36 ml-11" ref={myfunc5}>
      {splitText("Let's solve problem together")}
    </h1>
          <p className="ml-11 font-semibold text-sky-800">Navigate challenges effortlessly with our intuitive platform. Let's turn obstacles into opportunities together. Dive in and discover a new way to problem-solve!</p>
          <div className="bg-white p-10 rounded-lg shadow-lg w-11/12 h-64 ml-6">
            <h4 className="text-3xl font-bold text-gray-700" >Welcome to Querulous</h4>
            <p className="mt-4 text-lg text-blue-500">Join me, let's tackle challenges hand in hand</p>
            <div className="w-full h-24 flex items-center justify-center cursor-pointer ml-11">
              <Link to="/landingPage">
                <div className="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold shadow text-orange-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 dark:bg-gray-700 dark:text-white dark:hover:text-gray-200 dark:shadow-none group">
                  <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-orange-600 group-hover:h-full"></span>
                  <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" fill="none" className="w-5 h-5 text-blue-400">
                      <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></path>
                    </svg>
                  </span>
                  <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" fill="none" className="w-5 h-5 text-white-400">
                      <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></path>
                    </svg>
                  </span>
                  <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white dark:group-hover:text-gray-200">Get Started</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-3/4 grid grid-cols-2 mt-6">
          <img className="w-[90%] mt-[10%] ml-9" ref={myfunc1} src={bgimg1} alt="" />
          <img className="w-[90%] mt-[10%]" ref={myfunc2} src={bgimg2} alt="" />
          <img className="w-[90%] ml-9 mb-[14%]" ref={myfunc3} src={bgimg3} alt="" />
          <img  className="w-[90%] mb-[14%]" ref={myfunc4} src={bgimg4} alt="" />
        </div>
      </div>
    </>
  );
}
