"use client";
import { databases } from '@/libs/appwriteConfig'
import React, {useState, useEffect} from 'react'


const page = () => {
    const [messages, setMessages] = useState<{ $id: string; body: string; $createdAt: string }[]>([])

    useEffect(() => {
        getMessages()
    }, [])

    const getMessages = async () => {
        const response = await databases.listDocuments(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!, process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_MESSAGES!)
        console.log(response);
        setMessages(response.documents as unknown as { $id: string; body: string; $createdAt: string }[])
    }
  return (
   <main className='container'>
    <div className='room--container'>
      <div>
        {messages.map((message) => (
          <div key={message.$id} className='message--wrapper'>

            <div className='message--header'>
              <small>{message.$createdAt}</small>
            </div>

            <div className='message--body'>
              <span>{message.body}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
   </main>
  )
}

export default page