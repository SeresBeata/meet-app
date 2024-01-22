//import built-in functions from jest-cucumber
import { loadFeature, defineFeature } from "jest-cucumber";

//import functions from React Testing Library
import { render, within, waitFor } from "@testing-library/react";
//import the userEvent handler from @testling-library/user-event
import userEvent from "@testing-library/user-event";
//import function from api.js
import { getEvents } from "../api";
//import the App component
import App from "../App";

//use loadFeature() to load a Gherkin file (.feature)
const feature = loadFeature("./src/features/filterEventsByCity.feature");

//use defineFeature() to define the code for the loaded Gherkin file (.feature)
defineFeature(feature, (test) => {
  test("When user has not searched for a specific city, show upcoming events from all cities.", ({
    given,
    when,
    then,
  }) => {
    let AppComponent;
    given("the main page has been opened", () => {
      AppComponent = render(<App />);
    });

    when("user does not search for any city", () => {});

    then(
      "a list of all available events for all the cities is shown",
      async () => {
        const AppDOM = AppComponent.container.firstChild;
        const EventListDOM = AppDOM.querySelector("#event-list");

        await waitFor(() => {
          const EventListItems =
            within(EventListDOM).queryAllByRole("listitem");
          expect(EventListItems.length).toBe(32);
        });
      }
    );
  });

  test("User should see a list of suggestions when they search for a city.", ({
    given,
    when,
    then,
  }) => {
    let AppComponent;
    given("the main page has been opened", () => {
      AppComponent = render(<App />);
    });

    let CitySearchDOM;
    when("user starts to type in the city textbox", async () => {
      const user = userEvent.setup();
      const AppDOM = AppComponent.container.firstChild;
      CitySearchDOM = AppDOM.querySelector("#city-search");
      const citySearchInput = within(CitySearchDOM).queryByRole("textbox");
      await user.type(citySearchInput, "Berlin");
    });

    then(
      "a list of cities (suggestions) that match the typed one is shown",
      async () => {
        const suggestionListItems =
          within(CitySearchDOM).queryAllByRole("listitem");
        expect(suggestionListItems).toHaveLength(2);
      }
    );
  });

  test("User can select a city from the suggested list.", ({
    given,
    and,
    when,
    then,
  }) => {
    let AppComponent;
    let AppDOM;
    let CitySearchDOM;
    let citySearchInput;
    given(
      "the user has typed a city in the city textbox (e.g. “Berlin”)",
      async () => {
        AppComponent = render(<App />);
        const user = userEvent.setup();
        AppDOM = AppComponent.container.firstChild;
        CitySearchDOM = AppDOM.querySelector("#city-search");
        citySearchInput = within(CitySearchDOM).queryByRole("textbox");
        await user.type(citySearchInput, "Berlin");
      }
    );

    let suggestionListItems;
    and("the list of suggested cities is showing", () => {
      suggestionListItems = within(CitySearchDOM).queryAllByRole("listitem");
      expect(suggestionListItems).toHaveLength(2);
    });

    when(
      "user selects a city from the list (e.g. “Berlin, Germany”)",
      async () => {
        const user = userEvent.setup();
        await user.click(suggestionListItems[0]);
      }
    );

    then(
      "the content in the city textbox is changed to the selected city (i.e. “Berlin, Germany”)",
      () => {
        expect(citySearchInput.value).toBe("Berlin, Germany");
      }
    );

    and(
      "a list of all available events for the selected city (e.g. “Berlin, Germany”) is shown",
      async () => {
        const EventListDOM = AppDOM.querySelector("#event-list");
        const EventListItems = within(EventListDOM).queryAllByRole("listitem");
        const allEvents = await getEvents();

        // filtering the list of all events down to events located in Germany
        // citySearchInput.value should have the value "Berlin, Germany" at this point
        const berlinEvents = allEvents.filter(
          (event) => event.location === citySearchInput.value
        );
        expect(EventListItems).toHaveLength(berlinEvents.length);
      }
    );
  });
});
