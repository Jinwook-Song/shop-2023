import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthContextProvider } from 'components/context/AuthContext';
import NavBar from 'components/NavBar';
import { Outlet } from 'react-router-dom';

const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <AuthContextProvider>
        <NavBar />
        <Outlet />
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
