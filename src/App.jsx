import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { NewsProvider } from "./context/NewsContext";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <NewsProvider>
          <AppRoutes />
        </NewsProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;