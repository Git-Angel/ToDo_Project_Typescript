import { Component, ReactNode, ErrorInfo } from "react";

type ErrorBoundaryProps = {
  children: ReactNode;
   fallback?: ReactNode; 
};

type ErrorBoundaryState = {
  hasError: boolean;
};

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Error caught by boundary:", error, info);
  }

  render() {
if (this.state.hasError) {
  return this.props.fallback ?? (
    <div className="min-h-screen flex items-center justify-center bg-red-50 text-red-800 p-4">
      <div className="max-w-md text-center">
        <h1 className="text-3xl font-bold mb-2">Something went wrong.</h1>
        <p>Please try again later or contact support.</p>
      </div>
    </div>
  );
}


    return this.props.children;
  }
}
