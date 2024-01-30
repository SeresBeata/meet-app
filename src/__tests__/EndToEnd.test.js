//import puppeteer
import puppeteer from "puppeteer";

//create a new scope using the describe() function
describe("show/hide an event details", () => {
  test("An event element is collapsed by default", async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("http://localhost:3000/");

    //use class selector for event element
    await page.waitForSelector(".event");

    // use id selector for event's details
    const eventDetails = await page.$(".event #details");
    expect(eventDetails).toBeNull();

    browser.close();
  });

  test("User can expand an event to see its details", async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("http://localhost:3000/");

    //use class selector for event element
    await page.waitForSelector(".event");
    await page.click(".event .details-btn");

    // use id selector for event's details
    const eventDetails = await page.$(".event #details");
    expect(eventDetails).toBeDefined();

    browser.close();
  });

  test("User can collapse an event to hide details", async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("http://localhost:3000/");

    //use class selector for event element
    await page.waitForSelector(".event");
    await page.click(".event .details-btn");
    await page.click(".event .details-btn");

    // use id selector for event's details
    const eventDetails = await page.$(".event #details");
    expect(eventDetails).toBeNull();

    browser.close();
  });
});
