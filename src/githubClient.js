const NUM_REPOS = 10;

class GitHubClient {
  constructor() {
    this.url = "https://api.github.com/graphql";
    this.authorization = `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`;
  }

  getOrganization(organization, cursor) {
    const GET_ORGANIZATION = `
      query($organization: String!, $numRepos: Int!, $cursor: String) {
        organization(login: $organization) {
          name
          url
          repositories(first: $numRepos, after: $cursor) {
            edges {
              node {
                id
                name
                url
                viewerHasStarred
                stargazers {
                  totalCount
                }
              }
            }
            totalCount
            pageInfo {
              endCursor
              hasNextPage
            }
          }
        }
      }
    `;
    const body = {
      query: GET_ORGANIZATION,
      variables: {
        organization,
        numRepos: NUM_REPOS,
        cursor,
      },
    };
    return this._post(body);
  }

  addStarToRepository(repositoryId) {
    const ADD_STAR = `
      mutation ($repositoryId: ID!){
        addStar(input: { starrableId: $repositoryId }) {
          starrable {
            viewerHasStarred
            stargazers {
              totalCount
            }
          }
        }
      }
    `;
    const body = {
      query: ADD_STAR,
      variables: {
        repositoryId,
      },
    };
    return this._post(body);
  }

  removeStarFromRepository(repositoryId) {
    const REMOVE_STAR = `
      mutation ($repositoryId: ID!){
        removeStar(input: { starrableId: $repositoryId }) {
          starrable {
            viewerHasStarred
            stargazers {
              totalCount
            }
          }
        }
      }
    `;
    const body = {
      query: REMOVE_STAR,
      variables: {
        repositoryId,
      },
    };
    return this._post(body);
  }

  async _post(body = {}) {
    const req = await fetch(this.url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: this.authorization,
      },
      body: JSON.stringify(body),
    });
    const res = await req.json();
    return new Promise((resolve, reject) => {
      if (res.errors) {
        reject(res.errors);
      } else {
        resolve(res.data);
      }
    });
  }
}

const client = new GitHubClient();

export default client;
