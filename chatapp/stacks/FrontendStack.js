import { StaticSite, use } from "sst/constructs";
import { API } from "./ApiStack";

export function FrontendStack({ stack, app }) {
	const { api } = use(API);

	const site = new StaticSite(stack, "ReactSite", {
		path: "frontend",
		buildOutput: "dist",
		buildCommand: "yarn build",
		// Pass in our environment variables
		environment: {
			VITE_API_URL: api.customDomainUrl || api.url,
		},
	});

	// Show the url in the output
	stack.addOutputs({
		SiteUrl: site.url || "",
	});
}
