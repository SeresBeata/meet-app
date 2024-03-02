//import mock data
import mockData from "./mock-data";
//import NProgress
import NProgress from "nprogress";

//create "extractLocations" function to extract event locations out of an array of events and remove duplicates.
export const extractLocations = (events) => {
  //Use map() to create a new array with only locations.
  const extractedLocations = events.map((event) => event.location);
  //Remove all duplicates by creating another new array using the spread operator and spreading a Set.
  const locations = [...new Set(extractedLocations)];
  return locations;
};

//create function to check token validity
const checkToken = async (accessToken) => {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
  );
  const result = await response.json();
  return result;
};

//create "getEvents" function to return the list of events.
export const getEvents = async () => {
  //return mock data in case of localhost
  if (window.location.href.startsWith("http://localhost")) {
    return mockData;
  }

  // if the user is online, the app will request data from the Google Calendar API;
  //if the user is offline, the app will load the event list data stored in localStorage:
  if (!navigator.onLine) {
    const events = localStorage.getItem("lastEvents");
    NProgress.done();
    return events ? JSON.parse(events) : [];
  }

  //make a GET request to the Google Calendar API in case of access token
  const token = await getAccessToken();

  if (token) {
    removeQuery();
    const url =
      "https://l679h29nq0.execute-api.eu-central-1.amazonaws.com/dev/api/get-events" +
      "/" +
      token;
    const response = await fetch(url);
    const result = await response.json();
    if (result) {
      NProgress.done();
      // save the fetched events data to localStorage:
      localStorage.setItem("lastEvents", JSON.stringify(result.events));
      return result.events;
    } else return null;
  }
};

//remove unnecessary query parameters from URL
const removeQuery = () => {
  let newurl;
  if (window.history.pushState && window.location.pathname) {
    newurl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname;
    window.history.pushState("", "", newurl);
  } else {
    newurl = window.location.protocol + "//" + window.location.host;
    window.history.pushState("", "", newurl);
  }
};

//redirect user to log in with Google, if the token doesn’t exist or is invalid, and need to get a new one.
const getToken = async (code) => {
  const encodeCode = encodeURIComponent(code);
  const response = await fetch(
    "https://l679h29nq0.execute-api.eu-central-1.amazonaws.com/dev/api/token" +
      "/" +
      encodeCode
  );
  const { access_token } = await response.json();
  access_token && localStorage.setItem("access_token", access_token);

  return access_token;
};

//create and export a new async function to get the access token
export const getAccessToken = async () => {
  // try to retrieve the access token
  const accessToken = localStorage.getItem("access_token");
  //check whether an access token was found in localStorage
  const tokenCheck = accessToken && (await checkToken(accessToken));
  //checks for an authorization code, if no token is found (!accessToken)
  if (!accessToken || tokenCheck.error) {
    await localStorage.removeItem("access_token");
    const searchParams = new URLSearchParams(window.location.search);
    const code = await searchParams.get("code");
    //redirect user to the Google Authorization screen, where they can sign in and receive their authorization code, if no authorization code is found (!code)
    if (!code) {
      const response = await fetch(
        "https://l679h29nq0.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url"
      );
      const result = await response.json();
      const { authUrl } = result;
      return (window.location.href = authUrl);
    }
    return code && getToken(code);
  }
  return accessToken;
};
