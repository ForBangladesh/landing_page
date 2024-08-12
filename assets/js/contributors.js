// Function to create social link elements
function createSocialLink(href, iconClass) {
    if (!href) return '';
    return `<a href="${href}" target="_blank"><i class="${iconClass}"></i></a>`;
}

// Function to generate the markup for a team member
function generateMemberMarkup({ name, github, linkedin, facebook, x, website, title, picture_url }, imageUrl) {
    return `
        <div class="col-md-4 d-flex flex-column">
            <img src="${imageUrl}" class="img-fluid rounded-circle w-50 align-self-center" alt="${name}-Picture" />
            <div class="container">
                <div class="text-center my-3">
                    <h5>${name}</h5>
                    <span>${title ?? 'Contributor'}</span>
                </div>
                <div class="social-links d-flex justify-content-center">
                    ${createSocialLink(website, 'bi bi-globe')}
                    ${createSocialLink(github ? `https://github.com/${github}` : null, 'bi bi-github')}
                    ${createSocialLink(x ? `https://x.com/${x}` : null, 'bi bi-twitter-x')}
                    ${createSocialLink(facebook ? `https://facebook.com/${facebook}` : null, 'bi bi-facebook')}
                    ${createSocialLink(linkedin ? `https://linkedin.com/in/${linkedin}` : null, 'bi bi-linkedin')}
                </div>
            </div>
        </div>
    `;
}

// Function to load the JSON data and render the markup
function loadTeamMembers() {
    const teamContainer = document.getElementById('team-container');

    fetch(`/assets/data/contributors.json?cache-bust=${+new Date().getTime()}`)
        .then(response => response.json())
        .then(data => {
            data
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value)
            .forEach(member => {
                const fallbackUrl = member.picture_url || (member.github ? `https://github.com/${member.github}.png` : '') || "/assets/img/team/team-member.jpg";
                
                const memberMarkup = generateMemberMarkup(member, fallbackUrl);
                    teamContainer.innerHTML += memberMarkup;
            });
        })
        .catch(error => console.error('Error loading team members:', error));
}

// Call the function on page load
document.addEventListener('DOMContentLoaded', loadTeamMembers);
