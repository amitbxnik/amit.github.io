import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./DarkMode.css";
import WebglBackground from "./components/WebglBackground";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("./pages/Home"));
const AllProjects = lazy(() => import("./pages/AllProjects"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <>
      <WebglBackground />
      <BrowserRouter>
        <Header />
        <main>
          <Suspense
            fallback={
              <div className="container text-center py-5">Loading...</div>
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<AllProjects />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
