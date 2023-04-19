import React, { useEffect, useState } from "react";
import Message from "./MessageItem";
import axios from "axios";
import { Auth, API, Storage } from "aws-amplify";
import { useAuthenticator } from "@aws-amplify/ui-react";

const ChatWindow = ({ chat }) => {
	// Replace the array with actual message data
	const [messages, setMessages] = useState([]);
	const [input, setInput] = useState("");
	const { user, signOut } = useAuthenticator((context) => [context.user]);
	const [file, setFile] = useState(null);

	const chatId = chat.id;

	async function getMessages() {
		try {
			const response = await API.get("api", `/chats/${chatId}/messages`);
			const messages = response.messages;
			for (let message of messages) {
				if (message.content_type === "image") {
					// get a signed url
					const key = message.content;
					message.content = await Storage.get(key, {
						identityId: message.user_id,
					});
					message.key = key; // store the original key or file name in the message object
				}
			}
			setMessages(messages);
		} catch (error) {
			console.log("Error fetching messages: ", error);
		}
	}
	useEffect(() => {
		getMessages();
	}, [chat]);

	const handleFileChange = (event) => {
		setFile(event.target.files[0]);
	};

	const handleSend = async () => {
		// Implement sending the message here
		if (file) {
			try {
				const s3Options = {
					contentType: file.type,
					progressCallback(progress) {
						console.log(`Uploaded: ${progress.loaded / progress.total}`);
					},
				};
				const uniqueFileName = `${Date.now()}-${file.name}`;
				await Storage.put(uniqueFileName, file, s3Options);
				console.log("File uploaded successfully!");
				const result = await API.post("api", `/chats/${chatId}/messages`, {
					body: {
						content: uniqueFileName,
						content_type: "image",
						username: user.username,
					},
				});

				const key = result.message.content;
				result.message.content = await Storage.get(key, {
					identityId: result.message.user_id,
				});
				result.message.key = key;

				setMessages([...messages, result.message]);
				setFile("");
			} catch (error) {
				console.log("Error uploading file:", error);
			}
		} else {
			try {
				const result = await API.post("api", `/chats/${chatId}/messages`, {
					body: {
						content: input,
						content_type: "text",
						username: user.username,
					},
				});
				setInput("");
				setMessages([...messages, result.message]);
			} catch (error) {
				console.log("Error uploading message:", error);
			}
		}
	};

	const handleMessageUpdate = async (id, content) => {
		// Implement updating the message here
		API.put("api", `/chats/${chatId}/messages/${id}`, {
			body: { content: content },
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
	};

	const handleMessageDelete = async (message) => {
		console.log("message: ", message);
		Storage.remove(message.key);
		API.del("api", `/chats/${chatId}/messages/${message.id}`)
			.then((res) => {
				console.log("res: ", res);
				const updatedMessages = messages.filter((m) => m.id !== message.id);
				setMessages(updatedMessages);
			})
			.catch((err) => {
				console.log(err);
			});
		const updatedMessages = messages.filter((m) => m.id !== message.id);
		setMessages(updatedMessages);

	};

	return (
		<div className="flex flex-col h-full">
			<div className="flex-grow overflow-y-auto">
				{console.log("user: ", user)}
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
						<input type="file" onChange={handleFileChange} />
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
