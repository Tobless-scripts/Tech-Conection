import { useEffect, useState } from "react";
import MatchList from "../components/MatchList";
import { mockUsers } from "../data/mockUsers";
import SkillForm from "../components/SkillForm";
import { X } from "lucide-react";

function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const [matches, setMatches] = useState([]);
    const [declinedUsers, setDeclinedUsers] = useState([]);

    // Load data from localStorage on initial render
    useEffect(() => {
        const savedUser = localStorage.getItem("currentUser");
        const savedMatches = localStorage.getItem("userMatches");
        const savedDeclines = localStorage.getItem("declinedUsers");

        if (savedUser) setCurrentUser(JSON.parse(savedUser));
        if (savedMatches) setMatches(JSON.parse(savedMatches));
        if (savedDeclines) setDeclinedUsers(JSON.parse(savedDeclines));
    }, []);

    const handleUserUpdate = (user) => {
        if (user) {
            setCurrentUser(user);
            localStorage.setItem("currentUser", JSON.stringify(user));
        } else {
            // Clear everything when user is deleted
            setCurrentUser(null);
            setMatches([]);
            setDeclinedUsers([]);
            localStorage.removeItem("currentUser");
            localStorage.removeItem("userMatches");
            localStorage.removeItem("declinedUsers");
        }
    };

    const handleMatch = (userId) => {
        const matchedUser = mockUsers.find((u) => u.id === userId);
        if (!matchedUser) return;

        const newMatches = [...matches, matchedUser];
        setMatches(newMatches);
        localStorage.setItem("userMatches", JSON.stringify(newMatches));

        // Remove from declined if they were previously declined
        setDeclinedUsers((prev) => prev.filter((id) => id !== userId));
        localStorage.setItem(
            "declinedUsers",
            JSON.stringify(declinedUsers.filter((id) => id !== userId))
        );
    };

    const handleUnmatch = (userId) => {
        const updatedMatches = matches.filter((match) => match.id !== userId);
        setMatches(updatedMatches);
        localStorage.setItem("userMatches", JSON.stringify(updatedMatches));

        // Optional: Add to declined list to prevent showing again
        const declined = JSON.parse(
            localStorage.getItem("declinedUsers") || []
        );
        if (!declined.includes(userId)) {
            localStorage.setItem(
                "declinedUsers",
                JSON.stringify([...declined, userId])
            );
        }
    };

    const handleDecline = (userId) => {
        if (!declinedUsers.includes(userId)) {
            const newDeclines = [...declinedUsers, userId];
            setDeclinedUsers(newDeclines);
            localStorage.setItem("declinedUsers", JSON.stringify(newDeclines));
        }
    };

    // Filter out declined users and already matched users
    const filteredMockUsers = mockUsers.filter(
        (user) =>
            !declinedUsers.includes(user.id) &&
            !matches.some((match) => match.id === user.id)
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <main className="mx-auto px-6 py-8 md:px-12 sm:py-12">
                <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r sticky top-10 max-h-fit from-indigo-600 to-purple-600 mb-8">
                    Tech Connection Hub
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1 sticky top-28 max-h-fit">
                        <div className="bg-white rounded-xl shadow-md p-6">
                            <SkillForm
                                onSubmit={handleUserUpdate}
                                initialUser={currentUser}
                            />
                        </div>
                    </div>

                    <div className="lg:col-span-2">
                        {currentUser ? (
                            <>
                                <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                                    <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                        Potential Connections
                                    </h2>
                                    <MatchList
                                        currentUser={currentUser}
                                        users={filteredMockUsers}
                                        onMatch={handleMatch}
                                        onDecline={handleDecline}
                                    />
                                </div>

                                {matches.length > 0 && (
                                    <div className="bg-white rounded-xl shadow-md p-6">
                                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                            Your Connections ({matches.length})
                                        </h2>
                                        <div className="grid gap-4 sm:grid-cols-2">
                                            {matches.map((match) => (
                                                <div
                                                    key={match.id}
                                                    className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition relative"
                                                >
                                                    <button
                                                        onClick={() =>
                                                            handleUnmatch(
                                                                match.id
                                                            )
                                                        }
                                                        className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 transition cursor-pointer"
                                                        title="Remove"
                                                    >
                                                        <X size={16} />
                                                    </button>
                                                    <h3 className="font-medium text-gray-800 pr-6">
                                                        {match.name}
                                                    </h3>
                                                    <div className="mt-2 space-y-1">
                                                        <p className="text-sm text-gray-600">
                                                            <span className="font-medium">
                                                                Skills:
                                                            </span>{" "}
                                                            {match.skillsHave.join(
                                                                ", "
                                                            )}
                                                        </p>
                                                        <p className="text-sm text-gray-600">
                                                            <span className="font-medium">
                                                                Learning:
                                                            </span>{" "}
                                                            {match.skillsWant.join(
                                                                ", "
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="bg-white rounded-xl shadow-md p-8 text-center">
                                <h2 className="text-xl font-medium text-gray-700 mb-2">
                                    Welcome to Tech Connection Hub
                                </h2>
                                <p className="text-gray-500">
                                    Enter your skills to start finding people to
                                    learn with!
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;
