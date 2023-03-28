import { createChat } from "@chatapp/core/database";
export async function main(event) {
	const sub = event.requestContext.authorizer?.jwt.claims.sub;
	const username = event.requestContext.authorizer?.jwt.claims.username;
	const { name } = JSON.parse(event.body);

	console.log("event", JSON.stringify(event, null, 2));
	const chat = await createChat(name, sub, username);

	return {
		statusCode: 200,
		body: JSON.stringify({
			chat,
		}),
	};
}
