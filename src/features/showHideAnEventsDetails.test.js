//import built-in functions from jest-cucumber
import { loadFeature, defineFeature } from "jest-cucumber";

//import functions from React Testing Library
import { render, within, waitFor } from "@testing-library/react";
//import the userEvent handler from @testling-library/user-event
import userEvent from "@testing-library/user-event";
//import the App component
import App from "../App";

//use loadFeature() to load a Gherkin file (.feature)
const feature = loadFeature("./src/features/showHideAnEventsDetails.feature");

//use defineFeature() to define the code for the loaded Gherkin file (.feature)
defineFeature(feature, (test) => {
  test("By default, only minimal information about the event that caught the user's attention is visible.", ({
    given,
    when,
    then,
  }) => {
    let AppComponent;
    given("the events have been loaded", async () => {
      AppComponent = render(<App />);
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector("#event-list");

      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole("listitem");
        expect(EventListItems.length).toBe(32);
      });
    });

    when(
      "a user clicks show more details button on the event, that caught the user's attention",
      async () => {
        const user = userEvent.setup();
        const AppDOM = AppComponent.container.firstChild;
        const showDetailsButton = AppDOM.querySelector(".details-btn");

        await user.click(showDetailsButton);
      }
    );

    then(
      "the event is expanded and the rest of the information is shown",
      () => {
        const AppDOM = AppComponent.container.firstChild;
        const details = AppDOM.querySelector("#details");
        expect(details).toBeInTheDocument();
      }
    );
  });

  test("The user has clicked show details button and now wants to show less details to scroll quicker.", ({
    given,
    when,
    then,
  }) => {
    let AppComponent;
    given("the events have been loaded", async () => {
      const user = userEvent.setup();

      AppComponent = render(<App />);
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector("#event-list");

      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole("listitem");
        expect(EventListItems.length).toBe(32);
      });

      const showDetailsButton = AppDOM.querySelector(".details-btn");
      await user.click(showDetailsButton);

      const details = AppDOM.querySelector("#details");
      expect(details).toBeInTheDocument();
    });

    when("user clicks hide details button", async () => {
      const user = userEvent.setup();
      const AppDOM = AppComponent.container.firstChild;
      const hideDetailsButton = AppDOM.querySelector(".details-btn");

      await user.click(hideDetailsButton);
    });

    then(
      "the additional information about the selected event is become hidden",
      () => {
        const AppDOM = AppComponent.container.firstChild;
        const details = AppDOM.querySelector("#details");
        expect(details).not.toBeInTheDocument();
      }
    );
  });
});
