import type { TextInputProps } from 'react-native';
import { Text, TextInput, View } from 'react-native';

type TextFieldProps = TextInputProps & {
  label: string;
  containerClassName?: string;
  inputClassName?: string;
  errorMessage?: string;
};

export function TextField({
  label,
  containerClassName = '',
  inputClassName = '',
  className = '',
  errorMessage = '',
  ...props
}: TextFieldProps) {
  const hasError = Boolean(errorMessage);

  return (
    <View className={containerClassName}>
      <Text className={`mb-2 font-semibold ${hasError ? 'text-red-600' : 'text-gray-700'}`}>
        {label}
      </Text>

      <TextInput
        className={`h-14 rounded-full border bg-gray-50 px-5 ${
          hasError ? 'border-red-500' : 'border-gray-200'
        } ${inputClassName} ${className}`}
        placeholderTextColor="#9CA3AF"
        {...props}
      />

      {hasError ? <Text className="mt-2 text-sm text-red-600">{errorMessage}</Text> : null}
    </View>
  );
}
