import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "@/App";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import reduxStore from "@/store";

const { store, persistor } = reduxStore();
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <ClerkProvider
            publishableKey={PUBLISHABLE_KEY}
            afterSignOutUrl="/sign-in"
            signUpFallbackRedirectUrl="/"
            signInFallbackRedirectUrl="/"
          >
            <App />
          </ClerkProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);
