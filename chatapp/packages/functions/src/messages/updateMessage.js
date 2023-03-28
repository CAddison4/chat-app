import { updateMessage } from "@chatapp/core/database";

export async function main(event) {
	const content = JSON.parse(event.body).content;
	const message_id = event.pathParameters.messageId;
	const message = await updateMessage(message_id, content);
	return {
		statusCode: 200,
		body: JSON.stringify({
			message,
		}),
	};
}
