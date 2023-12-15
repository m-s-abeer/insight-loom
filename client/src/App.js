import AppLayout from "./components/AppLayout";
import { AuthProvider } from "./components/AuthProvider";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";

function App() {
  return (
    <div className="App">
      <body>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="" element={<AppLayout />}>
                {/*<Route path='/' element={<Homepage />} />*/}
                <Route path="/login" element={<Login />} />
                {/*<Route path="/logout" element={<Logout />} />*/}
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </body>
    </div>
  );
}

export default App;
