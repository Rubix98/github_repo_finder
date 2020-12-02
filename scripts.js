/* Searches for specific user's repositories 
 * Arguments:
 *  - user_name:string - name of the user 
 * Returns:
 *  - array of user's repositories in JSON format 
 *  - empty array if user does not exist */
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

/* Searches for specific user's repositories with specific name
 * Arguments:
 *  - user_name:string - name of the user
 *  - repo_name:string - name of the repository 
 * Returns:
 *  - array of user's repositories with specific name in JSON format 
 *  - empty array if no results found */
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

/* Searches for repositories with specific name
 * Arguments:
 *  - repo_name:string - name of the repository 
 * Returns:
 *  - array of repositories with specific name in JSON format 
 *  - empty array if no results found */
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

/* Shows found results on the website or shows error message if gets empty array
 * Arguments:
 *  - repos:Array - array of repositories in JSON format 
 * Returns:
 *  - nothing */
function displayRepos(repos) {
    const error_message_containter = document.getElementById("error_message");
    const repos_container = document.getElementById("repos");
    repos_container.innerHTML = "";
    
    // Displaying hiding error messsage
    if (repos.length == 0) {
        error_message.innerHTML = "Brak pasujących wyników";
    }
    else {
        error_message.innerHTML = "";
    }

    for (let i = 0; i < repos.length; ++i) {
        const repo = repos[i];
        const info = [repo.name, repo.owner.login, repo.stargazers_count, repo.language];
        
        // Cloning repo_info template
        const cln = document.getElementsByClassName("repo_info")[0].cloneNode(true);
        cln.style.display = "block";
        cln.href = repo.html_url;
        
        // Updating values of attributes
        for (let i = 0; i < info.length; i++) {
            cln.children[i].children[0].innerHTML = info[i];
        }
        
        // Adding new div to #repos
        try {
            repos_container.appendChild(cln);
        } catch(e) {
            consol.error(e);
        }
    }
}

/* looks for repositories according to the given data (user's name, repo's name) in the #form
 * Arguments:
 *  - nothing
 * Returns:
 *  - nothing */
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
