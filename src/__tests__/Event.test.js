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
});
