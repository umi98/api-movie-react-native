import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import GenreScreen from './screens/GenreScreen';
import MovieScreen from './screens/MovieScreen';
import MovieDetailScreen from './screens/MovieDetailScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Genres"
        screenOptions={{
          headerStyle: { backgroundColor: '#6200EE' },
          headerTintColor: '#FFF',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen
          name="Genres"
          component={GenreScreen}
          options={{ title: 'Movie Genres' }}
        />
       
        <Stack.Screen
          name="Movies"
          component={MovieScreen}
          options={({ route }) => ({ title: route.params.genreName })}
        />
        
        <Stack.Screen
          name="MovieDetails"
          component={MovieDetailScreen}
          options={{ title: 'Movie Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
