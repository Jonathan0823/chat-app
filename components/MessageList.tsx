import React from 'react';
import { databases } from '@/libs/appwriteConfig';
import DeleteIcon from '@mui/icons-material/Delete';

interface MessageListProps {
  messages: { $id: string; body: string; $createdAt: string }[];
}

const MessageList = ({ messages }: MessageListProps) => {
  const handleDelete = async (messageId: string) => {
    try {
      await databases.deleteDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID_MESSAGES!,
        messageId
      );
    } catch (error) {
      console.error('Failed to delete message:', error);
    }
  };

  return (
    <div>
      {messages.map((message) => (
        <div key={message.$id} className="message--wrapper">
          <div className="message--header">
            <small>{new Date(message.$createdAt).toLocaleString()}</small>
            <button onClick={() => handleDelete(message.$id)}>
              <DeleteIcon className='delete--btn' />
            </button>
          </div>
          <div className="message--body">
            <span>{message.body}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;