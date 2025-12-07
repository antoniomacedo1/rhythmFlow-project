import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import LibraryScreen from '../screens/LibraryScreen';
import PlaylistsScreen from '../screens/PlaylistsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import PlayerScreen from '../screens/PlayerScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function LibraryStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Library" component={LibraryScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Player" component={PlayerScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="LibraryTab" component={LibraryStack} options={{ title: 'Library' }} />
      <Tab.Screen name="Playlists" component={PlaylistsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
