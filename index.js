var repoName;

function getToken() {
  //change to your token to run in browser, but set
  //back to '' before committing so all tests pass
  return '';
}

function forkRepo() {
  const repo = 'learn-co-curriculum/js-ajax-fetch-lab';
  console.log("Going to fork repo");
  fetch(
    `https://api.github.com/repos/${repo}/forks`,
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
  repoName= resp.full_name;
  let link=`<a href=${resp.html_url}>${resp.full_name}</a>`;
  document.getElementById('results').innerHTML += link;
}

function createIssue() {
  //use this function to create an issue based on the values input in index.html
  const issueData = {
    title: document.getElementById('title').value,
    body: document.getElementById('body').value
  };
  console.log('create issue',issueData);
//  const repo = document.getElementById('results').getElementsByTagName('a')[0].innerHTML;
const repo=repoName;
  console.log("results",document.getElementById('results'));
  console.log("and a",document.getElementById('results').getElementsByTagName('a')[0]);
  console.log('repo ', repo);
  fetch(
    `https://api.github.com/repos/${repo}/issues`,
    {
      method: 'POST',
      body: JSON.stringify(issueData),
      headers: {
        Authorization: `token ${getToken()}`
      }
    }
  ).then(resp => getIssues())
}

function getIssues() {
  //once an issue is submitted, fetch all open issues to see the issues you are creating
//  const repo = document.getElementById('results').getElementsByTagName('a')[0].innerHTML;
const repo=repoName;
  console.log('get issues repo ', repo);
  fetch(
    `https://api.github.com/repos/${repo}/issues`,
    {
      method: 'GET',
      headers: {
        Authorization: `token ${getToken()}`
      }
    }
  ).then(resp => JSON.stringify(resp))
  .then (resp => showIssues(resp))
}

function showIssues(issues) {
  console.log ("show issues",resp);
  let html = '<ul>';
  issues.forEach ( function (issue) {
    html += `<li>${issue.title}<li>`
  })
  html += '<ul>';
  document.getElementById('issues').innerHTML = html;
}
