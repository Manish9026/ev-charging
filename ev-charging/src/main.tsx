import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { AuthProvider } from './contexts/AuthContext';
import { StationProvider } from './contexts/StationContext';
import { Provider } from 'react-redux';
import { store } from './store';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <AuthProvider>
        <StationProvider>
          <App />
        </StationProvider>
      </AuthProvider>
    </BrowserRouter>
    </Provider>
    
  </StrictMode>
);