import './App.css';
import HouseForm from './Components/HouseForm';
import HouseDetail from './Components/HouseDetail';
import UpdateHouseForm from './Components/UpdateHouseForm';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


function App() {
  return (
    <div>
      <Router>

        <Routes>
          <Route exact path="/" element={<HouseForm />} />
          <Route path="/housedetail/:id" element={<HouseDetail />} />
          {/* <Route path="/updateHouseForm/:id" element={<HouseForm />} /> */}
          <Route path="/updateHouseForm/:id" element={<UpdateHouseForm />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
