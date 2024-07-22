import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';

function ChangePass() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const email = localStorage.getItem('email');
  const navigate = useNavigate();
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  useEffect(() => {
    gsap.from([passwordRef.current, confirmPasswordRef.current], {
      opacity: 0,
      y: 20,
      stagger: 0.4,
      duration: 1,
      ease: 'power3.in'
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    } else if (!password.trim() || !confirmPassword.trim()) {
      alert('Please provide valid passwords');
      return;
    }

    try {
      const response = await axios.put('http://localhost:5001/api/user/reset', { email, password, confirmPassword });
      alert(response.data.message);
      navigate('/home');
    } catch (error) {
      alert('Error resetting password');
    }
  };

  useEffect(()=>{
    gsap.fromTo("#ingo", { x: '-100%', opacity: 0 },
     { x: '0%', opacity: 1, duration: 1, ease: 'power4.out' })
   },[])
  return (
    <div className="w-full h-screen bg-no-repeat bg-cover bg-[url('./assets/BG.png')]">
      <section>
        <div className="bg-white absolute items-center w-1/2 px-5 py-12 mx-auto md:px-12 lg:px-20 max-w-7xl ml-[25%] top-[20%] border-r-8 rounded-2xl" id='ingo'>
          <div className="w-full max-w-md mx-auto md:max-w-sm md:px-0 md:w-96 sm:px-4">
            <div className="flex flex-col">
              <h2 className="text-4xl text-black">Reset Password</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <input
                type="hidden"
                name="_redirect"
                value="https://jamstacker.studio/thankyou"
              />
              <div className="mt-4 space-y-6">
                <div className="col-span-full">
                  <label className="block mb-3 text-sm font-medium text-gray-600">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="******"
                    className="block w-full px-6 py-3 text-black bg-white border border-black rounded-full appearance-none placeholder:text-gray-400 focus:border-orange-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                    ref={passwordRef} 
                  />
                </div>
                <div className="col-span-full">
                  <label className="block mb-3 text-sm font-medium text-gray-600">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="******"
                    className="block w-full px-6 py-3 text-black bg-white border border-black rounded-full appearance-none placeholder:text-gray-400 focus:border-orange-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                    ref={confirmPasswordRef}
                  />
                </div>
                <div className="col-span-full">
                  <button
                    type="submit"
                    className="items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-orange-600 border-2 border-black rounded-full inline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black"
                  >
                    Submit Your Request
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ChangePass;
