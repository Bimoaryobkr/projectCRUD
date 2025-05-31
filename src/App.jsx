import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./local/authLocal";
import RouteProtected from "./components/routeProtected";
import DashboardLayout from "./layout/dashboardLayout";

import AuthPage from "./pages/authPage";
import UserPage from "./pages/userPage";
import NotFoundPage from "./pages/notFoundPage";

function App() {
    return (
        <Router>
            <AuthProvider>
                <div className="app-container">
                    <main>
                        <Routes>
                            <Route path="/login" element={<AuthPage />} />
                            <Route
                                path="/"
                                element={<Navigate to="/login" replace />}
                            />
                            <Route element={<RouteProtected />}>
                                <Route element={<DashboardLayout />}>
                                    <Route
                                        path="/dashboard"
                                        element={<UserPage />}
                                    />
                                </Route>
                            </Route>
                            <Route path="*" element={<NotFoundPage />} />
                        </Routes>
                    </main>
                </div>
            </AuthProvider>
        </Router>
    );
}

export default App;
