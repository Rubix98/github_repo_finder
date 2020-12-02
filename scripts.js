const fetchReposByUserName = async (user_name) => {
    const api_call = await fetch(`https://api.github.com/users/${user_name}/repos`);
    const data = await api_call.json();
    return data;
};

function findRepos() {
    event.preventDefault();
    const user_name = document.getElementById("user_name").value;
    fetchReposByUserName(user_name).then(response => {
        console.log(response);
    });
}
