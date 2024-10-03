"use client";
import { databases } from "@/libs/appwriteConfig";
import React, { useState, useEffect } from "react";
import { ID } from "appwrite";
import fetchMessage from "@/libs/fetchMessage";
import MessageList from "../components/MessageList";

const page = () => {
  const [messages, setMessages] = useState<
    { $id: string; body: string; $createdAt: string }[]
  >([]);
  const [messageBody, setMessageBody] = useState("");

  useEffect(() => {
    getMessages();
  }, []);

  const getMessages = async () => {
    const response = await fetchMessage();
    console.log(response);
    setMessages(
      response.documents as unknown as {
        $id: string;
        body: string;
        $createdAt: string;
      }[]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await databases.createDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_MESSAGES!,
      ID.unique(),
      { body: messageBody }
    );
    setMessageBody("");
    setMessages((prevState) => [
      response as unknown as { $id: string; body: string; $createdAt: string },
      ...prevState,
    ]);
  };

  return (
    <main className="container">
      <div className="room--container">
        <form id="message--form">
          <div>
            <textarea
              name=""
              id=""
              required
              maxLength={1000}
              placeholder="say something..."
              onChange={(e) => {
                setMessageBody(e.target.value);
              }}
              value={messageBody}
            ></textarea>
          </div>
          <div className="send-btn--wrapper">
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-red-800 py-2 px-12 rounded-2xl"
            >
              Send
            </button>
          </div>
        </form>
        <div>
          <MessageList messages={messages} />
        </div>
      </div>
    </main>
  );
};

export default page;
