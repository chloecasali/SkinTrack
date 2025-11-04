import {Animated, StyleSheet} from 'react-native';
import "../../global.css"

import View = Animated.View;
import Text = Animated.Text;

export default function HomeScreen() {
  return (
      <View className="flex-1 items-center justify-center bg-white">
          <Text className="text-xl font-bold text-blue-500">
              Welcome to Nativewind!
          </Text>
      </View>
  );
}
StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
});
