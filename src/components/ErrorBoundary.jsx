import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorMessage: error?.message || "Unknown error" };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100vh",
            padding: 24,
            fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
            background: "#fff",
            color: "#111",
          }}
        >
          <h1 style={{ fontSize: 28, marginBottom: 12 }}>
            Error Boundary: app in errore
          </h1>
          <p style={{ fontSize: 16, marginBottom: 16 }}>
            Messaggio: <strong>{this.state.errorMessage}</strong>
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            style={{
              padding: "10px 14px",
              borderRadius: 8,
              border: "1px solid #111",
              background: "#111",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Ricarica
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;