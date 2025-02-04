import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListScreen from './screens/ListScreen';
import AddItemScreen from './screens/AddItemScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="List" 
          component={ListScreen} 
          options={{ title: 'My Items' }}
        />
        <Stack.Screen 
          name="AddItem" 
          component={AddItemScreen} 
          options={{ title: 'Add New Item' }}
        />
         <Stack.Screen
          name="EditItem"
          component={EditItemScreen}
          options={{ title: 'Edit Item' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
} 