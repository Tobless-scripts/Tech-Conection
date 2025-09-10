export default function UserCard({ user, onMatch, onDecline }) {
    return (
        <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition bg-white">
            <div className="mb-3">
                {/* Name & Role */}
                <h3 className="font-semibold text-gray-900 text-lg">
                    {user.name}
                </h3>
                <p className="text-sm text-gray-600">{user.role}</p>

                {/* Location & Experience */}
                <p className="text-sm text-gray-500 mt-1">
                    📍 {user.location} • {user.experience} yr
                    {user.experience > 1 ? "s" : ""} exp
                </p>

                {/* Skills */}
                <div className="mt-3 space-y-1">
                    <p className="text-sm text-gray-700">
                        <span className="font-medium text-gray-800">Has:</span>{" "}
                        {user.skillsHave.join(", ")}
                    </p>
                    <p className="text-sm text-gray-700">
                        <span className="font-medium text-gray-800">
                            Wants:
                        </span>{" "}
                        {user.skillsWant.join(", ")}
                    </p>
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
                <button
                    onClick={() => onDecline(user.id)}
                    className="flex-1 py-1.5 px-3 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded transition cursor-pointer"
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
