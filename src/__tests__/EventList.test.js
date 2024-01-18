//import functions from the @testing-library/react package to mock an accurate representation of the original React component
import { render, within, waitFor } from "@testing-library/react";
//import the component, which should be tested
import EventList from "../components/EventList";
//import function from api.js
import { getEvents } from "../api";
//import App parent component for integration testing
import App from "../App";

//UNIT TESTS
//create a new group/“scope” called "<EventList /> component" via the describe() function
describe("<EventList /> component", () => {
  let EventListComponent;
  beforeEach(() => {
    EventListComponent = render(<EventList />);
  });

  //create test described as "has an element with "list" role"
  test("has an element with 'list' role", () => {
    expect(EventListComponent.queryByRole("list")).toBeInTheDocument();
  });

  //create test described as "renders correct number of events"
  test("renders correct number of events", async () => {
    const allEvents = await getEvents();
    EventListComponent.rerender(<EventList events={allEvents} />);
    expect(EventListComponent.getAllByRole("listitem")).toHaveLength(
      allEvents.length
    );
  });
});

//INTEGRATION TESTS
//create a new group/“scope” called "<EventList /> integration" via the describe() function
describe("<EventList /> integration", () => {
  //create test described as "renders a list of 32 events when the app is mounted and rendered"
  test("renders a list of 32 events when the app is mounted and rendered", async () => {
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;
    const EventListDOM = AppDOM.querySelector("#event-list");
    await waitFor(() => {
      const EventListItems = within(EventListDOM).queryAllByRole("listitem");
      expect(EventListItems.length).toBe(32);
    });
  });
});
