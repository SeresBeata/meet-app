//import puppeteer
import puppeteer from "puppeteer";

//create a new scope using the describe() function
describe("show/hide an event details", () => {
  let browser;
  let page;
  //use beforeAll()
  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto("http://localhost:3000/");

    //use class selector for event element
    await page.waitForSelector(".event");
  });

  //use afterAll()
  afterAll(() => {
    browser.close();
  });

  test("An event element is collapsed by default", async () => {
    // use id selector for event's details
    const eventDetails = await page.$(".event #details");
    expect(eventDetails).toBeNull();
  });

  test("User can expand an event to see its details", async () => {
    await page.click(".event .details-btn");

    // use id selector for event's details
    const eventDetails = await page.$(".event #details");
    expect(eventDetails).toBeDefined();
  });

  test("User can collapse an event to hide details", async () => {
    await page.click(".event .details-btn");

    // use id selector for event's details
    const eventDetails = await page.$(".event #details");
    expect(eventDetails).toBeNull();
  });
});
