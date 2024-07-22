import { useRef, useEffect } from "react";

const UploadWidget = () => {
  const cloudinary = useRef();
  const widgetRef = useRef();

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
          console.log("Upload result:", result);
        }
      }
    );
  }, []);

  return (
    <button onClick={() => widgetRef.current.open()}>
      Upload
    </button>
  );
};

export default UploadWidget;
