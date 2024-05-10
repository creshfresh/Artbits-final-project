import React from "react";
import { colors } from "../theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { SettingsScreenKK } from "../screens/SettingsScreenKK";
import { ProfileScreen } from "../screens/profile/ProfileScreen";
import { HomeGalleryScreen } from "../screens/gallery/HomeGalleryScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { UploadList } from "../screens/uploads/UploadList";
import { FlatListContestInternships } from "../screens/gallery/FlatListContestInternships";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "../screens/SignInScreen";
import { ContestScreen } from "../screens/contest/ContestScreen";
import { ArtGrantScreen } from "../screens/artGrants/ArtGrantsScreen";
import { PorfolioDetail } from "../screens/profile/PortfolioDetail";
import { ProjectUploadScreen } from "../screens/uploads/ProjectUploadScreen";
import { PublishProjectScreen } from "../screens/uploads/PublishProjectScreen";
import { SuccesUpload } from "../screens/uploads/SuccesUpload";
import { ContestArtGrantViewForms } from "../screens/uploads/ContestArtGrantViewForms";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const UploadStackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerBackTitleVisible: false,
        headerShadowVisible: false,
        headerTitleStyle: {
          fontSize: 16,
        },
        headerTransparent: true,
      }}
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="UploadList"
        component={UploadList}
      />
      <Stack.Screen
        name="ProjectUploadScreen"
        component={ProjectUploadScreen}
        options={({ navigation }) => ({
          // headerShown: true,
          // headerShadowVisible: false,
          headerTitle: "Subir",
          headerLeft: () => (
            <Ionicons
              name="chevron-back-outline"
              size={25}
              color={colors.secondary}
              onPress={() => navigation.goBack()}
            />
          ),
          // headerStyle: {
          //   backgroundColor: "transparent",
          // },
        })}
      />
      <Stack.Screen
        name="ContestArtGrantViewForms"
        component={ContestArtGrantViewForms}
        options={({ navigation }) => ({
          headerShown: true,
          // headerShadowVisible: false,
          headerTitle: "Publicar Concuro o Beca",
          headerLeft: () => (
            <Ionicons
              name="chevron-back-outline"
              size={25}
              color={colors.secondary}
              onPress={() => navigation.goBack()}
            />
          ),
          // headerStyle: {
          //   backgroundColor: "transparent",
          // },
        })}
      />
      <Stack.Screen
        name="PublishProjectScreen"
        component={PublishProjectScreen}
        options={({ navigation }) => ({
          headerShown: true,

          headerShadowVisible: false,
          headerTitle: "Info",
          headerLeft: () => (
            <Ionicons
              name="chevron-back-outline"
              size={25}
              color={colors.secondary}
              onPress={() => navigation.goBack()}
            />
          ),
          headerStyle: {
            backgroundColor: "transparent",
          },
        })}
      />
      <Stack.Screen
        name="SuccesUpload"
        component={SuccesUpload}
        options={({navigation}) => ({
          headerShown: false,
          headerShadowVisible: false,
          headerTitle: "Info",
          headerStyle: {
            backgroundColor: "transparent",
          },
        })}
      />
    </Stack.Navigator>
  );
};

const InternShipsAndContestStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerBackTitleVisible: false,
        headerShadowVisible: false,
        headerTitleStyle: {
          fontSize: 16,
        },
        headerStyle: {
          backgroundColor: "transparent",
        },
      }}
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="FlatListContestInternships"
        component={ContestArtGrantViewForms}
      />
      <Stack.Screen name="Sign in" component={SignInScreen} />
      <Stack.Screen
        name="ArtGrantScreen"
        component={ArtGrantScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerShadowVisible: false,
          headerTitle: "Becas",
          headerLeft: () => (
            <Ionicons
              name="chevron-back-outline"
              size={25}
              color={colors.secondary}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
      <Stack.Screen
        name="ContestScreen"
        component={ContestScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: "Concursos",
          headerBackTitleVisible: true,
          headerLeft: () => (
            <Ionicons
              name="chevron-back-outline"
              size={25}
              color={colors.secondary}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};
const PortfolioStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerBackTitleVisible: false,
        headerShadowVisible: false,
        headerTitleStyle: {
          fontSize: 16,
        },
        headerStyle: {
          backgroundColor: "transparent",
        },
      }}
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="UserProfile"
        component={ProfileScreen}
      />
      <Stack.Screen
        name="PorfolioDetail"
        component={PorfolioDetail}
        options={({ navigation }) => ({
          headerShown: true,
          headerShadowVisible: false,
          headerTitle: "Detail",
          headerLeft: () => (
            <Ionicons
              name="chevron-back-outline"
              size={25}
              color={colors.secondary}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color }) => {
          let iconName;

          let iconSize = 25;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Upload") {
            (iconName = focused ? "add-circle" : "add-circle"), (iconSize = 50);
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Search") {
            iconName = focused ? "search" : "search-outline";
          } else iconName = focused ? "briefcase" : "briefcase-outline";
          return <Ionicons name={iconName} size={iconSize} color={color} />;
        },
        tabBarActiveTintColor: colors.main,
        tabBarInactiveTintColor: "#72809C",
        tabBarStyle: { height: 60 },
      })}
    >
      <Tab.Screen name="Home" component={HomeGalleryScreen} />
      <Tab.Screen
        name="Search"
        component={InternShipsAndContestStackNavigator}
      />
      <Tab.Screen name="Upload" component={UploadStackNavigation} />
      <Tab.Screen name="Jobs" component={SettingsScreenKK} />
      <Tab.Screen name="Profile" component={PortfolioStackNavigator} />
    </Tab.Navigator>
  );
};

export const CustomNavigator = () => {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
};
