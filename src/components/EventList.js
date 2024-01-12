import Event from "./Event";

//create and export EventList child component
const EventList = ({ events }) => {
  return (
    <ul id="event-list">
      {/* 
      Use map() iterative method. 
      Make sure that the .map() loop is only executed if events is defined.
        - If "events" is a truthy value (e.g., not null, undefined, 0, false, etc.), then return the result of the .map() loop. 
        - If it’s not a truthy value, render a null (i.e., render nothing).
      */}
      {events
        ? events.map((event) => <Event key={event.id} event={event} />)
        : null}
    </ul>
  );
};

export default EventList;
