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
      <TextInput
        className={`h-14 rounded-[6px] border bg-gray-50 px-5 ${
          hasError ? 'border-red-500' : 'border-gray-200'
        } ${inputClassName} ${className}`}
        placeholder={label}
        placeholderTextColor="#9CA3AF"
        {...props}
      />

      {hasError ? <Text className="mt-2 text-sm text-red-600">{errorMessage}</Text> : null}
    </View>
  );
}