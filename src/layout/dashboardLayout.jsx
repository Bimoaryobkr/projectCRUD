import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navigationBar";

export default function DashboardLayout() {
    return (
        <>
            <Navbar />
            <main className="bg-slate-100 min-h-screen py-6 sm:py-8">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <Outlet />
                </div>
            </main>
        </>
    );
}
