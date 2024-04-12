document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('github-form');
    const searchResults = document.getElementById('search-results');
    const searchUserBtn = document.getElementById('search-user-btn');
    const searchRepoBtn = document.getElementById('search-repo-btn');
  
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const searchTerm = document.getElementById('search').value;
      if (searchUserBtn.classList.contains('active')) {
        const users = await searchUsers(searchTerm);
        displayUsers(users);
      } else if (searchRepoBtn.classList.contains('active')) {
        const repos = await searchRepos(searchTerm);
        displayRepos(repos);
      }
    });
  
    searchUserBtn.addEventListener('click', () => {
      searchUserBtn.classList.add('active');
      searchRepoBtn.classList.remove('active');
    });
  
    searchRepoBtn.addEventListener('click', () => {
      searchRepoBtn.classList.add('active');
      searchUserBtn.classList.remove('active');
    });
  });
  
  async function searchUsers(searchTerm) {
    const response = await fetch(`https://api.github.com/search/users?q=${searchTerm}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    const data = await response.json();
    return data.items;
  }
  
  async function searchRepos(searchTerm) {
    const response = await fetch(`https://api.github.com/search/repositories?q=${searchTerm}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    });
    const data = await response.json();
    return data.items;
  }
  
  function displayUsers(users) {
    const searchResults = document.getElementById('search-results');
    searchResults.innerHTML = '';
    users.forEach(user => {
      const userDiv = document.createElement('div');
      userDiv.innerHTML = `<h3>${user.login}</h3><img src="${user.avatar_url}" alt="${user.login}"><a href="${user.html_url}" target="_blank">View Profile</a>`;
      searchResults.appendChild(userDiv);
    });
  }
  
  function displayRepos(repos) {
    const searchResults = document.getElementById('search-results');
    searchResults.innerHTML = '';
    repos.forEach(repo => {
      const repoDiv = document.createElement('div');
      repoDiv.innerHTML = `<h3>${repo.full_name}</h3><p>${repo.description}</p><a href="${repo.html_url}" target="_blank">View Repository</a>`;
      searchResults.appendChild(repoDiv);
    });
  }
  