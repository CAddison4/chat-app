import React, { useEffect, useState } from "react";
import Message from "./MessageItem";
import axios from "axios";

const ChatWindow = ({ chat }) => {
	// Replace the array with actual message data
	const [messages, setMessages] = useState([]);
	const [input, setInput] = useState("");

	const chatId = chat.id;

	useEffect(() => {
		// fetch the messages for each chat
		const apiURL = import.meta.env.VITE_API_URL;
		console.log("apiURL: ", `${apiURL}/chats/${chatId}/messages`);
		axios.get(`${apiURL}/chats/${chatId}/messages`).then((res) => {
			setMessages(res.data.messages);
		});
	}, [chat]);

	const handleSend = async () => {
		// Implement sending the message here
		console.log(input);
		const apiURL = import.meta.env.VITE_API_URL;
		const result = await axios.post(`${apiURL}/chats/${chatId}/messages`, {
			content: input,
			chat_id: chatId,
		});
		console.log("result: ", result);
		const newMessage = result.data.message;
		setMessages([...messages, newMessage]);

		setInput("");
	};

	const handleMessageUpdate = async (id, content) => {
		// Implement updating the message here
		const apiURL = import.meta.env.VITE_API_URL;
		const result = await axios.put(`${apiURL}/chats/${chatId}/messages/${id}`, {
			content: content,
		});
		const updatedMessages = messages.map((message) =>
			message.id === id ? { ...message, content: content } : message
		);
		setMessages(updatedMessages);
		console.log(id, content);
	};

	const handleMessageDelete = async (id) => {
		// Implement deleting the message here
		const apiURL = import.meta.env.VITE_API_URL;
		await axios.delete(`${apiURL}/chats/${chatId}/messages/${id}`);
		const updatedMessages = messages.filter((message) => message.id !== id);
		setMessages(updatedMessages);

		console.log(id);
	};

	return (
		<div className="flex flex-col h-full">
			<div className="flex-grow overflow-y-auto">
				{messages.map((message) => (
					<Message
						key={message.id}
						message={message}
						onUpdate={handleMessageUpdate}
						onDelete={handleMessageDelete}
					/>
				))}
			</div>
			<div className="flex mt-4">
				<input
					type="text"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					className="flex-grow p-2 border rounded"
					placeholder="Type your message..."
				/>
				<button
					onClick={handleSend}
					className="ml-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded">
					Send
				</button>
			</div>
		</div>
	);
};

export default ChatWindow;
