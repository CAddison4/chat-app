import { createChat } from "@chatapp/core/database";

//Don't need this this week:
//Get the user pool from the identity pool authorizer.
// function getUserId(event) {
// 	if (!event.requestContext.authorizer?.iam) {
// 		return;
// 	}
// 	const authProvider =
// 		event.requestContext.authorizer.iam.cognitoIdentity.amr.findLast((ref) =>
// 			ref.includes(":")
// 		);
// 	const parts = authProvider.split(":");
// 	return parts[parts.length - 1];
// }

// export async function handler(event) {
// 	const userId = getUserId(event);
// 	if (userId) {
// 		console.log(`User is logged in: ${userId}`);
// 	}
// }
export async function main(event) {
	const identityPoolUserId =
		event.requestContext.authorizer?.iam.cognitoIdentity?.identityId;

	const username =
		event.requestContext.authorizer?.iam.cognitoIdentity?.username;
	// const sub = event.requestContext.authorizer?.jwt.claims.sub;
	// const username = event.requestContext.authorizer?.jwt.claims.username;

	const { name } = JSON.parse(event.body);
	const chat = await createChat(name, identityPoolUserId, "Cat");

	// const { name } = JSON.parse(event.body);

	// console.log("event", JSON.stringify(event, null, 2));
	// const chat = await createChat(name, sub, username);

	return {
		statusCode: 200,
		body: JSON.stringify({
			chat,
			identityPoolUserId,
		}),
	};
}
