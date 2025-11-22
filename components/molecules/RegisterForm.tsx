import InputField from "@/components/atoms/InputField";
import PrimaryButton from "@/components/atoms/PrimaryButton";
import { Text } from "react-native";
import { useState } from "react";
import { useRegister } from "@/hooks/auth/useRegister";

export default function RegisterForm() {
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  const { register, loading, errorMsg, successMsg } = useRegister();

  const validate = () => {
    if (!firstname.trim()) {
      return "Firstname is required.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address.";
    }

    if (password.length < 8) {
      return "Password must be at least 8 characters.";
    }

    const uppercase = /[A-Z]/.test(password);
    const lowercase = /[a-z]/.test(password);
    const number = /\d/.test(password);
    const special = /[^A-Za-z0-9]/.test(password);

    if (!uppercase || !lowercase || !number || !special) {
      return "Password must include uppercase, lowercase, number and special character.";
    }

    return null;
  };

  const submit = () => {
    const msg = validate();
    if (msg) {
      setLocalError(msg);
      return;
    }

    setLocalError(null);
    register(firstname, email, password);
  };

  return (
    <>
      <InputField
        label="Firstname"
        value={firstname}
        onChangeText={setFirstname}
        placeholder="John"
      />

      <InputField
        label="Email"
        value={email}
        onChangeText={(t) => setEmail(t.toLowerCase())}
        placeholder="example@mail.com"
        keyboardType="email-address"
      />

      <InputField
        label="Password"
        value={password}
        onChangeText={setPassword}
        placeholder="••••••••"
        secureTextEntry
      />

      {(localError || errorMsg) && (
        <Text className="text-red-500 mt-2 mb-2">{localError || errorMsg}</Text>
      )}

      {successMsg && (
        <Text className="text-green-600 mt-2 mb-2">{successMsg}</Text>
      )}

      <PrimaryButton
        title={loading ? "Creating account..." : "Create Account"}
        onPress={submit}
        disabled={loading}
      />
    </>
  );
}
