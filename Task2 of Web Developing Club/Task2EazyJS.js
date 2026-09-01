// Function using async/await, fetch(), try/catch, and innerHTML
async function getUserData() {
  const usernameInput = document.getElementById("username");
  const profileCard = document.getElementById("profileCard");
  const username = usernameInput.value.trim();

  // Validate user input
  if (!username) {
    profileCard.innerHTML = "<p>Please enter a GitHub username to search.</p>";
    return;
  }

  // Set loading state
  profileCard.innerHTML = "<p>Fetching user data...</p>";

  try {
    // Make asynchronous network request using fetch() API
    const response = await fetch(`https://api.github.com/users/${username}`);

    if (!response.ok) {
      throw new Error("User not found");
    }

    const data = await response.json();

    // Dynamically generate and inject HTML using innerHTML and HTML <table>
    profileCard.innerHTML = `
      <div class="user-info">
        <img src="${data.avatar_url}" alt="${data.login}'s Avatar" />
        <div>
          <h3>${data.name || data.login}</h3>
          <p>${data.bio || "No bio available"}</p>
          <div class="stats">
            <span class="badge">Repos: ${data.public_repos}</span>
            <span class="badge">Followers: ${data.followers}</span>
            <span class="badge">Following: ${data.following}</span>
          </div>
        </div>
      </div>
      
      <table style="margin-top: 20px;">
        <tr>
          <th>Username</th>
          <td>${data.login}</td>
        </tr>
        <tr>
          <th>Location</th>
          <td>${data.location || "Not specified"}</td>
        </tr>
        <tr>
          <th>Profile Link</th>
          <td><a href="${data.html_url}" target="_blank">View on GitHub</a></td>
        </tr>
      </table>
    `;
  } catch (error) {
    // Handle error gracefully using try/catch
    profileCard.innerHTML = `<p style="color: #ff6b6b;">Error: ${error.message}</p>`;
  }
}