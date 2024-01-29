//import built-in functions from jest-cucumber
import { loadFeature, defineFeature } from "jest-cucumber";

//use loadFeature() to load a Gherkin file (.feature)
const feature = loadFeature("./src/features/specifyNumberOfEvents.feature");

//use defineFeature() to define the code for the loaded Gherkin file (.feature)
defineFeature(feature, (test) => {});
