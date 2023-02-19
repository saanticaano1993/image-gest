import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Root from "./components/layout/Root/Root";
import reactQueryClient from "./lib/reactQueryClient";
import useAuth from "./lib/auth/useAuth";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider } from "@tanstack/react-query";
import LoginPage from "./pages/Login";
import Register from "./pages/Register";
import Upload from "./pages/Upload";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Root />,
//     children: [
//       {
//         path: "/",
//         element: <div>Home</div>,
//       },
//       {
//         path: "profile",
//         element: <div>Profile</div>,
//       },
//       {
//         path: "upload",
//         element: <div>Upload</div>,
//       },
//       {
//         path: "auth",
//         element: <div>Auth</div>,
//         children: [
//           {
//             path: "login",
//             element: <div>Login</div>,
//           },
//           {
//             path: "register",
//             element: <div>Register</div>,
//           },
//         ],
//       },
//     ],
//   },
// ]);

const Main = () => {
  const auth = useAuth();

  // console.log(auth.data);

  const user = auth.data?.user;

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.isError) {
    return <div className="text-center text-2xl text-red-300 font-semibold">Error connecting to server</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        {user ? (
          <Route path="/" element={<Root />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/me" element={<Profile />} />
          </Route>
        ) : (
          <>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={reactQueryClient}>
      <Main />
      <ReactQueryDevtools />
      <ToastContainer />
    </QueryClientProvider>
  </React.StrictMode>
);
