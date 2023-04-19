import { createMessage } from "@chatapp/core/database";

export async function main(event) {
	const identityPoolUserId =
		event.requestContext.authorizer?.iam.cognitoIdentity?.identityId;
	// const sub = event.requestContext.authorizer?.jwt.claims.sub;
	// const username = event.requestContext.authorizer?.jwt.claims.username;
	const chat_id = event.pathParameters.chatId;
	const { content, content_type } = JSON.parse(event.body);

	console.log("chatId: " + chat_id);
	const message = await createMessage(
		chat_id,
		identityPoolUserId,
		"Cat",
		content,
		content_type
	);
	return {
		statusCode: 200,
		body: JSON.stringify({
			message: message,
		}),
	};
}
