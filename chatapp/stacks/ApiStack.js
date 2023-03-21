import { Api } from "sst/constructs";

export function API({ stack }) {
	const api = new Api(stack, "api", {
		defaults: {
			function: {
				environment: {
					DATABASE_URL: process.env.DATABASE_URL,
				},
			},
		},
		routes: {
			"GET /chats": "packages/functions/src/chats/getChats.main",
			"POST /chats": "packages/functions/src/chats/createChat.main",
			"PUT /chats/{chatId}": "packages/functions/src/chats/updateChat.main",
			"DELETE /chats/{chatId}": "packages/functions/src/chats/deleteChat.main",
			"GET /chats/{chatId}/messages":
				"packages/functions/src/messages/getMessages.main",
			"POST /chats/{chatId}/messages":
				"packages/functions/src/messages/createMessage.main",
			"PUT /chats/{chatId}/messages/{messageId}":
				"packages/functions/src/messages/updateMessage.main",
			"DELETE /chats/{chatId}/messages/{messageId}":
				"packages/functions/src/messages/deleteMessage.main",
		},
	});
	stack.addOutputs({
		Cat: "Meow",
		ApiEndpoint: api.url,
	});

	return { api };
}
