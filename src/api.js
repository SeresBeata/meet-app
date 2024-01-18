//import mock data
import mockData from "./mock-data";

//create "extractLocations" function to extract event locations out of an array of events and remove duplicates.
export const extractLocations = (events) => {
  //Use map() to create a new array with only locations.
  const extractedLocations = events.map((event) => event.location);
  //Remove all duplicates by creating another new array using the spread operator and spreading a Set.
  const locations = [...new Set(extractedLocations)];
  return locations;
};

//create "getEvents" function to return the mockData representing the list of all events.
//create function to check token validity
const checkToken = async (accessToken) => {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
  );
  const result = await response.json();
  return result;
};

export const getEvents = async () => {
  return mockData;

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
