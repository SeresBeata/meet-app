Feature: Filter events by city

    Scenario: When user has not searched for a specific city, show upcoming events from all cities.
        Given the main page has been opened
        When user does not search for any city
        Then a list of all available events for all the cities is shown

    Scenario: User should see a list of suggestions when they search for a city.
        Given the main page has been opened
        When user starts to type in the city textbox
        Then a list of cities (suggestions) that match the typed one is shown

    Scenario: User can select a city from the suggested list.
        Given the user has typed a city in the city textbox (e.g. “Berlin”) 
        And the list of suggested cities is showing
        When user selects a city from the list (e.g. “Berlin, Germany”)
        And the city name in the city textbox is changed to the selected city (i.e. “Berlin, Germany”)
        Then a list of all available events for the selected city (e.g. “Berlin, Germany”) is shown