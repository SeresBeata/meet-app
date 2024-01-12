//import render() function from the @testing-library/react package to mock an accurate representation of the original React component
import { render } from "@testing-library/react";
//import the component, which should be tested
import CitySearch from "../components/CitySearch";

//create a new group/“scope” called "<CitySearch /> component" via the describe() function
describe("<CitySearch /> component", () => {
  //create test described as "renders text input"
  test("renders text input", () => {
    const CitySearchComponent = render(<CitySearch />);
    const cityTextBox = CitySearchComponent.queryByRole("textbox");
    expect(cityTextBox).toBeInTheDocument();
    expect(cityTextBox).toHaveClass("city");
  });
});
