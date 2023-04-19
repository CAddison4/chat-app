import React, { useState } from "react";
import { EditIcon, TrashIcon } from "./Icons"; // Import the icons from a separate file
import { useAuthenticator } from "@aws-amplify/ui-react";
import { Auth } from "aws-amplify";
import { useEffect } from "react";

import { twMerge } from "tailwind-merge";

const ChatItem = ({ chat, selected, onSelect, onUpdate, onDelete }) => {
	const { user } = useAuthenticator((context) => [context.user]);
	const [isEditing, setIsEditing] = useState(false);
	const [name, setName] = useState(chat.name);
	const [userId, setUserId] = useState("");

	useEffect(() => {
		let getId = async () => {
			const credentials = await Auth.currentCredentials();
			const id = credentials.identityId;
			setUserId(id);
		};

		getId();
	}, []);

	console.log("ChatItem", chat.username);

	const handleUpdate = () => {
		onUpdate(chat.id, name);
		setIsEditing(false);
	};

	const handleDelete = (event) => {
		event.stopPropagation(); // Prevent the chat from being selected
		onDelete(chat.id);
	};

	const handleSelect = () => {
		if (!isEditing) {
			onSelect(chat);
		}
	};

	const toggleEditing = (event) => {
		event.stopPropagation(); // Prevent the chat from being selected
		setIsEditing((prev) => !prev);
	};

	return (
		<div className="p-2 my-1" onClick={handleSelect}>
			{isEditing ? (
				<div className="flex">
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="flex-grow p-1 border rounded"
					/>
					<button
						onClick={handleUpdate}
						className="ml-2 px-2 py-1 bg-green-500 text-white font-semibold rounded">
						Save
					</button>
					<button
						onClick={toggleEditing}
						className="ml-2 px-2 py-1 bg-red-500 text-white font-semibold rounded">
						Cancel
					</button>
				</div>
			) : (
				<div
					className={twMerge(
						"flex items-center cursor-pointer hover:bg-gray-200",
						selected ? "bg-gray-200" : ""
					)}>
					<h3 className="flex-grow font-semibold">{chat.name}</h3>
					<p className="">{chat.username}</p>

					{user && (
						<>
							{console.log("ChatItem", chat.user_id)}
							{console.log("userId", userId)}
							{console.log("user", user)}
							{userId === chat.user_id && (
								<>
									<button
										onClick={toggleEditing}
										className="px-1 text-gray-600 hover:text-gray-800">
										<EditIcon />
									</button>
									<button
										onClick={handleDelete}
										className="px-1 ml-2 text-gray-600 hover:text-gray-800">
										<TrashIcon />
									</button>
								</>
							)}
						</>
					)}
				</div>
			)}
		</div>
	);
};

export default ChatItem;
