const fetchReposByUserName = async (user_name) => {
    const api_call = await fetch(`https://api.github.com/users/${user_name}/repos`);
    const data = await api_call.json();
    return data;
};

const fetchReposByUserNameAndRepoName = async (user_name, repo_name) => {
    const api_call = await fetch(`https://api.github.com/repos/${user_name}/${repo_name}`);
    const data = await api_call.json();
    return data;
};

function displayRepos(repos) {
    const repos_container = document.getElementById("repos")
    repos_container.innerHTML = "";

    for (let i = 0; i < repos.length; ++i) {
        const repo = repos[i];
        const info = [repo.name, repo.owner.login, repo.stargazers_count, repo.language];
        
        const cln = document.getElementsByClassName("repo_info")[0].cloneNode(true);
        cln.style.display = "block";
        
        for (let i = 0; i < info.length; i++) {
            cln.children[i].children[0].innerHTML = info[i];
        }
      
        try {
            repos_container.appendChild(cln);
        } catch(e) {
            consol.error(e);
        }
    }
}

function findRepos() {
    event.preventDefault();
    const user_name = document.getElementById("user_name").value;
    const repo_name = document.getElementById("repo_name").value;
    
    if (user_name != "" && repo_name == "") {
        fetchReposByUserName(user_name).then(response => {displayRepos(response)});
    }
    else if (user_name != "" && repo_name != "") {
        fetchReposByUserNameAndRepoName(user_name, repo_name).then(response => {displayRepos([response])});
    }
}
