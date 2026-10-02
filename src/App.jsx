import { Link, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Mahasiswa from "./pages/Mahasiswa";
import About from "./pages/About";

const App = () => {
    return (
        <div>
            <nav>
                <Link to="/">Home</Link>
                {" | "}
                <Link to="/mahasiswa">Mahasiswa</Link>
                {" | "}
                <Link to="/about">About</Link>
            </nav>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/mahasiswa" element={<Mahasiswa />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </div>
    );
};

export default App;
