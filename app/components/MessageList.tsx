import React from 'react'

interface MessageListProps {
    messages: { $id: string; body: string; $createdAt: string }[]
    }


const MessageList = ({messages}:MessageListProps) => {
  return (
    <div>
        <div>
          {messages.map((message) => (
            <div key={message.$id} className="message--wrapper">
              <div className="message--header">
                <small>{message.$createdAt}</small>
              </div>

              <div className="message--body">
                <span>{message.body}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
  )
}

export default MessageList