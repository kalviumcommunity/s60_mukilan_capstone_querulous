import { useState } from 'react';

export default function Connected() {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
  };

  return (
    <div className="bg-orange-300 w-full h-screen flex justify-center items-center">
      {!isClicked ? (
        <button
          onClick={handleClick}
          className="flex overflow-hidden ring-[5px] ring-white w-[5.1rem] hover:w-[6.5rem] items-center gap-2 cursor-pointer bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white px-5 py-2 rounded-full transition-all ease-in-out hover:scale-105 font-[revert] active:scale-100 shadow-lg"
        >
          Click
          <svg
            className="size-6 mt-0.5"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672Zm-7.518-.267A8.25 8.25 0 1 1 20.25 10.5M8.288 14.212A5.25 5.25 0 1 1 17.25 10.5"
              strokeLinejoin="round"
              strokeLinecap="round"
            ></path>
          </svg>
        </button>
      ) : (
        <div className="flex flex-row gap-2">
          <div className="animate-pulse bg-gray-300 w-14 h-14 rounded-lg"></div>
          <div className="flex flex-col gap-2">
            <div className="animate-pulse bg-gray-300 w-28 h-5 rounded-lg"></div>
            <div className="animate-pulse bg-gray-300 w-36 h-3 rounded-lg"></div>
            <div className="animate-pulse bg-gray-300 w-36 h-2 rounded-lg"></div>
          </div>
        </div>
      )}
    </div>
  );
}
