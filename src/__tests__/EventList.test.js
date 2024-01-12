//import render() function from the @testing-library/react package to mock an accurate representation of the original React component
import { render } from "@testing-library/react";
//import the component, which should be tested
import EventList from "../components/EventList";

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
  test("renders correct number of events", () => {
    EventListComponent.rerender(
      <EventList events={[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]} />
    );
    expect(EventListComponent.getAllByRole("listitem")).toHaveLength(4);
  });
});
