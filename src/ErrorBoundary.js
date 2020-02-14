import React, { Component } from "react-dom";
import { Link } from "@reach/router";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true
    };
  }

  componentDidCatch(error, info) {
    console.log("Error caught", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <h1>
          There was an error with this listing.{" "}
          <Link to="/">Click here to go back to the home page</Link>
        </h1>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
