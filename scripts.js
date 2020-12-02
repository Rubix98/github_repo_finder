const fetchReposByUserName = async (user_name) => {
    const api_call = await fetch(`https://api.github.com/search/repositories?q=user:${user_name}`);
    if (api_call.status != 200) {
        return [];
    }
    else {
        const data = await api_call.json();
        return data.items;
    }
};

const fetchReposByUserNameAndRepoName = async (user_name, repo_name) => {
    const api_call = await fetch(`https://api.github.com/search/repositories?q=user:${user_name}+${repo_name}+in:name`);
    if (api_call.status != 200) {
        return [];
    }
    else {
        const data = await api_call.json();
        return data.items;
    }
};

const fetchReposByRepoName = async (repo_name) => {
    const api_call = await fetch(`https://api.github.com/search/repositories?q=${repo_name}+in:name`);
    if (api_call.status != 200) {
        return [];
    }
    else {
        const data = await api_call.json();
        return data.items;
    }
};

function displayRepos(repos) {
    const error_message_containter = document.getElementById("error_message");
    const repos_container = document.getElementById("repos");
    repos_container.innerHTML = "";
    
    if (repos.length == 0) {
        error_message.innerHTML = "Brak pasujących wyników";
    }
    else {
        error_message.innerHTML = "";
    }

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
        fetchReposByUserNameAndRepoName(user_name, repo_name).then(response => {displayRepos(response)});
    }
    else if (user_name == "" && repo_name != "") {
        fetchReposByRepoName(repo_name).then(response => {displayRepos(response)});
    }
    else {
        document.getElementById("error_message").innerHTML = "Podaj nazwę użytkownika i/lub nazwę repozytorium";
    }
}
