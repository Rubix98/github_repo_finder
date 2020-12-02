const fetchReposByUserName = async (user_name) => {
    const api_call = await fetch(`https://api.github.com/users/${user_name}/repos`);
    const data = await api_call.json();
    return data;
};

function findRepos() {
    event.preventDefault();
    const user_name = document.getElementById("user_name").value;
    const repos = document.getElementById("repos")
    
    
    fetchReposByUserName(user_name).then(response => {
        repos.innerHTML = "";

        for (let i = 0; i < response.length; ++i) {
            const repo = response[i];
            const info = [repo.name, repo.owner.login, repo.stargazers_count, repo.language];
            
            let cln = document.getElementsByClassName("repo_info")[0].cloneNode(true);
            cln.style.display = "block";
            
            for (let i = 0; i < info.length; i++) {
                cln.children[i].children[0].innerHTML = info[i];
            }
          
            try {
                repos.appendChild(cln);
            } catch(e) {
                consol.error(e);
            }
        }
    });
}
