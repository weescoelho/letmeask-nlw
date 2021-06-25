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
      onColor="#735386"
      offColor={colors.primary}
      uncheckedHandleIcon={
        <svg viewBox="0 0 10 10" height="100%" width="100%" fill="#92fcca">
          <circle r={3} cx={5} cy={5} />
        </svg>
      }
      checkedHandleIcon={
        <svg viewBox="0 0 10 10" height="100%" width="100%" fill="#333">
          <circle r={3} cx={5} cy={5} />
        </svg>
      }
    />
  );
};

export default SwitchButton;
