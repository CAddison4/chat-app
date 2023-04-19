import { deleteMessage } from "@chatapp/core/database";

export async function main(event) {
	const id = event.pathParameters.messageId;
	const identityPoolUserId =
		event.requestContext.authorizer?.iam.cognitoIdentity?.identityId;
	const deleted = await deleteMessage(id, identityPoolUserId);
	return {
		statusCode: 200,
		body: JSON.stringify({
			message: deleted,
		}),
	};
}
