import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import { router } from 'expo-router';
import { Button, ImagesTop } from "@/components";

export default function Index() {
  // function untuk route ke login page
  const loginPage = () => {
    router.push('/login')
  }
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome to our app</Text>
      {/* component imageTop */}
      <ImagesTop
        src={require('./assets/image/gambar1.png')}
      />
      {/* component Button */}
      <Button
        title="Start"
        onPress={loginPage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },

  welcome: {
    color: '#000000',
    marginBottom: 32,
    fontSize: 32,
    fontWeight: "bold",
  },
})
