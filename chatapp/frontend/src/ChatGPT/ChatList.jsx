import React, { useState, useEffect } from "react";
import ChatItem from "./ChatItem";
import NewChatButton from "./NewChatButton";
import axios from "axios";

const ChatList = ({ onSelect, selectedChat }) => {
	const [chats, setChats] = useState([]);

	useEffect(() => {
		// fetch the chats
		const apiURL = import.meta.env.VITE_API_URL;
		axios.get(apiURL + "/chats").then((res) => {
			setChats(res.data.chats);
		});
	}, []);

	const updateChat = async (id, newName) => {
		// update the chat
		const apiURL = import.meta.env.VITE_API_URL;
		const result = await axios.put(`${apiURL}/chats/${id}`, { name: newName });
		const updatedChats = chats.map((chat) =>
			chat.id === id ? { ...chat, name: newName } : chat
		);
		setChats(updatedChats);
	};

	const deleteChat = async (id) => {
		const apiURL = import.meta.env.VITE_API_URL;
		await axios.delete(`${apiURL}/chats/${id}`);

		const updatedChats = chats.filter((chat) => chat.id !== id);
		setChats(updatedChats);
	};

	const createChat = async (name) => {
		// create the chat
		const apiURL = import.meta.env.VITE_API_URL;
		console.log("apiURL: ", apiURL);
		const result = await axios.post(`${apiURL}/chats`, { name: name });
		const newChat = result.data.chat;

		setChats([...chats, newChat]);
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
