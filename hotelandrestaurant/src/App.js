import FoodsCrud from './Admin/FoodsCrud';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";



function App() {
  return (
    <Router>
        <Routes>
          <Route path="/foods" element={<FoodsCrud />} />
        
        </Routes>
    </Router>
  );
}

export default App;
