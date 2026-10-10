import { Link, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Mahasiswa from "./pages/Mahasiswa";
import About from "./pages/About";
import DetailMahasiswa from "./pages/DetailMahasiswa";
import Users from "./pages/Users";
import UsersQuery from "./pages/UsersQuery";

const App = () => {
    return (
        <div className="min-h-screen bg-zinc-50 text-zinc-900">
            <header className="border-b border-zinc-200 bg-white">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                    <Link
                        to="/"
                        className="text-lg font-semibold tracking-tight"
                    >
                        Student<span className="text-emerald-600">Hub</span>
                    </Link>

                    <nav className="flex items-center gap-6 text-sm">
                        <Link
                            to="/"
                            className="text-zinc-600 transition hover:text-zinc-950"
                        >
                            Home
                        </Link>

                        <Link
                            to="/mahasiswa"
                            className="text-zinc-600 transition hover:text-zinc-950"
                        >
                            Mahasiswa
                        </Link>

                        <Link
                            to="/about"
                            className="text-zinc-600 transition hover:text-zinc-950"
                        >
                            About
                        </Link>

                        <Link
                            to="/users"
                            className="text-zinc-600 transition hover:text-zinc-950"
                        >
                            Users
                        </Link>
                        <Link
                            to="/usersQuery"
                            className="text-zinc-600 transition hover:text-zinc-950"
                        >
                            Users Query
                        </Link>
                    </nav>
                </div>
            </header>

            <main className="mx-auto max-w-6xl px-6 py-10">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/mahasiswa" element={<Mahasiswa />} />
                    <Route
                        path="/mahasiswa/:id"
                        element={<DetailMahasiswa />}
                    />
                    <Route path="/about" element={<About />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/usersQuery" element={<UsersQuery />} />
                </Routes>
            </main>
        </div>
    );
};

export default App;
