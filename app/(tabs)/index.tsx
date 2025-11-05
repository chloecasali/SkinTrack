import {Animated} from 'react-native';
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
