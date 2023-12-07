# Meet-Events-App

## Table of contents

- [Introduction](#introduction)
- [Screenshots to represent the project](#screenshots-to-represent-the-project)
- [Tasks in the project](#tasks-in-the-project)
- [Link to the App](#link-to-the-app)
- [Technologies](#technologies)
- [Dependencies](#dependencies)
- [Development mode](#development-mode)
- [Build](#build)
- [User stories and features](#user-stories-and-features)
- [References](#references)

### Introduction

The aim of this project was to build a serverless, progressive web application (PWA) with React using a test-driven development (TDD) technique. The application uses the Google Calendar API to fetch upcoming events.

### Screenshots to represent the project

### Tasks in the project

### Link to the App

A link to the live, hosted version of the app: [https://seresbeata.github.io/achievement-5/](https://seresbeata.github.io/achievement-5/)

### Technologies

### Dependencies

### Development mode

Use `npm run start` to run the app in development mode. Navigate to "http://localhost:3000/achievement-5". The application automatically reload in case of changes any of the source files.

### Build

Build the app for production to the build folder, with the following terminal command:

`npm run build`

### User stories and features

#### FEATURE 1: FILTER EVENTS BY CITY

_As a user, I would like to be able to filter events by city so that I can see the list of events that take place in that city._

- **Scenario 1:** When user hasn’t searched for a specific city, show upcoming events from all cities.

  - **Given** the main page has been opened,
  - **when** user does not search for any city,
  - **then** a list of all available events for all the cities is shown.

- **Scenario 2:** User should see a list of suggestions when they search for a city.

  - **Given** the main page has been opened,
  - **when** user starts to type in the city textbox,
  - **then** a list of cities (suggestions) that match the typed one is shown.

- **Scenario 3:** User can select a city from the suggested list.

  - **Given** the user has typed a city in the city textbox and the list of suggested cities is showing;,
  - **when** user selects a city from the list,
  - **then** a list of all available events for the selected city is shown.

#### FEATURE 2: SHOW/HIDE AN EVENT'S DETAILS

_As a user, I would like to be able to show/hide event details so that I can see more/less information about an event._

- **Scenario 1:** By default, only minimal information about the event that caught the user's attention is visible.

  - **Given** the events have been loaded,
  - **when** a user clicks show more details button on the event, that caught the user's attention,
  - **then** the event is expanded and the rest of the information is shown.

- **Scenario 2:** The user has clicked show details button and now wants to show less details to scroll quicker.

  - **Given** the events have been loaded,
  - **when** user clicks hide details button,
  - **then** the additional information about the selected event is become hidden.

#### FEATURE 3: SPECIFY NUMBER OF EVENTS

_As a user, I would like to be able to specify the number of events I want to view in the app so that I can see more or fewer events in the events list at once._

- **Scenario 1:** When a user opens the app and hasn’t specified the number of events.

  - **Given** the main page has been opened,
  - **when** the users hasn’t specified the number of events,
  - **then** a default list of 10 events are displayed on the page.

- **Scenario 2:** When a user wants to change the events shown to a higher number of events.

  - **Given** the default of 10 events has been displayed to the user,
  - **when** the user specifies a higher number of events than the default,
  - **then** the list is updated and new events are displayed to the user.

- **Scenario 3:** When a user wants to change the events to show less than the default number of events.

  - **Given** the default of 10 events has been displayed to the user,
  - **when** the user specifies a lower number of events than the default,
  - **then** the list is updated and fewer events are displayed to the user.

#### FEATURE 4: USE THE APP WHEN OFFLINE

_As a user, I would like to be able to use the app when offline so that I can see the events I viewed the last time I was online._

- **Scenario 1:** Show cached data when there's no internet connection.

  - **Given** the user has no internet connection,
  - **when** user goes to previously viewed events,
  - **then** cached data, stored inside the app, is provided to the user.

- **Scenario 2:** Display error when user changes any filter settings.

  - **Given** the user has no internet connection,
  - **when** the user changes the settings,
  - **then** "no internet" message is displayed.

#### FEATURE 5: ADD AN APP SHORTCUT TO THE HOME SCREEN

_As a user, I would like to be able to add the app shortcut to my home screen so that I can open the app faster._

- **Scenario 1:** User installs the app as a shortcut on their device home screen.

  - **Given** the user has wanted to open the app faster,
  - **when** the user selects to install the app as a shortcut,
  - **then** a shortcut is created on users homescreen.

#### FEATURE 6: DISPLAY CHARTS VISUALIZING EVENT DETAILS

_As a user, I would like to be able to see a chart showing the upcoming events in each city so that I know what events are organized in which city._

- **Scenario 1:** A chart is displayed with the number of upcoming events in each city.

  - **Given** the main page has been opened,
  - **when** users selects chart view,
  - **then** a chart with the number of upcoming events for every city is displayed.

### References
