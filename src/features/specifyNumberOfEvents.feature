Feature: Specify number of events

    Scenario: When a user opens the app and has not specified the number of events.
        Given the main page has been opened
        When the users has not specified the number of events
        Then a default list of 32 events are displayed on the page
    
    Scenario: When a user wants to change the events shown to a higher number of events.
        Given the default of 32 events has been displayed to the user
        When the user specifies a higher number of events than the default
        Then the list is updated and new events are displayed to the user
    
    Scenario: When a user wants to change the events to show less than the default number of events.
        Given the default of 32 events has been displayed to the user
        When the user specifies a lower number of events than the default
        Then the list is updated and fewer events are displayed to the user