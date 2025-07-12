'use client'

import { FormEvent, useRef, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function App() {
  const messages = useQuery(api.messages.list) || [];

  const [newMessageText, setNewMessageText] = useState("");
  const sendMessage = useMutation(api.messages.sendMessage);

  const [name] = useState(() => "User " + Math.floor(Math.random() * 10000));
  async function handleSendMessage(event: FormEvent) {
    event.preventDefault();
    if (newMessageText) {
      await sendMessage({ body: newMessageText, author: name });
    }
    setNewMessageText("");
  }

  const generateUploadUrl = useMutation(api.messages.generateUploadUrl);
  const sendImage = useMutation(api.messages.sendImage);

  const imageInput = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  async function handleSendImage(event: FormEvent) {
  event.preventDefault();
  
  if (!selectedImage) {
    alert("Please select an image first");
    return;
  }

  try {
    const postUrl = await generateUploadUrl();
    console.log("Upload URL:", postUrl);

    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": selectedImage.type },
      body: selectedImage,
    });

    console.log("Upload result:", result);

    if (!result.ok) {
      const error = await result.text();
      throw new Error(`Upload failed: ${error}`);
    }

    const { storageId } = await result.json();
    console.log("Storage ID:", storageId);

    await sendImage({ storageId, author: name });
    alert("Image uploaded successfully!");
    
    setSelectedImage(null);
    if (imageInput.current) imageInput.current.value = "";
  } catch (error) {
    console.error("Upload error:", error);
    alert(`Error: ${error instanceof Error ? error.message : String(error)}`);
  }
}

  return (
    <main>
      <h1>Convex Chat</h1>
      <p className="badge">
        <span>{name}</span>
      </p>
      <ul>
        {messages.map((message) => (
          <li key={message._id}>
            <span>{message.author}:</span>
            {message.format === "image" ? (
              <Image message={message} />
            ) : (
              <span>{message.body}</span>
            )}
            <span>{new Date(message._creationTime).toLocaleTimeString()}</span>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSendMessage}>
        <input
          value={newMessageText}
          onChange={(event) => setNewMessageText(event.target.value)}
          placeholder="Write a message…"
        />
        <input type="submit" value="Send" disabled={!newMessageText} />
      </form>
      <form onSubmit={handleSendImage}>
        <input
          type="file"
          accept="image/*"
          ref={imageInput}
          onChange={(event) => setSelectedImage(event.target.files![0])}
          className="ms-2 btn btn-primary"
          disabled={selectedImage !== null}
        />
        <input
          type="submit"
          value="Send Image"
          disabled={selectedImage === null}
        />
      </form>
    </main>
  );
}

function Image({ message }: { message: { url?: string | null } }) {
  if (!message.url) return null; // or some fallback UI
  return <img src={message.url} height="300px" width="auto" />;
}