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
