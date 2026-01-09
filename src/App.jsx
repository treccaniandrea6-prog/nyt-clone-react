import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { NewsProvider } from "./context/NewsContext";

function App() {
  return (
    <BrowserRouter>
      <NewsProvider>
        <AppRoutes />
      </NewsProvider>
    </BrowserRouter>
  );
}

export default App;