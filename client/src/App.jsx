import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import 'tailwindcss/tailwind.css';
import { AuthProvider } from "./context/AuthContext";
import TasksPage from "./pages/TasksPage";
import TasksFormPage from "./pages/TasksFormPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./ProtectedRoute";
import { TaskProvider } from "./context/TaskContext";
import Navbar from "./components/Navbar";

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <main className="container mx-auto px-10">
            <Navbar></Navbar>
            <Routes>
              <Route path="/" element={ <HomePage></HomePage> } />
              <Route path="/login" element={ <LoginPage></LoginPage> } />
              <Route path="/register" element={ <RegisterPage></RegisterPage> } />

              <Route element={<ProtectedRoute></ProtectedRoute>}>
                <Route path="/tasks" element={<TasksPage></TasksPage>} />
                <Route path="/add-tasks" element={<TasksFormPage></TasksFormPage>} />
                <Route path="/tasks/:id" element={<TasksFormPage></TasksFormPage>} />
                <Route path="/profile" element={<ProfilePage></ProfilePage> } />
              </Route>
            </Routes>
          </main>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  )
}

export default App;