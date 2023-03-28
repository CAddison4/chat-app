import { updateChat } from "@chatapp/core/database";
export async function main(event) {
	const name = JSON.parse(event.body).name;
	const sub = event.requestContext.authorizer?.jwt.claims.sub;
	const id = event.pathParameters.chatId;
	const chat = await updateChat(id, name, sub);
	return {
		statusCode: 200,
		body: JSON.stringify({
			chat,
		}),
	};
}
