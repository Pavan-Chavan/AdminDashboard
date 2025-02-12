import Aos from "aos";
import { useEffect } from "react";
import SrollTop from "./components/common/ScrollTop";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/effect-cards";
import "aos/dist/aos.css";
import "./styles/index.scss";
import { Provider } from "react-redux";
import { store } from "./store/store";

if (typeof window !== "undefined") {
  import("bootstrap");
}
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollTopBehaviour from "./components/common/ScrollTopBehaviour";
import Home from "./pages";
import LogIn from "./pages/others/login";
import AdminDashboard from "./pages/dashboard/admin-dashboard/dashboard";
import AdminAddVenue from "./pages/dashboard/admin-dashboard/add-venue";
import Category from "./pages/dashboard/admin-dashboard/category";
import Venue from "./pages/dashboard/admin-dashboard/venue";
import WebSocketComponent from "./pages/bajarbhav-pulling/WebSocketComponent";


function App() {
  useEffect(() => {
    Aos.init({
      duration: 1200,
      once: true,
    });
  }, []);

  return (
    <main>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route index element={<AdminDashboard />} />
              <Route path="admin-login" element={<LogIn role={"admin"}/>} />
              
              <Route path="admin-dashboard">
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="bhajarbhav-pulling" element={<WebSocketComponent />} />
                <Route path="categories" element={<Category />} />
                <Route path="venues" element={<Venue />} />
                <Route path="venue/:mode" element={<AdminAddVenue />} />
              </Route>
            </Route>
          </Routes>
          <ScrollTopBehaviour />
        </BrowserRouter>

        <SrollTop />
      </Provider>
    </main>
  );
}

export default App;
