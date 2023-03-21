import { createChat } from "@chatapp/core/src/database";
export async function main(event) {
	const { name } = JSON.parse(event.body);
	const chat = await createChat(name);
	return {
		statusCode: 200,
		body: JSON.stringify({
			chat,
		}),
	};
}
