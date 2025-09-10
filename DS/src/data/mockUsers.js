const firstNames = [
    "Hank",
    "Rita",
    "Bob",
    "Sam",
    "Ivy",
    "Mona",
    "Olivia",
    "Zane",
    "Leo",
    "Grace",
    "Frank",
    "Eve",
    "Xena",
    "Umar",
    "Yara",
    "Katie",
    "Nate",
    "Alice",
    "Charlie",
    "Jack",
    "Paul",
];

const lastNames = [
    "Williams",
    "Johnson",
    "Carter",
    "Lee",
    "Chen",
    "Patel",
    "Brown",
    "Thompson",
    "Garcia",
    "Kim",
    "Lopez",
    "Davis",
    "Nguyen",
    "Martins",
    "O'Neil",
    "Singh",
    "Ali",
    "Rodriguez",
];

const locations = [
    "Berlin, Germany",
    "Lagos, Nigeria",
    "San Francisco, USA",
    "Toronto, Canada",
    "Shanghai, China",
    "London, UK",
    "Nairobi, Kenya",
    "Sydney, Australia",
    "Madrid, Spain",
    "Seoul, South Korea",
    "Paris, France",
    "Dubai, UAE",
    "Cape Town, South Africa",
    "Tokyo, Japan",
    "São Paulo, Brazil",
];

const roles = [
    "Frontend Developer",
    "Backend Developer",
    "Fullstack Developer",
    "Mobile Developer",
    "Data Engineer",
    "Machine Learning Engineer",
    "DevOps Engineer",
    "Software Engineer",
];

const skills = [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "React",
    "Vue",
    "Angular",
    "Node.js",
    "Express.js",
    "Django",
    "Flask",
    "MongoDB",
    "SQL",
    "Python",
    "Java",
    "C++",
    "C#",
    "React Native",
    "Flutter",
    "Rust",
    "Go",
    "Ruby",
    "Swift",
    "Kotlin",
    "Scala",
    "GraphQL",
    "Docker",
    "Kubernetes",
    "Next.js",
    "Svelte",
    "TensorFlow",
    "PyTorch",
    "Pandas",
];

function getRandom(arr, count = 1) {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function generateUser(id) {
    const name = `${getRandom(firstNames)} ${getRandom(lastNames)}`;
    return {
        id,
        name,
        location: getRandom(locations)[0],
        role: getRandom(roles)[0],
        experience: Math.floor(Math.random() * 8) + 1, // 1–8 years
        skillsHave: getRandom(skills, Math.floor(Math.random() * 4) + 2), // 2–5
        skillsWant: getRandom(skills, Math.floor(Math.random() * 3) + 1), // 1–3
    };
}

export const mockUsers = Array.from({ length: 1000 }, (_, i) =>
    generateUser(i + 1)
);
