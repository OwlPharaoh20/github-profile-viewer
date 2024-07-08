//Import relevant html elements to javascript by declaring the variables 

const APIURL = 'https://api.github.com/users/'
const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

// Async Function to Fetch username from Github API 
async function getUser(username) {
    try {
        const { data } = await  axios (APIURL + username)

        createUserCard(data)
        getRepos(username)
    } catch (err) {
        if(err.response.status === 404) {
            createErrorCard ('No Profile with this username')
        }
    }
}


//async function to get user's repositories count 
async function getRepos (username) {
    try {
        const {data} = await axios(APIURL + username + '/repos?sort=created')
        addReposToCard(data)
    } catch (err) {
        createErrorCard('Problem fetching repos')
    }

}



//function to create HTML Element for User Card.
function createUserCard(user) {
    const userID = user.name || user.login 
    const userBio = user.bio ? `<p> ${user.bio}</p>` : ''
    const cardHTML = `
      <div class="card">
      <div>
      <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
      </div>

      <div class="user-info"> 
      <h2>${userID}</h2>
      ${userBio}
      <ul>
      <li> ${user.followers} <strong> Followers </strong> </li>
      <li> ${user.following} <strong> Following </strong> </li>
      <li> ${user.public_repos} <strong> Repos </strong> </li>
      </ul>

      <div id="repos"></div>
      </div>

    </div>
    `
main.innerHTML = cardHTML 
  
}

//Function to create Error card
function createErrorCard(msg) {
    const cardHTML = `
    <div class = "card">
    <h1> ${msg} </h1>
    </div>
    
    `
    main.innerHTML = cardHTML  
}


//function to add repository details to HTML card 
function addReposToCard (repos) {
    const reposEl = document.getElementById('repos')
repos 
.slice(0, 5)
.foreach ( repo => {
    const repoEl = document.createElement('a')
    repoEl.classList.add('repo')
    repoEl.href = repo.html_url
    repoEl.target = '_blank'
    repoEl.innerText = repo.name

    reposEl.appendChild(repoEl)

})

}


//add event listener for the search query 
form.addEventListener('submit', (e) => {
    e.preventDefault()
    const user = search.value 

    if(user) {
        getUser(user)

        search.value =''
    }
})





