import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage/HomePage';
import NavBar from './components/NavBar';
import FaceQR from './recognize/Recognize';
import ComparePage from './compare/Compare';
import DetectionPage from './Detection/detection';
function App() {

  return (
    <>
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <NavBar/>
        <main className="flex flex-col justify-center items-center flex-grow py-20">
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/face-register" element={<FaceQR/>} />
            <Route path="/face-compare" element={<ComparePage/>} />
            <Route path="/detection" element={<DetectionPage/>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
    </>
  )
}

export default App