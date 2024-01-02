// Define that JavaScript code should be executed in "strict mode", to write cleaner code, like preventing  the usage of undeclared variables.
"use strict";

// Require Google package, along with the Google Calendar
const { google } = require("googleapis");
const calendar = google.calendar("v3");

//Set access level with SCOPES
const SCOPES = [
  "https://www.googleapis.com/auth/calendar.events.public.readonly",
];

//Use hidden values to access the Google Calendar API
const { CLIENT_SECRET, CLIENT_ID, CALENDAR_ID } = process.env;

//redirect uri
const redirect_uris = ["https://seresbeata.github.io/achievement-5/"];

//Create and call a new instance of the google.auth.OAuth2 method from the Google API. This instance accepts CLIENT_ID, CLIENT_SECRET, and the redirect URL as parameters.
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  redirect_uris[0]
);

//Create getAuthURL function
//Use Node.js module.exports to create and export the function’s logic
module.exports.getAuthURL = async () => {
  //Scopes array is passed to the `scope` option.
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });

  //Return the statusCode, headers, and body
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify({
      authUrl,
    }),
  };
};
