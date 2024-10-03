"use client";
import { databases } from '@/libs/appwriteConfig'
import React, {useState, useEffect} from 'react'
import { ID } from 'appwrite';


const page = () => {
    const [messages, setMessages] = useState<{ $id: string; body: string; $createdAt: string }[]>([])
    const [messageBody, setMessageBody] = useState('')

    useEffect(() => {
        getMessages()
    }, [])

    const getMessages = async () => {
        const response = await databases.listDocuments(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!, process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_MESSAGES!)
        console.log(response);
        setMessages(response.documents as unknown as { $id: string; body: string; $createdAt: string }[])
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const response = await databases.createDocument(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!, process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_MESSAGES!, ID.unique(), {body: messageBody})
        setMessageBody('')
        console.log(response);
        getMessages()
    }

  return (
   <main className='container'>
    <div className='room--container'>
      <form id='message--form'>
        <div>
          <textarea name="" id="" required maxLength={1000} placeholder='say something...' onChange={(e) => {setMessageBody(e.target.value)}} value={messageBody}></textarea>
        </div>
        <div className='send-btn--wrapper'>
          <button type='submit' onClick={handleSubmit} className='bg-red-800 py-2 px-12 rounded-2xl'>Send</button>
        </div>
      </form>
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