import React, { useState, useEffect, useCallback, useMemo } from "react";
import userService from "../../services/userServices";
import UserList from "./userList";
import AddCard from "./addCard";
import EditCard from "./editCard";

export default function DataCard() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState(null);
    const [currentUserDataForForm, setCurrentUserDataForForm] = useState(null);
    const [formSubmitError, setFormSubmitError] = useState(null);

    const loadUsers = useCallback(async (pageToLoad) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await userService.fetchUsersList(pageToLoad);
            setUsers(response.users || []);
            setTotalPages(response.totalPages || 1);
        } catch (e) {
            setError(e.message || "Failed to fetch users.");
            setUsers([]);
            setTotalPages(1);
            console.error("Detailed error fetching users:", e);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadUsers(currentPage);
    }, [loadUsers, currentPage]);

    const openAddModel = () => {
        setModalMode("add");
        setFormSubmitError(null);
        setIsModalOpen(true);
    };

    const openEditModal = useCallback(
        (userId) => {
            const userToEdit = users.find((user) => user.id === userId);
            if (userToEdit) {
                setModalMode("edit");
                setCurrentUserDataForForm({
                    id: userToEdit.id,
                    name: `${userToEdit.first_name} ${userToEdit.last_name}`,
                    job: "Employee",
                });
                setFormSubmitError(null);
                setIsModalOpen(true);
            }
        },
        [users]
    );

    const closeModal = () => {
        setIsModalOpen(false);
        setModalMode(null);
        setCurrentUserDataForForm(null);
        setFormSubmitError(null);
    };

    const handleDeleteUser = useCallback(
        async (userId) => {
            if (window.confirm("Are you sure you want to delete this user?")) {
                setIsLoading(true);
                try {
                    const response = await userService.deleteUser(userId);
                    console.log(
                        `User ID ${userId} deleted successfully:`,
                        response
                    );
                    loadUsers(currentPage);
                } catch (e) {
                    console.error(`Failed to delete user ID ${userId}:`, e);
                    setError(`Failed to delete user: ${e.message}`);
                    setIsLoading(false);
                }
            }
        },
        [loadUsers, currentPage]
    );

    const handleAddFormSubmit = async (formDataFromModal) => {
        setFormSubmitError(null);
        setIsLoading(true);
        try {
            const responseData = await userService.createUser(
                formDataFromModal
            );
            console.log("User created successfully:", responseData);
            closeModal();
            loadUsers(currentPage);
        } catch (e) {
            console.error(`Form submission (add) error:`, e);
            setFormSubmitError(
                e.message || `Submission (add) failed. Please try again.`
            );
            setIsLoading(false);
        }
    };

    const handleEditFormSubmit = async (formDataFromModal) => {
        setFormSubmitError(null);
        setIsLoading(true);
        if (!currentUserDataForForm || !currentUserDataForForm.id) {
            console.error("Cannot submit edit form");
            setFormSubmitError("Cannot submit edit form.");
            setIsLoading(false);
            return;
        }
        try {
            const responseData = await userService.updateUser(
                currentUserDataForForm.id,
                formDataFromModal
            );
            console.log(
                `User ID ${currentUserDataForForm.id} updated successfully:`,
                responseData
            );
            closeModal();
            loadUsers(currentPage);
        } catch (e) {
            console.error(
                `Form submission (edit) error for user ID ${currentUserDataForForm.id}:`,
                e
            );
            setFormSubmitError(
                e.message || `Submission (edit) failed. Please try again.`
            );
            setIsLoading(false);
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages && newPage !== currentPage) {
            setCurrentPage(newPage);
        } else if (newPage < 1) {
            setCurrentPage(1);
        } else if (newPage > totalPages) {
            setCurrentPage(totalPages);
        }
    };

    const usersToDisplay = useMemo(() => {
        return users;
    }, [users]);

    return (
        <div className="p-6 sm:py-8 sm:px-20 d-flex flex-column">
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-700">
                    User's Data
                </h1>
                <button
                    onClick={openAddModel}
                    className="w-full sm:w-auto px-6 py-2.5 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-colors"
                >
                    Add New Data
                </button>
            </div>
            {isLoading && !isModalOpen ? (
                <p className="text-center text-indigo-500 py-10 text-lg">
                    Loading users...
                </p>
            ) : error ? (
                <div className="text-center py-10">
                    <p className="text-red-500 text-lg mb-3">Error: {error}</p>
                    <button
                        onClick={() => loadUsers(currentPage)}
                        className="mt-2 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
                    >
                        Try Again
                    </button>
                </div>
            ) : usersToDisplay.length === 0 ? (
                <p className="text-center text-slate-600 py-10 text-lg">{`No users found for page ${currentPage}.`}</p>
            ) : (
                <div className="flex-grow-1">
                    <UserList
                        users={usersToDisplay}
                        onEditUser={openEditModal}
                        onDeleteUser={handleDeleteUser}
                    />
                </div>
            )}

            {/* Pagination */}
            {!isLoading &&
                !error &&
                totalPages > 0 &&
                usersToDisplay.length > 0 && (
                    <div className="flex flex-col sm:flex-row justify-center items-center sm:space-x-3 space-y-3 sm:space-y-0 mt-8 pt-6 border-t border-slate-200">
                        <div className="flex space-x-3">
                            <button
                                onClick={() =>
                                    handlePageChange(
                                        Math.max(1, currentPage - 1)
                                    )
                                }
                                disabled={currentPage === 1 || isLoading}
                                className="w-21 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium text-center" // Added w-28 and text-center
                            >
                                Previous
                            </button>
                            <span className="px-2 py-2 text-md text-slate-700 font-medium self-center">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                onClick={() =>
                                    handlePageChange(currentPage + 1)
                                }
                                disabled={
                                    isLoading || currentPage >= totalPages
                                }
                                className="w-21 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium text-center" // Added w-28 and text-center
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            {isModalOpen && modalMode === "add" && (
                <AddCard
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onSubmit={handleAddFormSubmit}
                    formError={formSubmitError}
                />
            )}
            {isModalOpen && modalMode === "edit" && currentUserDataForForm && (
                <EditCard
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onSubmit={handleEditFormSubmit}
                    initialData={currentUserDataForForm}
                    formError={formSubmitError}
                />
            )}
        </div>
    );
}
