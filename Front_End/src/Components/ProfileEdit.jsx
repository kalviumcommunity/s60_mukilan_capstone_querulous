import axios from "axios";
import { useState } from "react";

function ProfileEdit() {
  const [data, setData] = useState({
    fullName: "",
    location: "",
    age: "",
    professional: "",
    workingAt: "",
    about: "",
    profileImage: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  const emailId = localStorage.getItem("email");
 console.log(emailId);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const response = await axios.post('https://api.cloudinary.com/v1_1/dioirlnnn/image/upload', {
          file: e.target.result,
          upload_preset: "hhzfw36i"
        });
        console.log(response.data.secure_url)
        setData((prevData) => ({
          ...prevData,
          profileImage: response.data.secure_url
        }));
      } catch (error) {
        console.log("error", error);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit =  (e) => {
    e.preventDefault();
        setTimeout(async()=>{
            try {
                    const res = await axios.post("http://localhost:5001/api/user/edit", {
                        email: emailId,
                        data: {
                          fullname: data.fullName, 
                          location: data.location,
                          age: data.age,
                          professional: data.professional,
                          workingAt: data.workingAt,
                          profileImage: data.profileImage 
                        }
                      });
                      console.log(res);
                
                } catch (error) {
                  console.log(error);
                }
        },2000)
  };
  
  

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen dark bg-[url('./assets/BG.png')]">
        <div className="w-full max-w-md bg-gray-200 rounded-lg shadow-md p-6 border border-orange-700 border-4">
          <h2 className="text-2xl font-bold text-black mb-4">Edit your details</h2>

          <form className="flex flex-col" onSubmit={handleSubmit}>
            <input
              name="fullName"
              placeholder="Full Name"
              value={data.fullName}
              onChange={handleChange}
              className="text-gray-200 bg-gray-700 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="text"
            />
            <input
              name="location"
              placeholder="Location (City/State)"
              value={data.location}
              onChange={handleChange}
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="text"
            />
            <input
              name="age"
              placeholder="Age"
              value={data.age}
              onChange={handleChange}
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="number"
            />
            <input
              name="professional"
              placeholder="Professional"
              value={data.professional}
              onChange={handleChange}
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="text"
            />
            <input
              name="workingAt"
              placeholder="Working At"
              value={data.workingAt}
              onChange={handleChange}
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="text"
            />
            <textarea
              name="about"
              placeholder="About"
              value={data.about}
              onChange={handleChange}
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            ></textarea>
            <label>Profile Image:</label>
            <input
              name="profileImage"
              placeholder="Profile Image"
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="file"
              onChange={handleImageChange}
            />

            <button
              className="bg-gradient-to-r from-orange-500 to-orange-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-orange-600 hover:to-orange-600 transition ease-in-out duration-150"
              type="submit"
            >
              Edit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
export default ProfileEdit;