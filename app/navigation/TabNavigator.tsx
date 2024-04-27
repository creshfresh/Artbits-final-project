import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeGalleryScreen } from "../screens/gallery/HomeGalleryScreen";
import { SettingsScreenKK } from "../screens/SettingsScreenKK";
import { NavigationContainer } from "@react-navigation/native";
import { ProfileScreen } from "../screens/profile/ProfileScreen";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme/colors";

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.main,
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { height: 50 },
      })}
    >
      <Tab.Screen name="Home" component={HomeGalleryScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Settings" component={SettingsScreenKK} />
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
