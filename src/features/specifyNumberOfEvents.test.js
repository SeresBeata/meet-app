//import built-in functions from jest-cucumber
import { loadFeature, defineFeature } from "jest-cucumber";

//import functions from React Testing Library
import { render, within, waitFor } from "@testing-library/react";
//import the userEvent handler from @testling-library/user-event
import userEvent from "@testing-library/user-event";
//import the App component
import App from "../App";

//use loadFeature() to load a Gherkin file (.feature)
const feature = loadFeature("./src/features/specifyNumberOfEvents.feature");

//use defineFeature() to define the code for the loaded Gherkin file (.feature)
defineFeature(feature, (test) => {
  test("When a user opens the app and has not specified the number of events.", ({
    given,
    when,
    then,
  }) => {
    let AppComponent;
    given("the main page has been opened", () => {
      AppComponent = render(<App />);
    });

    when("the users has not specified the number of events", () => {});

    then("a default list of 32 events are displayed on the page", async () => {
      AppComponent = render(<App />);
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector("#event-list");

      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole("listitem");
        expect(EventListItems.length).toBe(32);
      });
    });
  });

  test("When a user wants to change the events shown to a higher number of events.", ({
    given,
    when,
    then,
  }) => {
    let AppComponent;
    given(
      "the default of 32 events has been displayed to the user",
      async () => {
        AppComponent = render(<App />);
        const AppDOM = AppComponent.container.firstChild;
        const EventListDOM = AppDOM.querySelector("#event-list");

        await waitFor(() => {
          const EventListItems =
            within(EventListDOM).queryAllByRole("listitem");
          expect(EventListItems.length).toBe(32);
        });
      }
    );

    when(
      "the user specifies a higher number of events than the default",
      async () => {
        const user = userEvent.setup();
        const AppDOM = AppComponent.container.firstChild;
        const numberOfEventsDOM = AppDOM.querySelector("#number-of-events");
        const numberTextBox = within(numberOfEventsDOM).queryByRole("textbox");

        await user.type(numberTextBox, "{backspace}{backspace}33");
      }
    );

    then("the list is updated and new events are displayed to the user", () => {
      const AppDOM = AppComponent.container.firstChild;
      const eventList = within(AppDOM).queryAllByRole("listitem");
      expect(eventList.length).toEqual(33);
    });
  });

  test("When a user wants to change the events to show less than the default number of events.", ({
    given,
    when,
    then,
  }) => {
    let AppComponent;

    given(
      "the default of 32 events has been displayed to the user",
      async () => {
        AppComponent = render(<App />);
        const AppDOM = AppComponent.container.firstChild;
        const EventListDOM = AppDOM.querySelector("#event-list");

        await waitFor(() => {
          const EventListItems =
            within(EventListDOM).queryAllByRole("listitem");
          expect(EventListItems.length).toBe(32);
        });
      }
    );

    when(
      "the user specifies a lower number of events than the default",
      async () => {
        const user = userEvent.setup();
        const AppDOM = AppComponent.container.firstChild;
        const numberOfEventsDOM = AppDOM.querySelector("#number-of-events");
        const numberTextBox = within(numberOfEventsDOM).queryByRole("textbox");

        await user.type(numberTextBox, "{backspace}{backspace}31");
      }
    );

    then(
      "the list is updated and fewer events are displayed to the user",
      () => {
        const AppDOM = AppComponent.container.firstChild;
        const eventList = within(AppDOM).queryAllByRole("listitem");
        expect(eventList.length).toEqual(31);
      }
    );
  });
});
