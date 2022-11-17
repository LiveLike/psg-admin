
const producerToken = "TESitiE_U0FmcP-6nNPLV2z_NMAdqXoaWTo3BYPHfra0TWyo3udnTg";
const clientId = "QcGUcxr97Bf05j6Dz1v8anj7FPWZ58GWlIatzJkz";
const rewardTableId = "931ae648-64f8-498d-9f5e-07ff37464d15";


const createProgramAsync = async ({ programTitle }) => {
    console.log("create program " + programTitle);
    return { id: "" };
};

const createLeaderboardAsync = async ({ leaderboardName }) => {
    console.log("create leaderboard " + leaderboardName);
    return { id: "" };
};

const linkLeaderboardWithProgramAsync = async ({ programId, leaderboardId }) => {
    console.log("link leaderboard with program");
};

const linkRewardTableWithProgramAsync = async ({ programId, rewardTableId }) => {
    console.log("link reward table with program");
};

const startProgramAsync = async ({ programId }) => {
    console.log("start program");
};

const createEnvironmentAsync = async ({ programTitle, leaderboardName, rewardTableId }) => {
    const program = await createProgramAsync({ programTitle });
    const leaderboard = await createLeaderboardAsync({ leaderboardName });
    await linkRewardTableWithProgramAsync({ programId: program.id, rewardTableId: rewardTableId });
    await linkLeaderboardWithProgramAsync({ programId: program.id, leaderboardId: leaderboard.id });
    await startProgramAsync({ programId: program.id });
};

const handleCreateEnvironmentButtonAsync = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const programTitle = document.querySelector("#program-name-input").value;
    const leaderboardName = document.querySelector("#leaderboard-name-input").value;
    await createEnvironmentAsync({ programTitle, leaderboardName, rewardTableId });
};

const runAsync = async () => {
    console.log("Started...");
    document.querySelector("#create-environment-button").addEventListener("click", handleCreateEnvironmentButtonAsync);
};