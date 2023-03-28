import { getMessages } from "@chatapp/core/database";

export async function main(event) {
	const chat_id = event.pathParameters.chatId;
	const messages = await getMessages(chat_id);
	return {
		statusCode: 200,
		body: JSON.stringify({
			messages: messages,
		}),
	};
}
