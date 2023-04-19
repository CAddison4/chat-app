import { Auth, API } from "aws-amplify";
import { useAuthenticator } from "@aws-amplify/ui-react";

export default function Home() {
	const { user, signOut } = useAuthenticator((context) => [context.user]);

	const publicRequest = async () => {
		const response = await API.get("api", "/public");
		alert(JSON.stringify(response));
	};

	const privateRequest = async () => {
		try {
			const response = await API.get("api", "/private");
			alert(JSON.stringify(response));
		} catch (error) {
			alert(error);
		}
	};

	return (
		<div>
			<p>{user?.username}</p>
			<p>email: {user?.attributes.email}</p>

			<button onClick={publicRequest}>Public Request</button>
			<button onClick={privateRequest}>Private Request</button>
			<button onClick={signOut}>Sign Out</button>
		</div>
	);
}
