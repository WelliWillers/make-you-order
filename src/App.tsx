import { BrowserRouter } from 'react-router-dom';
import { Router } from './routes/routes';
import { ToastConfiguration } from './components/Toast';
import { AuthContextProvider } from './context/AuthContext';
import { LoaderContextProvider } from './context/LoaderContext';
import { CommandsContextProvider } from './context/CommandsContext';

function App() {

  return (
    <BrowserRouter>
      <LoaderContextProvider>
        <CommandsContextProvider>
          <AuthContextProvider>
            <Router />
            <ToastConfiguration />
          </AuthContextProvider>
        </CommandsContextProvider>
      </LoaderContextProvider>
    </BrowserRouter>
  );
}

export default App;