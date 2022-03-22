export const init = {
  headers: new Headers({
    Authorization: "token " + process.env.REACT_APP_OAUTH_TOKEN,
  }),
};

if (!process.env.REACT_APP_OAUTH_TOKEN) init.headers.delete("Authorization");

export const apiBase = "https://api.github.com/search/users";