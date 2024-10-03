"use client";
import { databases } from "@/libs/appwriteConfig";
import React, { useState, useEffect } from "react";
import { ID } from "appwrite";
import fetchMessage from "@/libs/fetchMessage";
import MessageList from "./components/MessageList";
import MessageInput from "./components/MessageInput";

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
        <div className="flex justify-center ">
        <h1 className="flex justify-center bg-[#db2518] w-52 mb-5 py-4 rounded-2xl">Chat Room</h1>
        </div>
          <MessageInput onMessageSent={getMessages} />
        <div>
          <MessageList messages={messages} onMessageDeleted={getMessages} />
        </div>
      </div>
    </main>
  );
};

export default page;
