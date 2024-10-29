import { Component, ErrorInfo } from "react";
import { IErrorBoundaryProps, IErrorBoundaryState } from "../../models";
import ErrorMessage from "../errorMessage/ErrorMessage";

class ErrorBoundary extends Component<
  IErrorBoundaryProps,
  IErrorBoundaryState
> {
  private rateLimitMessage =
    "Too many requests. I'm using a free API version with rate limits. Please wait a moment and try again.";

  state = {
    error: false,
    errorMessage: "",
  };

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log(error, errorInfo);

    const errorMessage =
      error.message === "429" ? this.rateLimitMessage : error.message;
    this.setState({ error: true, errorMessage });
  }

  render() {
    const { error, errorMessage } = this.state;

    const displayMessage =
      this.props.message && errorMessage !== this.rateLimitMessage
        ? this.props.message
        : errorMessage;

    if (error) {
      return <ErrorMessage message={displayMessage} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
