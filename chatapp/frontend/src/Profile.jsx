import React from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
	const { user, signOut } = useAuthenticator((context) => [context.user]);
	const navigate = useNavigate();
	return (
		<div className="flex justify-center items-center h-screen bg-slate-400">
			<div className="bg-white bg-opacity-50 p-8 rounded-lg shadow-lg">
				<p className="text-xl font-medium">{user?.username}</p>
				<p className="text-sm text-gray-600">email: {user?.attributes.email}</p>
				<button
					className="px-4 py-2 bg-teal-500 hover:bg-teal-400 text-white rounded-md mt-4 font-bold"
					onClick={signOut}>
					Sign Out
				</button>
			</div>
		</div>
	);
}
