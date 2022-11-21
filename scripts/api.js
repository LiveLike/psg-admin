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

const guid = () => {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}