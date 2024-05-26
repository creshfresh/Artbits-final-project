import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '../screens/login/SignInScreen';
import RoleSignUp from "../screens/login/RoleSignUp";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="SignIn">
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="RoleSignUp" component={RoleSignUp} />
    </Stack.Navigator>
  );
};

export default AppNavigator;