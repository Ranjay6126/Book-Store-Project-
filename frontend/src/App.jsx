import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreateBooks from "./pages/CreateBooks";
import EditBook from "./pages/EditBook";
import ShowBook from "./pages/ShowBook";
import DeleteBook from "./pages/DeleteBook";

const App = () => {
  return (
    <div className="min-h-screen">
      {/* Books Store System brand header, shown on every screen */}
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books/create" element={<CreateBooks />} />
          <Route path="/books/details/:id" element={<ShowBook />} />
          <Route path="/books/edit/:id" element={<EditBook />} />
          <Route path="/books/delete/:id" element={<DeleteBook />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      <footer className="border-t border-white/8 py-7">
        <p className="text-center text-xs text-slate-500">
          Created by Ranjay Prajapati
        </p>
      </footer>
    </div>
  );
};

export default App;
