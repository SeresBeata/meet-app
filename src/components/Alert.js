//import the built-in React Component class from the React package
import { Component } from "react";

//create Alert class component
class Alert extends Component {
  constructor(props) {
    super(props);
    this.color = null;
    this.bgColor = null;
  }

  getStyle = () => {
    return {
      color: this.color,
      backgroundColor: this.bgColor,
      borderWidth: "2px",
      borderStyle: "solid",
      fontWeight: "bolder",
      borderRadius: "7px",
      borderColor: this.color,
      textAlign: "center",
      fontSize: "12px",
      margin: "10px 0",
      padding: "10px",
    };
  };

  render() {
    return (
      <div className="Alert">
        <p style={this.getStyle()}>{this.props.text}</p>
      </div>
    );
  }
}

// create a subclass named InfoAlert
class InfoAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = "rgb(0, 0, 255)"; // blue
    this.bgColor = "rgb(220, 220, 255)"; // light blue
  }
}

// create a subclass named ErrorAlert
class ErrorAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = "rgb(255, 0, 0)"; // red
    this.bgColor = "rgb(255, 220, 220)"; // light red
  }
}

//export InfoAlert and ErrorAlert
export { InfoAlert, ErrorAlert };
