const baseUrl = "https://cf-blast.livelikecdn.com/api/v1";
const producerToken = "TESitiE_U0FmcP-6nNPLV2z_NMAdqXoaWTo3BYPHfra0TWyo3udnTg";
const clientId = "QcGUcxr97Bf05j6Dz1v8anj7FPWZ58GWlIatzJkz";
const rewardTableId = "931ae648-64f8-498d-9f5e-07ff37464d15";
const rewardItemId = "569a1c65-8dc6-4e2d-aa76-06ca7f23a818";

const createEnvironmentAsync = async ({ programTitle, leaderboardName, rewardTableId }) => {
    const program = await createProgramAsync(programTitle);
    const leaderboard = await createLeaderboardAsync(leaderboardName);
    const linkLeaderboardWithProgramResponse = linkLeaderboardWithProgramAsync({ programId: program.id, leaderboardId: leaderboard.id });
    console.log(linkLeaderboardWithProgramResponse);
    const linkRewardTableWithProgramResponse = await linkRewardTableWithProgramAsync({ programId: program.id, rewardTableId: rewardTableId });
    console.log(linkRewardTableWithProgramResponse);
    const startProgramResponse = await startProgramAsync({ programId: program.id });
    console.log(startProgramResponse);

    return {
        programId: program.id,
        leaderboardId: leaderboard.id
    };
};

const handleCreateEnvironmentButtonAsync = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const programTitle = document.querySelector("#program-title-input").value;
    const leaderboardName = document.querySelector("#leaderboard-name-input").value;
    const environment = await createEnvironmentAsync({ programTitle, leaderboardName, rewardTableId });
    const resultLinkElement = document.querySelector("#result-link");
    resultLinkElement.setAttribute("href", `https://livelike.github.io/psg-experience?program_id=${environment.programId}`);
    resultLinkElement.innerHTML = "Result Link";
};

const runAsync = async () => {
    console.log("Started...");
    document.querySelector("#create-environment-button").addEventListener("click", handleCreateEnvironmentButtonAsync);
};