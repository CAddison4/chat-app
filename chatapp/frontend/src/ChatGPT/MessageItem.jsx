import React, { useState } from "react";
import { EditIcon, TrashIcon } from "./Icons";
import { useEffect } from "react";
import { Auth } from "aws-amplify";

const MessageItem = ({ message, onUpdate, onDelete }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [content, setContent] = useState(message.content);
	const [userId, setUserId] = useState("");

	const isUser = message.sender === "user";

	useEffect(() => {
		let getId = async () => {
			const credentials = await Auth.currentCredentials();
			const id = credentials.identityId;
			setUserId(id);
		};

		getId();
	}, []);

	const handleUpdate = () => {
		onUpdate(message.id, content);
		setIsEditing(false);
	};

	const handleDelete = () => {
		onDelete(message);
	};

	return (
		<div className={`flex my-2 ${isUser ? "justify-end" : ""}`}>
			<div className="p-2 my-1">
				{isEditing ? (
					<div className="flex">
						<input
							type="text"
							value={content}
							onChange={(e) => setContent(e.target.value)}
							className="flex-grow p-1 border rounded"
						/>
						<button
							onClick={handleUpdate}
							className="ml-2 px-2 py-1 bg-green-500 text-white font-semibold rounded">
							Save
						</button>
						<button
							onClick={() => setIsEditing(false)}
							className="ml-2 px-2 py-1 bg-red-500 text-white font-semibold rounded">
							Cancel
						</button>
					</div>
				) : (
					<div
						className={`px-4 py-2 rounded ${
							isUser ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-700"
						}`}>
						<div className="flex items-center">
							{message.content_type === "text" ? (
								<span className="flex-grow">{content}</span>
							) : (
								<img src={content} alt="image" className="w-32 h-32" />
							)}
							{userId === message.user_id && (
								<>
									<button
										onClick={() => setIsEditing(true)}
										className="px-1 text-gray-600 hover:text-gray-800">
										{message.content_type === "text" && <EditIcon />}
									</button>
									<button
										onClick={handleDelete}
										className="px-1 ml-2 text-gray-600 hover:text-gray-800">
										<TrashIcon />
									</button>
								</>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default MessageItem;
