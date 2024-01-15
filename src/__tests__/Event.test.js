//import render() function from the @testing-library/react package to mock an accurate representation of the original React component
import { render } from "@testing-library/react";
//import the userEvent handler from @testling-library/user-event
import userEvent from "@testing-library/user-event";
//import the component, which should be tested
import Event from "../components/Event";
//import mock data
import mockData from "../mock-data";
//import function from api.js
import { getEvents } from "../api";

//create "event" const
const event = mockData;

//create a new group/“scope” called "<Event /> component" via the describe() function
describe("<Event /> component", () => {
  //declare variables
  let EventComponent;
  let allEvents;

  //use beforeAll()
  beforeAll(async () => {
    allEvents = await getEvents();
  });

  //use beforeEach()
  beforeEach(async () => {
    EventComponent = render(<Event event={event[0]} />);
  });

  //create test described as "renders event title by using 'summary' key"
  test("renders event title by using 'summary' key", () => {
    expect(
      EventComponent.queryByText(allEvents[0].summary)
    ).toBeInTheDocument();
  });

  //create test describd as "renders event time by using 'created' key"
  test("renders event time by using 'created' key", () => {
    expect(
      EventComponent.queryByText(allEvents[0].created)
    ).toBeInTheDocument();
  });

  //create test described as "renders event location by using 'location' key"
  test("renders event location by using 'location' key", () => {
    expect(
      EventComponent.queryByText(allEvents[0].location)
    ).toBeInTheDocument();
  });

  //create test described as "renders event details button with the title 'show details'"
  test("renders event details button with the title 'show details'", () => {
    expect(EventComponent.queryByText("show details")).toBeInTheDocument();
  });

  //create test described as "by default, events details section should be hidden"
  test("by default, events details section should be hidden", () => {
    expect(
      EventComponent.container.querySelector("#details")
    ).not.toBeInTheDocument();
  });

  //create test described as "shows the details section when the user clicks on the show details button"
  test("shows the details section when the user clicks on the show details button", async () => {
    const user = userEvent.setup();
    const showDetailsButton = EventComponent.queryByText("show details");
    await user.click(showDetailsButton);
    const descriptionSection =
      EventComponent.container.querySelector("#details");
    expect(descriptionSection).toBeInTheDocument();
  });
});
