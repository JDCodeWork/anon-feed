import { ClerkProvider } from "@clerk/clerk-react";
import { AppRouter } from "./shared/AppRouter";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
	throw new Error('Add your Clerk Publishable Key to the .env file')
}

function App() {
	return (
		<ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
			<AppRouter />
		</ClerkProvider>
	);
}

export default App;
