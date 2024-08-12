import { Component, ErrorInfo } from "react";
import { IErrorBoundaryProps, IErrorBoundaryState } from "../../models";
import ErrorMessage from "../errorMessage/ErrorMessage";

class ErrorBoundary extends Component<
  IErrorBoundaryProps,
  IErrorBoundaryState
> {
  state = {
    error: false,
    errorMessage: "",
  };

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log(error);
    console.log(errorInfo);
    this.setState({ error: true, errorMessage: error.message });
  }

  render() {
    const { error, errorMessage } = this.state;

    if (error) {
      return <ErrorMessage message={errorMessage} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
