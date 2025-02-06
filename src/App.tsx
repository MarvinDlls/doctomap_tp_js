import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Info from "./pages/Info/Info";
import Edit from "./pages/Edit/Edit";
import Create from "./pages/Create/Create";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/info/:doctorId" element={<Info />} />
        <Route path="/edit/:doctorId" element={<Edit />} />
        <Route path="/create" element={<Create />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
