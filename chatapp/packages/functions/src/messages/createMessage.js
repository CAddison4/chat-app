import { createMessage } from "@chatapp/core/database";

export async function main(event) {
	const { content } = JSON.parse(event.body);
	const sub = event.requestContext.authorizer?.jwt.claims.sub;
	const username = event.requestContext.authorizer?.jwt.claims.username;
	const chat_id = event.pathParameters.chatId;

	console.log("chatId: " + chat_id);
	const message = await createMessage(chat_id, sub, username, content);
	return {
		statusCode: 200,
		body: JSON.stringify({
			message: message,
		}),
	};
}
