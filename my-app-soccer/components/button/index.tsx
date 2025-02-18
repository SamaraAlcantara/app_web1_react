import styled from "styled-components/native";
import { TouchableOpacity, Text, TouchableOpacityProps } from "react-native";

type ButtonProps = TouchableOpacityProps & {
  buttonName: string;
  color?: string;
  fontSize?: number;
};

export const Button = ({
  buttonName,
  color,
  fontSize = 16,
  ...rest
}: ButtonProps) => {
  return (
    <SearchButton color={color} activeOpacity={0.7} {...rest}>
      <ButtonText fontSize={fontSize}>{buttonName}</ButtonText>
    </SearchButton>
  );
};

const SearchButton = styled(TouchableOpacity)<{ color?: string }>`
  background-color: ${(props: any) => props.color || "#3498db"};
  padding: 12px 20px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
`;

const ButtonText = styled(Text)<{ fontSize?: number }>`
  color: white;
  font-size: ${(props: any) =>
    props.fontSize ? `${props.fontSize}px` : "16px"};
  font-weight: bold;
`;
