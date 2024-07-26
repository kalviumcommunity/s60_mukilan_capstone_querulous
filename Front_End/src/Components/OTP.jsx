import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { gsap } from 'gsap';
export default function OTP() {
    const [isLoading, setIsLoading] = useState(true);
    const [email, setEmail] = useState("");
    const [data, setData] = useState(Array(4).fill(""));
    const [otp, setOtp] = useState("");
    const nav = useNavigate();
    const formRef = useRef(null);
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000);
  
        return () => {
            clearTimeout(timer);
        };
    }, []);

    useEffect(() => {
        if (!isLoading) {
            gsap.fromTo(formRef.current,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
            );
        }
    }, [isLoading]);

    const handleClick = async () => {
        try {
            const response = await axios.post("http://localhost:5001/api/user/otp", { email });
            console.log("OTP response:", response.data);
            if (response.status === 200 && response.data.message === "OTP sent successfully") {
                setOtp(response.data.data.toString());
            }
        } catch (error) {
            alert(error.response ? error.response.data.message : "An error occurred");
        }
    };

    const handleInputChange = (index, value) => {
        const newData = [...data];
        newData[index] = value;
        setData(newData);
    };
    localStorage.setItem("email",email)
    const HandleReact = (e) => {
        e.preventDefault();
        const enteredOtp = data.join('');
        

        if (otp === enteredOtp) {
            nav("/rec");
        } else {
            alert("Wrong OTP");
            setData(Array(4).fill(""));
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
        <div className="relative flex w-full h-screen flex-col justify-center bg-no-repeat bg-cover bg-[url('./assets/BG.png')]">
            <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl" ref={formRef}>
                <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
                    <div className="flex flex-col items-center justify-center text-center space-y-2">
                        <div className="font-semibold text-3xl">
                            <p>Email Verification</p>
                        </div>
                        <div className="flex flex-row text-sm font-medium text-gray-400">
                            <p>We have sent a code to your email </p>
                        </div>
                    </div> 
                    <div className="p-4 bg-orange-50 rounded-md shadow-md flex justify-between">
                        <label className="block text-orange-600 font-bold mb-2 mt-2 ml-2">Email:</label>
                        <input className="border border-orange-500 focus:border-orange-600 rounded-md w-3/4 px-3 py-2 ml-10" type="text" onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email"/>
                        <button type="button" className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800 ml-10" onClick={handleClick}>
                            <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                            </svg>
                            <span className="sr-only">Icon description</span>
                        </button>
                    </div>
                    
                    <div>
                        <form action="" method="post">
                            <div className="flex flex-col space-y-16">
                                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs space-x-4">
                                    {[0, 1, 2, 3].map((_, index) => (
                                        <div key={index} className="w-16 h-16">
                                            <input
                                                className="w-full h-full flex items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-500 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-orange-600"
                                                type="text"
                                                maxLength="1"
                                                value={data[index]}
                                                onChange={(e) => handleInputChange(index, e.target.value)}
                                            />
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-col space-y-5">
                                    <div>
                                        <button
                                            type="submit"
                                            className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-orange-600 border-none text-white text-sm shadow-sm" onClick={HandleReact}
                                        >
                                            Verify Account
                                        </button>
                                    </div>

                                    <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                                        <p>Didn't receive code?</p>
                                        <a
                                            href="http://"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex flex-row items-center text-orange-700"
                                        >
                                            Resend
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
