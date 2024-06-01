import React, { useEffect, useState } from "react";
import { reduceImageSize } from "./reduceImage";
import TextRecognition from "./TextRecognition";
const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [size, setSize] = useState({ width: "", height: "" });
  const handleImageUpload = (event) => {
    const image = event.target.files[0];
    setSelectedImage(URL.createObjectURL(image));
  };

  useEffect(() => {
    if (!selectedImage) return;

    const resizeImage = async (imageUrl) => {
      try {
        const { convertedWidth, convertedHeight } =
          await reduceImageSize(imageUrl);
        setSelectedImage(selectedImage);
        setSize({ width: convertedWidth, height: convertedHeight });
      } catch (error) {
        console.error("Error resizing image:", error);
      }
    };

    resizeImage(selectedImage);
  }, [selectedImage]);

  return (
    <>
      <div>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {selectedImage && (
          <div>
            <img
              src={selectedImage}
              alt="Selected"
              style={{
                maxWidth: `${size.width}px`,
                maxHeight: `${size.height}px`,
              }}
            />
          </div>
        )}
      </div>
      <div>
        <TextRecognition selectedImage={selectedImage} />
      </div>
    </>
  );
};
export default ImageUploader;
