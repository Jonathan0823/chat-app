"use client";
import React, { useState, useEffect } from "react";
import fetchMessage from "@/libs/fetchMessage";
import MessageList from "../components/MessageList";
import MessageInput from "../components/MessageInput";
import client from "@/libs/appwriteConfig";
import PrivateRoute from "@/components/PrivateRoute";

const page = () => {
  const [messages, setMessages] = useState<
    { $id: string; body: string; $createdAt: string }[]
  >([]);
  const [messageBody, setMessageBody] = useState("");

  useEffect(() => {
    getMessages();

    const unsubscribe = client.subscribe(
      `databases.${process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID}.collections.${process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_MESSAGES}.documents`,
      (response) => {
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.create"
          )
        ) {
          setMessages((prevState) => [
            response.payload as {
              $id: string;
              body: string;
              $createdAt: string;
            },
            ...prevState,
          ]);
        }

        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.delete"
          )
        ) {
          setMessages((prevState) =>
            prevState.filter(
              (message) =>
                message.$id !== (response.payload as { $id: string }).$id
            )
          );
        }
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const getMessages = async () => {
    const response = await fetchMessage();
    setMessages(
      response.documents as unknown as {
        $id: string;
        body: string;
        $createdAt: string;
      }[]
    );
  };

  return (
    <main className="container">
      <div className="room--container">
        <div className="flex justify-center ">
          <h1 className="flex justify-center bg-[#db2518] w-52 mb-5 py-4 rounded-2xl">
            Chat Room
          </h1>
        </div>
        <MessageInput />
        <div>
          <MessageList messages={messages} />
        </div>
      </div>
    </main>
  );
};

export default page;
