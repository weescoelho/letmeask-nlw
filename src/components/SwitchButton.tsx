import React, { useContext } from "react";
import { ThemeContext } from "styled-components";
import Switch from "react-switch";

interface Props {
  toggleTheme(): void;
}

const SwitchButton: React.FC<Props> = ({ toggleTheme }) => {
  const { colors, title } = useContext(ThemeContext);

  return (
    <Switch
      onChange={toggleTheme}
      checked={title === "dark"}
      checkedIcon={false}
      uncheckedIcon={false}
      height={20}
      width={40}
      handleDiameter={20}
      offColor='#E559F9'
      onColor={colors.primary}
    />
  );
};

export default SwitchButton;
