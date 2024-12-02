import { Octokit } from "https://esm.sh/@octokit/core";

const octokit = new Octokit({
    auth: ""
});


async function GetGithubCommit(repoName) {
    try {
        let commitRes = await octokit.request('GET /repos/{owner}/{repo}/commits', {
            owner: 'ellie-chanc',
            repo: repoName,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        });

        return commitRes["data"].length;
    } catch (err) {
        console.log(`Error name: ${err.name}`);
        console.log("Unable to get github commit");
        return 0;
    }
}