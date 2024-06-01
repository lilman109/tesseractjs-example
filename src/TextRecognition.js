import React, { useEffect, useState } from "react";
import { createWorker } from "tesseract.js";
const TextRecognition = ({ selectedImage }) => {
  const [recognizedText, setRecognizedText] = useState("");
  const [allText, setAllText] = useState("");
  const [keyword, setkeyword] = useState("");
  useEffect(() => {
    const recognizeText = async () => {
      if (!selectedImage) return;

      const worker = await createWorker(["eng", "jpn"]);

      try {
        const {
          data: { text },
        } = await worker.recognize(selectedImage);

        setAllText(text);
      } catch (error) {
        console.error("Error recognizing text:", error);
      } finally {
        await worker.terminate();
      }
    };

    recognizeText();
  }, [selectedImage]);

  const onClick = () => {
    if (!allText) return;

    const lines = allText.split("\n").map((line) => line.trim());
    if (lines === -1) {
      setRecognizedText("Keyword not found");
    } else {
      const lineIndex = lines.findIndex((line) => line.includes(keyword));

      // If the keyword is found, set the recognized text to the whole line
      if (lineIndex !== -1) {
        setRecognizedText(lines[lineIndex]);
      } else {
        setRecognizedText(`Keyword "${keyword}" not found in the image`);
      }
    }
  };

  return (
    <>
      <div>
        <h2>All texts:</h2>
        <p>{allText}</p>
      </div>

      <div>
        <h2>
          Keyword:
          <input
            type="text"
            value={keyword}
            onChange={(e) => setkeyword(e.target.value)}
          />
          <button onClick={onClick}>Enter</button>
        </h2>
        <p>{recognizedText}</p>
      </div>
    </>
  );
};
export default TextRecognition;
