// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyDk1sUgiLFSXBq1LFX-QQzg9DCSRuIGhuM",
    authDomain: "asq-app-9ba9b.firebaseapp.com",
    databaseURL: "https://asq-app-9ba9b.firebaseio.com",
    projectId: "asq-app-9ba9b",
    storageBucket: "asq-app-9ba9b.appspot.com",
    messagingSenderId: "718451838306"
  }
};
