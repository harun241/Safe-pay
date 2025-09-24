// import "./globals.css";

import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";

export default function BaseLayout({ children }) {
  return (
    <>
      <div className="md:px-3 lg:max-w-[1600px] mx-auto">
        <Navbar></Navbar>
        {children}
        <Footer></Footer>
      </div>
    </>
  );
}