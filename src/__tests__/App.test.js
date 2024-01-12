//import render() function from the @testing-library/react package to mock an accurate representation of the original React component
import { render } from "@testing-library/react";
//import the component, which should be tested
import App from "../App";

//create a new group/“scope” called "<App /> component" via the describe() function
describe("<App /> component", () => {
  //create test described as "renders list of events"
  test("renders list of events", () => {
    const AppDOM = render(<App />).container.firstChild;
    expect(AppDOM.querySelector("#event-list")).toBeInTheDocument();
  });
});