// App.jsx
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
import CreateEditBlog from "./pages/dashboard/admin-dashboard/blog-posts";
import Category from "./pages/dashboard/admin-dashboard/category";
import Venue from "./pages/dashboard/admin-dashboard/blog";
import WebSocketComponent from "./pages/bajarbhav-pulling/WebSocketComponent";
import Blogs from "./pages/dashboard/admin-dashboard/blog";
import Tags from "./pages/dashboard/admin-dashboard/tags";
import SubCategory from "./pages/dashboard/admin-dashboard/subCategory";
import ProtectedRoute from "./components/ProtectedRoute";
import PushNotification from "./pages/dashboard/admin-dashboard/push-notification";
import UserTable from "./components/dashboard/admin-dashboard/users/components/UserTable";
import Users from "./pages/dashboard/admin-dashboard/users";
import BlogComments from "./pages/dashboard/admin-dashboard/blog-comments";

if (typeof window !== "undefined") {
  import("bootstrap");
}

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
              {/* Public Routes */}
              <Route index element={<LogIn role={"admin"} />} />
              <Route path="admin-login" element={<LogIn role={"admin"} />} />

              {/* Protected Admin Routes */}
              <Route path="admin-dashboard">
                <Route
                  path="dashboard"
                  element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="users"
                  element={
                    <ProtectedRoute>
                      <Users />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="blogs-comments"
                  element={
                    <ProtectedRoute>
                      <BlogComments />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="bhajarbhav-pulling"
                  element={
                    <ProtectedRoute>
                      <WebSocketComponent />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="categories"
                  element={
                    <ProtectedRoute>
                      <Category />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="blog-posts"
                  element={
                    <ProtectedRoute>
                      <Blogs />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="push-notification"
                  element={
                    <ProtectedRoute>
                      <PushNotification />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="subcategory"
                  element={
                    <ProtectedRoute>
                      <SubCategory />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="blog-posts/:mode"
                  element={
                    <ProtectedRoute>
                      <CreateEditBlog />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="tags"
                  element={
                    <ProtectedRoute>
                      <Tags />
                    </ProtectedRoute>
                  }
                />
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