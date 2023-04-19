import { updateMessage } from "@chatapp/core/database";

export async function main(event) {
	const content = JSON.parse(event.body).content;
	const message_id = event.pathParameters.messageId;
	const identityPoolUserId =
		event.requestContext.authorizer?.iam.cognitoIdentity?.identityId;
	const message = await updateMessage(message_id, content, identityPoolUserId);
	return {
		statusCode: 200,
		body: JSON.stringify({
			message,
		}),
	};
}
