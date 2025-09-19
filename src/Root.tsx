import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

const msalConfig = {
  auth: {
    clientId: "YOUR_CLIENT_ID", // Replace with your Azure AD app client ID
    authority: "https://login.microsoftonline.com/common", // Or your tenant ID
    redirectUri: "/", // Redirect after login
  },
};

const msalInstance = new PublicClientApplication(msalConfig);

const Root = () => (
  <MsalProvider instance={msalInstance}>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <App>
              <Index />
            </App>
          }
        />
        <Route
          path="/login"
          element={
            <App>
              <Login />
            </App>
          }
        />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route
          path="*"
          element={
            <App>
              <NotFound />
            </App>
          }
        />
      </Routes>
    </BrowserRouter>
  </MsalProvider>
);

export default Root;
