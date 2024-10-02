"use client";
import { databases } from '@/libs/appwriteConfig'
import React, {useState, useEffect} from 'react'


const page = () => {
    const [messages, setMessages] = useState<{ $id: string; body: string }[]>([])

    useEffect(() => {
        getMessages()
    }, [])

    const getMessages = async () => {
        const response = await databases.listDocuments(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!, process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_MESSAGES!)
        console.log(response);
        setMessages(response.documents as unknown as { $id: string; body: string }[])
    }
  return (
    <div>
      <div>
        {messages.map((message: any) => (
          <div key={message.$id}>
              <div>
                <span>{message.body}</span>
              </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default page