import { updateChat } from "@chatapp/core/src/database";
export async function main(event) {
	const name = JSON.parse(event.body).name;
	const id = event.pathParameters.chatId;
	const chat = await updateChat(id, name);
	return {
		statusCode: 200,
		body: JSON.stringify({
			chat,
		}),
	};
}
