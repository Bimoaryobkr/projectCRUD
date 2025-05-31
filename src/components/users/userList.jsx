import React from "react";

export default function UserList({ users, onEditUser, onDeleteUser }) {
    if (!users || users.length === 0) {
        return (
            <p className="text-center text-slate-500 py-10">
                No users to display.
            </p>
        );
    }

    return (
        <div className="space-y-4">
            {users.map((user) => (
                <div
                    key={user.id}
                    className="bg-white shadow-lg rounded-lg p-4 md:p-6 flex flex-col md:flex-row items-center gap-4 hover:shadow-xl transition-shadow duration-200"
                >
                    <div className="flex-shrink-0">
                        <img
                            src={user.avatar}
                            alt={`${user.first_name} ${user.last_name}'s avatar`}
                            className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-indigo-200"
                        />
                    </div>
                    <div className="flex-grow text-center md:text-left">
                        <h3 className="text-xl font-semibold text-indigo-700">
                            {user.first_name} {user.last_name}
                        </h3>
                        <p className="text-sm text-slate-600">
                            <span className="font-medium">Email:</span>{" "}
                            {user.email}
                        </p>
                    </div>
                    <div className="flex-shrink-0 flex flex-col md:flex-row items-stretch md:items-center gap-2 mt-3 md:mt-0 w-full md:w-auto">
                        <button
                            onClick={() => onEditUser(user.id)}
                            className="w-full md:w-auto px-4 py-2 text-sm font-medium text-white bg-yellow-500 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75 transition-colors"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => onDeleteUser(user.id)}
                            className="w-full md:w-auto px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75 transition-colors"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
