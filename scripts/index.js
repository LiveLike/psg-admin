const baseUrl = "https://cf-blast.livelikecdn.com/api/v1";
const producerToken = "VCP0raEPdYnDczwEfx90zOHTFNy8kAFAx0KIuZgCJe3mU2pkdqANOQ";
const clientId = "dpB3eOXAccJnJuFErwp6BX1WbV0u5DSY1DbfNHhS";
const rewardTableId = "5d8fbb6a-14e8-41e0-980f-2d2f93f153f8";
const rewardItemId = "a4fff073-52b8-4429-8850-2ff98f901cea";

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

    const profileType = document.querySelector("#profile-type-select").value;
    const experienceName = `${document.querySelector("#experience-name-input").value} (${guid()})`;

    const environment = await createEnvironmentAsync({ programTitle: experienceName, leaderboardName: experienceName, rewardTableId });

    const experienceLinkElement = document.querySelector("#experience-link");
    const experienceLink = `https://livelike.github.io/psg${profileType == "email-and-nickname" ? "" : "-2"}-experience?program_id=${environment.programId}`;
    experienceLinkElement.setAttribute("href", experienceLink);
    experienceLinkElement.innerHTML = "Experience Link";

    const cmsLinkElement = document.querySelector("#cms-link");
    cmsLinkElement.setAttribute("href", `https://cf-blast.livelikecdn.com/producer/applications/${clientId}/programs/${environment.programId}`);
    cmsLinkElement.innerHTML = "CMS Link";

    generateQrCode({ link: experienceLink });
};

const runAsync = async () => {
    console.log("Started...");
    document.querySelector("#create-environment-button").addEventListener("click", handleCreateEnvironmentButtonAsync);
};
