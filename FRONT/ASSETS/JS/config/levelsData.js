const levelsData = [
    {
        ennemis: {
            nb: 4,
            type: "blocs",
        },
        levelTime: 15000,
        endLevel: null,
    },
    {
        ennemis: {
            nb: 0,
            type: null,
        },
        levelTime: 5000,
        endLevel: null,
    },
    {
        ennemis: {
            nb: 8,
            type: "blocs",
        },
        levelTime: 15000,
        endLevel: null,
    },
    {
        ennemis: {
            nb: 0,
            type: null,
        },
        levelTime: 5000,
        endLevel: null,
    },
    {
        ennemis: {
            nb: 4,
            type: "soucoupe",
        },
        levelTime: 15000,
        endLevel: null,
    },
    {
        ennemis: {
            nb: 0,
            type: null,
        },
        levelTime: 5000,
        endLevel: null,
    },
];

export const levelChoice = (i) => levelsData.find((_, index) => i === index);
