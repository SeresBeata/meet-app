//import render() function from the @testing-library/react package to mock an accurate representation of the original React component
import { render } from "@testing-library/react";
//import the userEvent handler from @testling-library/user-event
import userEvent from "@testing-library/user-event";
//import the component, which should be tested
import NumberOfEvents from "../components/NumberOfEvents";

//create a new group/“scope” called "<NumberOfEvents /> component" via the describe() function
describe("<NumberOfEvents/> component", () => {
  let NumberOfEventsComponent;
  //use beforeEach
  beforeEach(() => {
    NumberOfEventsComponent = render(<NumberOfEvents />);
  });

  //create test described as "renders textbox"
  test("renders textbox", () => {
    const NumberOfEventsTextBox =
      NumberOfEventsComponent.queryByRole("textbox");
    expect(NumberOfEventsTextBox).toBeInTheDocument();
  });
});
