// import "./globals.css";

import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";

export default function BaseLayout({ children }) {
  return (
    <>
      <div className="px-3 md:px-10">
        <Navbar></Navbar>
        {children}
        <Footer></Footer>
      </div>
    </>
  );
}