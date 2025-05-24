import { useMemo } from "react";
import UserCard from "./UserCard";

function MatchList({ currentUser, users, onMatch, onDecline }) {
    const matches = useMemo(() => {
        if (!currentUser?.skillsHave || !currentUser?.skillsWant) return [];

        const normalize = (str) => str.toLowerCase().replace(/[.\-\s]/g, "");

        return users.filter((user) => {
            if (!user || user.id === currentUser.id) return false;

            const userHas = user.skillsHave?.map(normalize) || [];
            const userWants = user.skillsWant?.map(normalize) || [];
            const myHas = currentUser.skillsHave.map(normalize);
            const myWants = currentUser.skillsWant.map(normalize);

            return (
                userWants.some((skill) => myHas.includes(skill)) &&
                myWants.some((skill) => userHas.includes(skill))
            );
        });
    }, [currentUser, users]);

    return (
        <div>
            {matches.length === 0 ? (
                <p className="text-gray-500 text-center py-4">
                    No potential connections found. Try adjusting your skills.
                </p>
            ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                    {matches.map((user) => (
                        <UserCard
                            key={user.id}
                            user={user}
                            onMatch={onMatch}
                            onDecline={onDecline}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default MatchList;
