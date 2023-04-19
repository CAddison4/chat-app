import React, { useState, useEffect } from "react";
import ChatItem from "./ChatItem";
import NewChatButton from "./NewChatButton";
import axios from "axios";
import { Auth, API } from "aws-amplify";
import { useAuthenticator } from "@aws-amplify/ui-react";

const ChatList = ({ onSelect, selectedChat }) => {
	const [chats, setChats] = useState([]);
	const { user, signOut } = useAuthenticator((context) => [context.user]);

	useEffect(() => {
		// fetch the chats
		const apiURL = import.meta.env.VITE_API_URL;

		API.get("api", "/chats")
			.then((res) => {
				setChats(res.chats);
			})
			.catch((err) => {
				console.log(error);
			});
	}, []);

	const updateChat = async (id, newName) => {
		// update the chat
		await API.put("api", `/chats/${id}`, {
			body: { name: newName },
		});

		const updatedChats = chats.map((chat) =>
			chat.id === id ? { ...chat, name: newName } : chat
		);
		setChats(updatedChats);
	};

	const deleteChat = async (id) => {
		await API.del("api", `/chats/${id}`);

		const updatedChats = chats.filter((chat) => chat.id !== id);
		setChats(updatedChats);
	};

	const createChat = async (name) => {
		try {
			const result = await API.post("api", "/chats", {
				body: { name: name },
			});

			const newChat = result.chat;
			const userId = result.identityPoolUserId;
			console.log("Result", result.identityPoolUserId);
			setChats([...chats, newChat]);
		} catch (error) {
			alert("Error");
			console.log(error);
		}
	};

	return (
		<div className="overflow-y-auto">
			{chats.map((chat) => (
				<ChatItem
					selected={chat.id == selectedChat?.id}
					key={chat.id}
					chat={chat}
					onSelect={onSelect}
					onUpdate={updateChat}
					onDelete={deleteChat}
				/>
			))}
			<NewChatButton onCreate={createChat} />
		</div>
	);
};

export default ChatList;
