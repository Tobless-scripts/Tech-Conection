export default function UserCard({ user, onMatch, onDecline }) {
    return (
        <div className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition">
            <div className="mb-3">
                <h3 className="font-medium text-gray-800">{user.name}</h3>
                <p className="text-sm text-gray-600 mt-1">
                    <span className="font-medium">Skills:</span>{" "}
                    {user.skillsHave.join(", ")}
                </p>
                <p className="text-sm text-gray-600">
                    <span className="font-medium">Wants:</span>{" "}
                    {user.skillsWant.join(", ")}
                </p>
            </div>
            <div className="flex gap-2">
                <button
                    onClick={() => onDecline(user.id)}
                    className="flex-1 py-1.5 px-3 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm rounded transition cursor-pointer"
                >
                    Not Now
                </button>
                <button
                    onClick={() => onMatch(user.id)}
                    className="flex-1 py-1.5 px-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded transition cursor-pointer"
                >
                    Connect
                </button>
            </div>
        </div>
    );
}
