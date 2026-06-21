import type { TouchableOpacityProps } from 'react-native';
import { Text, TouchableOpacity } from 'react-native';

type ButtonProps = TouchableOpacityProps & {
  title: string;
  variant?: 'primary' | 'secondary';
  textClassName?: string;
  className?: string;
};

export function Button({
  title,
  variant = 'primary',
  textClassName = '',
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const variantClassName =
    variant === 'primary' ? 'bg-[#F4B942]' : 'border border-gray-200 bg-white';
  const disabledClassName = disabled ? 'opacity-60' : '';

  return (
    <TouchableOpacity
      className={`h-14 items-center justify-center rounded-full shadow ${variantClassName} ${disabledClassName} ${className}`}
      disabled={disabled}
      {...props}>
      <Text className={`text-lg font-bold text-black ${textClassName}`}>{title}</Text>
    </TouchableOpacity>
  );
}
