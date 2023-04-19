import { updateChat } from "@chatapp/core/database";
export async function main(event) {
	const name = JSON.parse(event.body).name;
	// const sub = event.requestContext.authorizer?.jwt.claims.sub;
	const id = event.pathParameters.chatId;

	const identityPoolUserId =
		event.requestContext.authorizer?.iam.cognitoIdentity?.identityId;

	// const username =
	// 	event.requestContext.authorizer?.iam.cognitoIdentity?.username;

	const chat = await updateChat(id, name, identityPoolUserId);
	return {
		statusCode: 200,
		body: JSON.stringify({
			chat,
		}),
	};
}
