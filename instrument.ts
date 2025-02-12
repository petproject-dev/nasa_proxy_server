import * as Sentry from "@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profiling-node";
import config from "./app/config/config";

Sentry.init({
	dsn: config.sentryDsn,
	integrations: [nodeProfilingIntegration()],
	tracesSampleRate: 1.0,
	profilesSampleRate: 1.0,
});
