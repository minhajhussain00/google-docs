import { NuqsAdapter } from 'nuqs/adapters/react-router';
import { BrowserRouter } from 'react-router-dom';
import { StrictMode } from 'react'
import './index.css'
import { createRoot } from 'react-dom/client'
import App from './App';
import {  ConvexReactClient,Authenticated,Unauthenticated,AuthLoading } from "convex/react";
import { ClerkProvider, useAuth ,SignIn} from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import Fullscreenloading from './components/Fullscreenloading';
import "@liveblocks/react-ui/styles.css";
import "@liveblocks/react-tiptap/styles.css";
import "./globals.css";


const convex = new ConvexReactClient("https://famous-mouse-403.convex.cloud");

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <NuqsAdapter>
        <ClerkProvider publishableKey="pk_test_YmlnLWx5bngtNjUuY2xlcmsuYWNjb3VudHMuZGV2JA">
          <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
            <Authenticated>
              
              <App />
            </Authenticated>
            <Unauthenticated>
              <div className='flex flex-col items-center justify-center min-h-screen'>
                <SignIn />
              </div>
            </Unauthenticated>
            <AuthLoading>
              <Fullscreenloading label="Auth loading..."/>
            </AuthLoading>
          </ConvexProviderWithClerk>
        </ClerkProvider>
      </NuqsAdapter>
    </BrowserRouter>
  </StrictMode>
);

