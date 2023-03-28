import React, { useEffect, useState } from "react";
import Message from "./MessageItem";
import axios from "axios";
import { Auth, API } from "aws-amplify";
import { useAuthenticator } from "@aws-amplify/ui-react";

const ChatWindow = ({ chat }) => {
	// Replace the array with actual message data
	const [messages, setMessages] = useState([]);
	const [input, setInput] = useState("");
	const { user, signOut } = useAuthenticator((context) => [context.user]);

	const chatId = chat.id;

	useEffect(() => {
		const fetchMessages = async () => {
			// fetch the messages for each chat if authorized using API.get

			API.get("api", `/chats/${chatId}/messages`, {
				headers: {
					Authorization: `Bearer ${(await Auth.currentSession())
						.getAccessToken()
						.getJwtToken()}`,
				},
			})
				.then((res) => {
					setMessages(res.messages);
				})
				.catch((err) => {
					console.log(error);
				});
		};
		fetchMessages();
	}, [chat]);

	const handleSend = async () => {
		// Implement sending the message here

		API.post("api", `/chats/${chatId}/messages`, {
			body: { content: input, chat_id: chatId },
			headers: {
				Authorization: `Bearer ${(await Auth.currentSession())
					.getAccessToken()
					.getJwtToken()}`,
			},
		})

			.then((res) => {
				console.log("res: ", res);
				const newMessage = res.message;
				setMessages([...messages, newMessage]);
			})
			.catch((err) => {
				console.log(err);
			});

		setInput("");
	};

	const handleMessageUpdate = async (id, content) => {
		// Implement updating the message here
		API.put("api", `/chats/${chatId}/messages/${id}`, {
			body: { content: content },
			headers: {
				Authorization: `Bearer ${(await Auth.currentSession())
					.getAccessToken()
					.getJwtToken()}`,
			},
		})
			.then((res) => {
				console.log("res: ", res);
				const updatedMessages = messages.map((message) =>
					message.id === id ? { ...message, content: content } : message
				);
				setMessages(updatedMessages);
			})
			.catch((err) => {
				console.log(err);
			});

		const updatedMessages = messages.map((message) =>
			message.id === id ? { ...message, content: content } : message
		);
		setMessages(updatedMessages);
	};

	const handleMessageDelete = async (id) => {
		API.del("api", `/chats/${chatId}/messages/${id}`, {
			headers: {
				Authorization: `Bearer ${(await Auth.currentSession())
					.getAccessToken()
					.getJwtToken()}`,
			},
		})
			.then((res) => {
				console.log("res: ", res);
				const updatedMessages = messages.filter((message) => message.id !== id);
				setMessages(updatedMessages);
			})
			.catch((err) => {
				console.log(err);
			});

		// Implement deleting the message here
		// const apiURL = import.meta.env.VITE_API_URL;
		// await axios.delete(`${apiURL}/chats/${chatId}/messages/${id}`);
		const updatedMessages = messages.filter((message) => message.id !== id);
		setMessages(updatedMessages);

		// console.log(id);
	};

	return (
		<div className="flex flex-col h-full">
			<div className="flex-grow overflow-y-auto">
				{user ? (
					messages.map((message) => (
						<Message
							key={message.id}
							message={message}
							onUpdate={handleMessageUpdate}
							onDelete={handleMessageDelete}
						/>
					))
				) : (
					<p>Login to view messages</p>
				)}
			</div>
			<div className="flex mt-4">
				{user && (
					<>
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
					</>
				)}
			</div>
		</div>
	);
};

export default ChatWindow;
