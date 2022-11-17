const baseUrl = "https://cf-blast.livelikecdn.com/api/v1";
const producerToken = "TESitiE_U0FmcP-6nNPLV2z_NMAdqXoaWTo3BYPHfra0TWyo3udnTg";
const clientId = "QcGUcxr97Bf05j6Dz1v8anj7FPWZ58GWlIatzJkz";
const rewardTableId = "931ae648-64f8-498d-9f5e-07ff37464d15";
const rewardItemId = "569a1c65-8dc6-4e2d-aa76-06ca7f23a818";

const createProgramAsync = async (title) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${producerToken}`);
    const response = await fetch(`${baseUrl}/programs/`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
            client_id: clientId,
            title: title,
            scheduled_at: new Date(Date.now())
        })
    });

    if (response.ok) {
        return response.json();
    }
    console.warn("unable to create program", response);
};

const createLeaderboardAsync = async (name) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${producerToken}`);
    const response = await fetch(`${baseUrl}/leaderboards/`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
            client_id: clientId,
            name: name,
            reward_item_id: rewardItemId
        })
    });

    if (response.ok) {
        return response.json();
    }
    console.warn("unable to create leaderboard", response);
};

const linkLeaderboardWithProgramAsync = async ({ programId, leaderboardId }) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${producerToken}`);
    const response = await fetch(`${baseUrl}/programs/${programId}/leaderboards/${leaderboardId}/`, {
        method: "PUT",
        headers: headers
    });
    if (response.ok) {
        return response;
    }
    console.warn("unable to link leaderboard with program", response);
};

const linkRewardTableWithProgramAsync = async ({ programId, rewardTableId }) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${producerToken}`);
    const response = await fetch(`${baseUrl}/programs/${programId}/reward-tables/${rewardTableId}/`, {
        method: "PUT",
        headers: headers
    });

    if (response.ok) {
        return response;
    }
    console.warn("unable to link reward table with program", response);
};

const startProgramAsync = async ({ programId }) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${producerToken}`);
    const response = await fetch(`${baseUrl}/programs/${programId}/start/`, {
        method: "POST",
        headers: headers
    });

    if (response.ok) {
        return response.json();
    }
    console.log("unable to start program", response);
};

const createEnvironmentAsync = async ({ programTitle, leaderboardName, rewardTableId }) => {
    const program = await createProgramAsync(programTitle);
    const leaderboard = await createLeaderboardAsync(leaderboardName);
    const linkLeaderboardWithProgramResponse = linkLeaderboardWithProgramAsync({ programId: program.id, leaderboardId: leaderboard.id });
    console.log(linkLeaderboardWithProgramResponse);
    const linkRewardTableWithProgramResponse = await linkRewardTableWithProgramAsync({ programId: program.id, rewardTableId: rewardTableId });
    console.log(linkRewardTableWithProgramResponse);
    const startProgramResponse = await startProgramAsync({ programId: program.id });
    console.log(startProgramResponse);
};

const handleCreateEnvironmentButtonAsync = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const programTitle = document.querySelector("#program-title-input").value;
    const leaderboardName = document.querySelector("#leaderboard-name-input").value;
    await createEnvironmentAsync({ programTitle, leaderboardName, rewardTableId });
};

const runAsync = async () => {
    console.log("Started...");
    document.querySelector("#create-environment-button").addEventListener("click", handleCreateEnvironmentButtonAsync);
};