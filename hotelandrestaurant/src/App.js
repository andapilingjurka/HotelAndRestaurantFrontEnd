import FoodsCrud from './Admin/FoodsCrud';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import MenuCrud from './Admin/MenuCrud';
import Menu from './components/Menu/Menu';



function App() {
  return (
    <Router>
        <Routes>
        <Route path="/" element={<Menu />} />
          <Route path="/foods" element={<FoodsCrud />} />
          <Route path="/menu" element={<MenuCrud />} />
          

        
        </Routes>
    </Router>
  );
}

export default App;
