const levelsData = [
    {
        ennemis: {
            nb: 4,
            type: "blocs",
        },
        levelTime: 15000,
    },
    {
        levelTime: 5000,
    },
    {
        ennemis: {
            nb: 8,
            type: "blocs",
        },
        levelTime: 15000,
    },
    {
        levelTime: 5000,
    },
    {
        ennemis: {
            nb: 4,
            type: "soucoupe",
        },
        levelTime: 15000,
    },
    {
        levelTime: 5000,
    },
    {
        ennemis: {
            nb: 8,
            type: "soucoupe",
        },
        levelTime: 15000,
    },
    {
        levelTime: 5000,
    },
];

export const levelChoice = (i) => levelsData.find((_, index) => i === index);
