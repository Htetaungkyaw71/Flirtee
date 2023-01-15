import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './hooks/useAuth';
import Nav from './Nav';
import { TextInput } from 'react-native';



function App() {
  TextInput.defaultProps = TextInput.defaultProps || {};
  TextInput.defaultProps.selectionColor = 'gray';
  return (
    <AuthProvider>
      <NavigationContainer>
          <Nav/>
      </NavigationContainer>
    </AuthProvider> 
  );
}

export default App;