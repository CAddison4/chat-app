import { deleteMessage } from "@chatapp/core/src/database";

export async function main(event) {
	const id = event.pathParameters.messageId;
	const deleted = await deleteMessage(id);
	return {
		statusCode: 200,
		body: JSON.stringify({
			message: deleted,
		}),
	};
}
