import { API } from "./stacks/ApiStack";
import { FrontendStack } from "./stacks/FrontendStack";

export default {
	config(_input) {
		return {
			name: "chatapp",
			region: "us-west-2",
		};
	},
	stacks(app) {
		app.stack(API).stack(FrontendStack);
	},
};
