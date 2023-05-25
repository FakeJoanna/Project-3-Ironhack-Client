import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from '@react-oauth/google';

import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProviderWrapper } from "./context/auth.context";
import { CartProviderWrapper } from "./context/cart.context";
import { ChatIDsProviderWrapper } from "./context/chatIDs.context";

import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import 'popper.js/dist/popper.min.js';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Router>
    <GoogleOAuthProvider clientId="794153306196-oe751ir2bgjurclsfj3slri2dq3jfn5b.apps.googleusercontent.com">
      <AuthProviderWrapper>
        <CartProviderWrapper>
          <ChatIDsProviderWrapper>
            <App />
          </ChatIDsProviderWrapper>
        </CartProviderWrapper>
      </AuthProviderWrapper>
    </GoogleOAuthProvider>
  </Router>
);
