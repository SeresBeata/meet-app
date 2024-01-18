//import functions from the @testing-library/react package to mock an accurate representation of the original React component
import { render, within } from "@testing-library/react";
//import the userEvent handler from @testling-library/user-event
import userEvent from "@testing-library/user-event";
//import function from api.js
import { getEvents } from "../api";
//import the component, which should be tested
import App from "../App";

//UNIT TESTS
//create a new group/“scope” called "<App /> component" via the describe() function
describe("<App /> component", () => {
  let AppDOM;
  beforeEach(() => {
    AppDOM = render(<App />).container.firstChild;
  });

  //create test described as "renders list of events"
  test("renders list of events", () => {
    expect(AppDOM.querySelector("#event-list")).toBeInTheDocument();
  });

  //create test described as "render CitySearch"
  test("render CitySearch", () => {
    expect(AppDOM.querySelector("#city-search")).toBeInTheDocument();
  });

  //create test described as "render number of events component"
  test("render number of events component", () => {
    expect(AppDOM.querySelector("#number-of-events")).toBeInTheDocument();
  });
});

//INTEGRATION TESTS
//create a new group/“scope” called "<App /> integration" via the describe() function
describe("<App /> integration", () => {
  //create test described as "renders a list of events matching the city selected by the user"
  test("renders a list of events matching the city selected by the user", async () => {
    const user = userEvent.setup();
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;

    const CitySearchDOM = AppDOM.querySelector("#city-search");
    const CitySearchInput = within(CitySearchDOM).queryByRole("textbox");

    await user.type(CitySearchInput, "Berlin");
    const berlinSuggestionItem =
      within(CitySearchDOM).queryByText("Berlin, Germany");
    await user.click(berlinSuggestionItem);

    const EventListDOM = AppDOM.querySelector("#event-list");
    const allRenderedEventItems =
      within(EventListDOM).queryAllByRole("listitem");

    const allEvents = await getEvents();
    const berlinEvents = allEvents.filter(
      (event) => event.location === "Berlin, Germany"
    );

    expect(allRenderedEventItems.length).toBe(berlinEvents.length);

    allRenderedEventItems.forEach((event) => {
      expect(event.textContent).toContain("Berlin, Germany");
    });
  });
});
