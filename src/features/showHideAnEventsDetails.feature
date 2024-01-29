Feature: Show/hide an event's details

    Scenario: By default, only minimal information about the event that caught the user's attention is visible.
        Given the events have been loaded
        When a user clicks show more details button on the event, that caught the user's attention
        Then the event is expanded and the rest of the information is shown
    
    Scenario: The user has clicked show details button and now wants to show less details to scroll quicker.
        Given the events have been loaded
        When user clicks hide details button
        Then the additional information about the selected event is become hidden