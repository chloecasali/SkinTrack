import { TouchableOpacity, Text } from "react-native";

interface PrimaryButtonProps {
    title: string;
    onPress: () => void;
}

export default function PrimaryButton({ title, onPress }: PrimaryButtonProps) {
    return (
        <TouchableOpacity
            className="w-full bg-blue-500 rounded-xl py-3 active:bg-blue-600"
            onPress={onPress}
        >
            <Text className="text-white text-center text-lg font-semibold">{title}</Text>
        </TouchableOpacity>
    );
}
