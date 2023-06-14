import React, { useRef } from 'react';
import { Provider as AuthProvider } from './src/context/AuthContext';
import { navigationRef } from './RootNavigation';
import Container from './Container';

const App = () => {
  return (
    <AuthProvider>
      <Container ref={navigationRef} />
    </AuthProvider>
  );
};

export default App;
