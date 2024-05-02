import { colors } from "../theme/colors";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { SettingsScreenKK } from "../screens/SettingsScreenKK";
import { ProfileScreen } from "../screens/profile/ProfileScreen";
import { HomeGalleryScreen } from "../screens/gallery/HomeGalleryScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { UploadList } from "../screens/uploads/UploadList";

export const TabNavigator = () => {
  const Tab = createBottomTabNavigator();
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
          } else if (route.name === "Settings") {
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
      <Tab.Screen name="Search" component={SettingsScreenKK} />
      <Tab.Screen name="Settings" component={UploadList} />
      <Tab.Screen name="Jobs" component={SettingsScreenKK} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};
export const Navigation = () => {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
};
