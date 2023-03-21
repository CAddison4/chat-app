import { createMessage } from "@chatapp/core/src/database";
export async function main(event) {
	const { content } = JSON.parse(event.body);
	const chat_id = event.pathParameters.chatId;
	console.log("chatId: " + chat_id);
	const message = await createMessage(chat_id, content);
	return {
		statusCode: 200,
		body: JSON.stringify({
			message: message,
		}),
	};
}
