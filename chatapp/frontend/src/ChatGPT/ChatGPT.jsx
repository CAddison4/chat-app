import React, { useState } from 'react';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';

const ChatGPT = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <div className="flex min-h-screen">
      <div className="w-1/4 p-4 border-r">
        <ChatList onSelect={setSelectedChat} selectedChat={selectedChat} />
      </div>
      <div className="w-3/4 p-4">
        {selectedChat ? (
          <ChatWindow chat={selectedChat} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <h2 className="text-lg font-semibold text-gray-600">Select a chat to start the conversation</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatGPT;
