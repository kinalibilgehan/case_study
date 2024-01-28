import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ListPage from "./Pages/ListPage";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/ListPage" element={<ListPage />} />
    </Routes>
  );
}

export default App;
