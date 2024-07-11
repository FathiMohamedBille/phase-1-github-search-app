document.getElementById('search-form').addEventListener('submit', function (e) {
 e.preventDefault(); const query = document.getElementById('search-input').value; 
 searchUsers(query); 
});
 function searchUsers(query) { 
fetch(`https://api.github.com/search/users?q=${query}`, {
 headers: { 
'Accept': 'application/vnd.github.v3+json'
 }
 })
  .then(response => response.json()) .then(data => displayUsers(data.items)) .catch(error => console.error('Error:', error)); 
} 
function displayUsers(users) { 
const resultsDiv = document.getElementById('results'); resultsDiv.innerHTML = '';
users.forEach(user => {
 const userDiv = document.createElement('div');
 userDiv.innerHTML = ` <img src="${user.avatar_url}" alt="${user.login}" width="50"> <a href="${user.html_url}" target="_blank">${user.login}</a> `; 
 userDiv.addEventListener('click', () => fetchUserRepos(user.login)); 
 resultsDiv.appendChild(userDiv);
 });
 }
  function fetchUserRepos(username) {
 fetch(`https://api.github.com/users/${username}/repos`, {
 headers: { 'Accept': 'application/vnd.github.v3+json' } 
})
 .then(response => response.json()) .then(data => displayRepos(data)) .catch(error => console.error('Error:', error));
 } 
 function displayRepos(repos) { 
const reposDiv = document.getElementById('repos');
 reposDiv.innerHTML = ''; 
 repos.forEach(repo => {
 const repoDiv = document.createElement('div'); 
 repoDiv.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`; reposDiv.appendChild(repoDiv); 
});
 }
 let searchType = 'users';
document.getElementById('search-form').addEventListener('submit', function (e) { e.preventDefault();
 const query = document.getElementById('search-input').value;
 if (searchType === 'users') { 
searchUsers(query);
 } else {
     searchRepos(query); 
} }); 
function toggleSearchType() { 
searchType = searchType === 'users' ? 'repos' : 'users'; const searchInput = document.getElementById('search-input');
 searchInput.placeholder = searchType === 'users' ? 'Search for users' : 'Search for repos'; 
} 
function searchRepos(query) {
 fetch(`https://api.github.com/search/repositories?q=${query}`, {
 headers: {
 'Accept': 'application/vnd.github.v3+json' 
}
 })
  .then(response => response.json()) .then(data => displayRepos(data.items)) .catch(error => console.error('Error:', error)); 
}
 document.getElementById('toggle-button').addEventListener('click',toggleSearchType);