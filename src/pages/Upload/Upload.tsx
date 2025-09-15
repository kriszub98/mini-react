import React, { useState } from "react";
import ImageUploader from "./ImageUploader";

const UploadPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    await fetch("https://twoj-serwer.com/upload", {
      method: "POST",
      body: formData,
    });

    alert("Plik wysłany!");
  };

  return (
    <div>
      <h1>Prześlij swoje zdjęcie</h1>
      <ImageUploader onFileSelect={(file) => setSelectedFile(file)} />
      <button onClick={handleUpload} disabled={!selectedFile}>
        Wyślij
      </button>
    </div>
  );
};

export default UploadPage;
