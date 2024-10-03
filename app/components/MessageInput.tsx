"use client";
import { databases } from '@/libs/appwriteConfig';
import { ID } from 'appwrite';
import { on } from 'events';
import React from 'react'

interface MessageInputProps {
    onMessageSent: () => void;
}

const MessageInput = ({onMessageSent}: MessageInputProps) => {
    const [message, setMessage] = React.useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await databases.createDocument(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
          process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_MESSAGES!,
          ID.unique(),
          { body: message }
        );
        console.log(response);
        setMessage("");
        onMessageSent();
    }
  return (
    <div>
        <form id="message--form" onSubmit={handleSubmit}>
            <div>
            <textarea
                name=""
                id=""
                required
                maxLength={1000}
                placeholder="say something..."
                onChange={(e) => {
                setMessage(e.target.value);
                }}
                value={message}
            ></textarea>
            </div>
            <button type="submit" >Send</button>
        </form>
    </div>
  )
}

export default MessageInput