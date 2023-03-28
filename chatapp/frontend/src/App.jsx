import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

// Anything you do through AWS you do through Amplify.
import { Amplify } from "aws-amplify";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import RouteGuard from "./RouteGuard";
import ChatGPT from "./ChatGPT/ChatGPT";

import Login from "./Login";
import Home from "./Home";
import Profile from "./Profile";

const amplifyConfig = {
	Auth: {
		mandatorySignIn: false,
		region: import.meta.env.VITE_APP_REGION,
		userPoolId: import.meta.env.VITE_APP_USER_POOL_ID,
		userPoolWebClientId: import.meta.env.VITE_APP_USER_POOL_CLIENT_ID,
		// identityPoolId: import.meta.env.VITE_APP_IDENTITY_POOL_ID,
	},
	API: {
		endpoints: [
			{
				name: "api",
				endpoint: import.meta.env.VITE_APP_API_URL,
				region: import.meta.env.VITE_APP_REGION,
			},
		],
	},
};

console.log("amplify", amplifyConfig);
Amplify.configure(amplifyConfig);

function NavBar() {
	const { user } = useAuthenticator((context) => [context.user]);

	return (
		<nav className="flex justify-between items-center px-4 py-2 bg-gray-700">
			<div className="flex items-center">
				<Link
					to="/"
					className="px-3 py-1 rounded-md text-white bg-teal-500 hover:bg-teal-400 active:bg-teal-600 font-bold">
					Home
				</Link>
			</div>
			<ul className="flex items-center">
				{user ? (
					<li>
						<Link
							to="/profile"
							className="px-3 py-1 rounded-md text-white bg-teal-500 hover:bg-teal-400 active:bg-teal-600 font-bold">
							Profile
						</Link>
					</li>
				) : (
					<li>
						<Link
							to="/login"
							className="px-3 py-1 rounded-md text-white bg-teal-500 hover:bg-teal-400 active:bg-teal-600 font-bold">
							Login
						</Link>
					</li>
				)}
			</ul>
		</nav>
	);
}
export default function App() {
	return (
		<Authenticator.Provider>
			<BrowserRouter>
				<NavBar />
				<main>
					<Routes>
						<Route
							path="/profile"
							element={
								<RouteGuard>
									<Profile />
								</RouteGuard>
							}
						/>
						<Route path="/login" element={<Login />} />
						<Route path="/" element={<ChatGPT />} />
					</Routes>
				</main>
			</BrowserRouter>
		</Authenticator.Provider>
	);
}
