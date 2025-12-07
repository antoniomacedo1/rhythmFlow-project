import { View, Text } from 'react-native';
import { Styles } from '../src/Styles';

export default function SettingsScreen() {
  return (
    <View style={Styles.body}>
      <View style={Styles.header}><Text style={Styles.headerText}>Settings</Text></View>
      <View style={Styles.container}>
        <View style={Styles.card}><Text>Theme: Light / Dark</Text></View>
        <View style={Styles.card}><Text>Download Quality</Text></View>
        <View style={Styles.card}><Text>Storage Access</Text></View>
        <View style={Styles.card}><Text>About App</Text></View>
      </View>
    </View>
  );
}
