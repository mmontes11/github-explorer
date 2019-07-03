require("dotenv").config();

class GitHubClient {
  constructor() {
    this.url = "https://api.github.com/graphql";
    this.authorization = `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`;
  }

  getOrganization(organization) {
    const GET_ORGANIZATION = `
      {
        organization(login: ${organization}) {
          name
          url
        }
      }
    `;
    const body = {
      query: GET_ORGANIZATION,
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
