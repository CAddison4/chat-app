import React, { useState } from 'react';

const NewChatButton = ({ onCreate }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [name, setName] = useState('');

  const handleCreate = () => {
    if (name.trim() !== '') {
      onCreate(name);
      setName('');
      setIsCreating(false);
    }
  };

  return (
    <>
      {isCreating ? (
        <div className="flex">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-grow p-2 border rounded"
            placeholder="Chat name..."
          />
          <button
            onClick={handleCreate}
            className="ml-2 px-4 py-2 bg-green-500 text-white font-semibold rounded"
          >
            Create
          </button>
          <button
            onClick={() => setIsCreating(false)}
            className="ml-2 px-4 py-2 bg-red-500 text-white font-semibold rounded"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsCreating(true)}
          className="w-full px-4 py-2 mt-4 text-white bg-green-500 font-semibold rounded"
        >
          New Chat
        </button>
      )}
    </>
  );
};

export default NewChatButton;

