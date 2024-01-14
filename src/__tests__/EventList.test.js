//import render() function from the @testing-library/react package to mock an accurate representation of the original React component
import { render } from "@testing-library/react";
//import the component, which should be tested
import EventList from "../components/EventList";
//import function from api.js
import { getEvents } from "../api";

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
