import React, { useState, useEffect } from "react";

export default function EditUserModal({
    isOpen,
    onClose,
    onSubmit,
    initialData,
    formError,
}) {
    const [name, setName] = useState("");
    const [job, setJob] = useState("");

    useEffect(() => {
        if (initialData) {
            setName(initialData.name || "");
            setJob(initialData.job || "");
        } else {
            setName("");
            setJob("");
        }
    }, [initialData, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit({ name, job });
    };

    return (
        <div className="modal-backdrop px-4 fixed inset-0 overflow-y-auto h-full w-full flex items-center justify-center z-50">
            <div className="relative mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
                <div className="mt-3 text-center">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Edit User
                    </h3>
                    <form onSubmit={handleSubmit} className="mt-2 px-7 py-3">
                        <div className="mb-4">
                            <label
                                htmlFor="edit-name"
                                className="block text-sm font-medium text-gray-700 text-left"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="edit-name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="edit-job"
                                className="block text-sm font-medium text-gray-700 text-left"
                            >
                                Job
                            </label>
                            <input
                                type="text"
                                name="job"
                                id="edit-job"
                                value={job}
                                onChange={(e) => setJob(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            />
                        </div>
                        {formError && (
                            <p className="text-xs text-red-500 text-center mb-3">
                                {formError}
                            </p>
                        )}
                        <div className="items-center px-4 py-3 gap-2 flex">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-indigo-600 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-indigo-700"
                            >
                                Update
                            </button>
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 bg-gray-200 text-gray-800 text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
