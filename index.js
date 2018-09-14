const githubURI = 'https://api.github.com/repos';
const repoName = 'js-ajax-fetch-lab';

var user;

function getToken() {
  //change to your token to run in browser, but set
  //back to '' before committing so all tests pass
  return '';
}

function forkRepo() {
  const learn = 'learn-co-curriculum';
  console.log("Going to fork repo");
  fetch(
    `${githubURI}/${learn}/${repoName}/forks`,
    {
      method: 'POST',
      headers: {
        Authorization: `token ${getToken()}`
      }
    }
  ).then(resp => resp.json())
  .then( json => showResults(json));
}

function showResults(resp) {
  console.log("show results",resp);
  let link=`<a href=${resp.html_url}>${resp.full_name}</a>`;
  user = resp.owner.login;
  document.getElementById('results').innerHTML = link;
}

function createIssue() {
  //use this function to create an issue based on the values input in index.html
  const issueData = {
    title: document.getElementById('title').value,
    body: document.getElementById('body').value
  };
  console.log('create issue',issueData);
  fetch(
    `${githubURI}/${user}/${repoName}/issues`,
    {
      method: 'POST',
      body: JSON.stringify(issueData),
      headers: {
        Authorization: `token ${getToken()}`
      }
    }
  ).then(resp => getIssues(resp))
}

function getIssues() {
  fetch(
    `${githubURI}/${user}/${repoName}/issues`,
    {
      method: 'GET',
      headers: {
        Authorization: `token ${getToken()}`
      }
    }
  ).then(res => res.json())
    .then(json => console.log(json));
}


// function showIssues(issues) {
//   console.log ("show issues",resp);
//   let html = '<ul>';
//   issues.forEach ( function (issue) {
//     html += `<li>${issue.title}<li>`
//   })
//   html += '<ul>';
//   document.getElementById('issues').innerHTML = html;
// }
