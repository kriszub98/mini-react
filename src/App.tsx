import "./App.css";
import Modal from "./components/Modal";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import UploadPage from "./pages/Upload/Upload";

function App() {
  return (
    <>
      <Navbar />
      <Home />
      <UploadPage />
      <Modal />
    </>
  );
}

export default App;
