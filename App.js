import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StudentsProvider } from './src/contexts/StudentsContext';
import LoadingScreen from './src/screens/LoadingScreen';
import HomeScreen from './src/screens/HomeScreen';

const Stack = createStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Simula 3 segundos de carregamento
  }, []);

  return (
    <StudentsProvider>
      <NavigationContainer>
        <Stack.Navigator>
          {isLoading ? (
            <Stack.Screen name="Loading" component={LoadingScreen} options={{ headerShown: false }} />
          ) : (
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'InnovateTech' }} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </StudentsProvider>
  );
};

export default App;
