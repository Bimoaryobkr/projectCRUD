export default function NotFoundPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-5 bg-gray-50">
            <h1 className="text-6xl font-bold text-indigo-600">404</h1>
            <p className="text-2xl font-semibold text-gray-700 mt-4">
                Page Not Found.
            </p>
            <p className="text-gray-500 mt-2 mb-6">
                The page is not exist or has been moved.
            </p>
        </div>
    );
}
