import { AuthContextProvider } from 'components/context/AuthContext';
import NavBar from 'components/NavBar';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <AuthContextProvider>
      <NavBar />
      <Outlet />
    </AuthContextProvider>
  );
}

export default App;
