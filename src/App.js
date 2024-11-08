import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import SubjectList from "./components/subjectList";
import StudentList from "./components/studentList";
import GradeDetails from "./components/gradeDetails";
import { useState } from "react";
import Header from "./components/header.";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
  };

  return (
    <Router>
      <Provider store={store}>
        <div className="App">
          <Header onSearch={handleSearchChange} />
          <div className="content" style={{ display: "flex" }}>
            <SubjectList />
            <Routes>
              <Route
                path="/"
                element={<StudentList searchTerm={searchTerm} />}
              />
              <Route
                path="/student"
                element={<StudentList searchTerm={searchTerm} />}
              />
              <Route path="/student/:studentid" element={<GradeDetails />} />
            </Routes>
          </div>
        </div>
      </Provider>
    </Router>
  );
}

export default App;
