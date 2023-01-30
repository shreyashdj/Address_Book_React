import Home from "./components/home/Home";
import Form from "./components/form/Form.jsx";
import Header from "./components/header/Header";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route exact path="/form" element={<Form />}></Route>
          <Route exact path="/AddressBookForm/:id" element={<Form />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
