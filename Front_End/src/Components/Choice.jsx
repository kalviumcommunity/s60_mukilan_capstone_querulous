import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { gsap } from "gsap";

export default function ChoicePage() {
  const topics = [
    { label: "Financial Issues", color: "bg-orange-700", id: 0 },
    { label: "Health Concerns", color: "bg-red-500", id: 1 },
    { label: "Employment", color: "bg-green-500", id: 2 },
    { label: "Housing", color: "bg-purple-500", id: 3 },
    { label: "Relationships", color: "bg-sky-500", id: 4 },
    { label: "Education", color: "bg-pink-500", id: 5 },
    { label: "Addiction", color: "bg-blue-700", id: 6 },
    { label: "Legal Issues", color: "bg-orange-600", id: 7 },
    { label: "Transportation", color: "bg-green-600", id: 8 },
    { label: "Safety Concerns", color: "bg-yellow-300", id: 9 },
    { label: "Caregiving", color: "bg-red-300", id: 10 },
    { label: "Time Management", color: "bg-sky-700", id: 11 },
    { label: "Environmental Concerns", color: "bg-pink-700", id: 12 },
    { label: "Technology Challenges", color: "bg-sky-300", id: 13 },
    { label: "Isolation", color: "bg-yellow-600", id: 14 },
  ];

  const TopicCard = ({ topic, id, handleClick, isSelected }) => (
    <div
      className={`h-32 ${isSelected ? `${topic.color}` : 'bg-orange-400'} border-black border-4 rounded-lg flex justify-center items-center transform hover:scale-105 transition-transform duration-300`}
      onClick={() => handleClick(id, topic.label)}
    >
      <h1 className="text-white text-1xl font-semibold">{topic.label}</h1>
    </div>
  );

  const [selectedTopics, setSelectedTopics] = useState([]);
  const topicRefs = useRef([]);

  const handleClick = (id, name) => {
    if (selectedTopics.includes(name)) {
      setSelectedTopics((prev) => prev.filter((topic) => topic !== name));
    } else {
      setSelectedTopics((prev) => [...prev, name]);
    }
  };

  console.log(selectedTopics);

  const handleClickon = async () => {
    try {
      const response = await axios.post("http://localhost:5001/api/user/choice", {
        email: localStorage.getItem("email"),
        data: selectedTopics,
      });
      if (response.status === 200 && response.data.message === "Successfully saved user's choice") {
        alert("Success");
        console.log("Success");
      }
    } catch (error) {
      console.error(error);
      alert("Error saving user's choice");
    }
  };

  useEffect(() => {
    gsap.fromTo(
      topicRefs.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out", stagger: 0.1 }
    );
  }, []);

  useEffect(() => {
    gsap.fromTo(
      '.header',
      { x: '-100%', opacity: 0 },
      { x: '0%', opacity: 1, duration: 1, ease: 'power4.out' }
    );
  }, []);

  return (
    <>
      <div className="h-screen flex">
        <div className="w-full h-[146%] bg-orange-100 shadow-lg">
          <div className="bg-orange-500 text-white text-center py-7 px-20 rounded-lg shadow-xl mb-8 mt-5 header">
            <h1 className="text-3xl font-bold">Choose Your Topic</h1>
            <p className="text-lg mt-2">What Are You feel trouble or aware of it?</p>
          </div>

          <div className="grid grid-cols-3 gap-6 w-4/5 mx-auto">
            {topics.map((topic, index) => (
              <div ref={(el) => (topicRefs.current[index] = el)} key={topic.id}>
                <TopicCard
                  topic={topic}
                  id={topic.id}
                  handleClick={handleClick}
                  isSelected={selectedTopics.includes(topic.label)}
                />
              </div>
            ))}
          </div>
          <Link to="/home">
            <div className="relative inline-flex items-center justify-start ml-[80%] mt-[3%] py-4 pl-7 pr-12 overflow-hidden font-semibold shadow text-orange-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 dark:bg-gray-700 dark:text-white dark:hover:text-gray-200 dark:shadow-none group">
              <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-orange-600 group-hover:h-full"></span>
              <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  fill="none"
                  className="w-5 h-5 text-blue-400"
                >
                  <path
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  ></path>
                </svg>
              </span>
              <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  fill="none"
                  className="w-5 h-5 text-white-400"
                >
                  <path
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  ></path>
                </svg>
              </span>
              <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white dark:group-hover:text-gray-200 " onClick={handleClickon}>
                Get Started
              </span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
