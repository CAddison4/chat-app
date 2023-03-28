import React, { useState } from "react";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";
import { useAuthenticator } from "@aws-amplify/ui-react";

const ChatGPT = () => {
	const [selectedChat, setSelectedChat] = useState(null);

	const { user, signOut } = useAuthenticator((context) => [context.user]);

	return (
		<div className="flex min-h-screen">
			<div className="w-1/2 p-4 border-r border-none bg-gray-700">
				<div className="bg-slate-200 bg-opacity-50 rounded-lg p-4">
					<ChatList
						onSelect={setSelectedChat}
						selectedChat={selectedChat}
						className="p-4"
						chatClassName={`
    ${selectedChat ? "bg-gray-800 text-white selected-chat p-6 py-4" : ""}
    p-6 py-4 rounded-lg my-2 cursor-pointer hover:bg-gray-700 transition-colors duration-200
  `}
					/>
				</div>
			</div>
			<div className="w-3/4 p-4 bg-slate-600 border-none">
				{selectedChat ? (
					<ChatWindow chat={selectedChat} />
				) : (
					<div className="flex items-center justify-center h-full">
						<h2 className="text-lg font-semibold text-gray-600">
							Select a chat to start the conversation
						</h2>
					</div>
				)}
			</div>
		</div>
	);
};

export default ChatGPT;
