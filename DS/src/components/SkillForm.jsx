import { useEffect, useState } from "react";

function SkillForm({ initialUser, onSubmit }) {
    const [have, setHave] = useState("");
    const [want, setWant] = useState("");

    // Load from localStorage on mount and when initialUser changes
    useEffect(() => {
        if (initialUser) {
            setHave(initialUser.skillsHave.join(", "));
            setWant(initialUser.skillsWant.join(", "));
        } else {
            setHave("");
            setWant("");
        }
    }, [initialUser]);

    const handleSubmit = (e) => {
        setHave("");
        setWant("");
        e.preventDefault();

        if (!have.trim() || !want.trim()) return;

        const user = {
            id: initialUser?.id || Date.now(),
            name: "CurrentUser",
            skillsHave: have
                .split(",")
                .map((s) => s.trim())
                .filter((s) => s),
            skillsWant: want
                .split(",")
                .map((s) => s.trim())
                .filter((s) => s),
        };

        localStorage.setItem("currentUser", JSON.stringify(user));
        onSubmit(user);
    };

    const handleClearInputs = () => {
        // Only clear inputs without affecting connections
        setHave("");
        setWant("");
    };

    // Clear inputs on page refresh
    useEffect(() => {
        const handleBeforeUnload = () => {
            setHave("");
            setWant("");
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-xl mx-auto flex flex-col gap-5 p-6 bg-white rounded-2xl shadow-md border border-gray-100"
        >
            <input
                type="text"
                placeholder="Skills I Have (e.g. HTML, CSS)..."
                value={have}
                onChange={(e) => setHave(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition cursor-pointer"
                required
            />

            <input
                type="text"
                placeholder="Skills I Want to Learn (e.g. React, Node)..."
                value={want}
                onChange={(e) => setWant(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition cursor-pointer"
                required
            />

            <div className="flex flex-col sm:flex-row gap-3">
                <button
                    type="submit"
                    className="w-full sm:w-auto bg-blue-600 text-white text-xs font-semibold py-2.5 px-4 rounded-xl hover:bg-blue-700 transition cursor-pointer"
                >
                    {initialUser ? "Update" : "Find Matches"}
                </button>
                <button
                    type="button"
                    onClick={handleClearInputs}
                    className="w-full sm:w-auto bg-gray-500 text-white text-xs font-semibold py-2.5 px-6 rounded-xl hover:bg-gray-600 transition cursor-pointer"
                >
                    Clear Input
                </button>
            </div>
        </form>
    );
}

export default SkillForm;
