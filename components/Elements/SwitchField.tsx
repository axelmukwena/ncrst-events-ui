import { ChangeEvent, FC, FocusEvent, useRef } from "react";
import { styled } from "styled-components";

import { color } from "@/utilities/color";

import { FlexRow } from "./DisplayFlex";

const SwitchWrapper = styled.div({
  position: "relative",
  display: "inline-block",
  width: "40px",
  height: "22px",
});

const SwitchInput = styled.input({
  opacity: 0,
  width: 0,
  height: 0,
  "&:checked + span": {
    backgroundColor: "#2196F3",
  },
  "&:focus + span": {
    boxShadow: "0 0 1px #2196F3",
  },
  "&:checked + span:before": {
    transform: "translateX(16px)",
  },
});

const SwitchSlider = styled.span({
  position: "absolute",
  cursor: "pointer",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "#ccc",
  transition: "0.4s",
  borderRadius: "34px",
  "&:before": {
    position: "absolute",
    content: '""',
    height: "16px",
    width: "16px",
    left: "4px",
    bottom: "3px",
    backgroundColor: "white",
    transition: "0.4s",
    borderRadius: "50%",
  },
});

const Label = styled.label({
  fontSize: "14px",
  fontWeight: 600,
  color: color.gray650,
  cursor: "pointer",
});

interface SwitchFieldProps {
  label: string;
  name: string;
  value: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
}

const SwitchField: FC<SwitchFieldProps> = ({
  label,
  name,
  value,
  onChange,
  onBlur,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleContainerClick = (): void => {
    inputRef.current?.click();
  };

  return (
    <FlexRow.StartCenter
      gap={10}
      onClick={handleContainerClick}
      className="switch-field"
      style={{ width: "auto" }}
    >
      <SwitchWrapper className="switch-wrapper">
        <SwitchInput
          ref={inputRef}
          type="checkbox"
          name={name}
          checked={value}
          onChange={onChange}
          onBlur={onBlur}
        />
        <SwitchSlider />
      </SwitchWrapper>
      <Label className="switch-label">{label}</Label>
    </FlexRow.StartCenter>
  );
};

export default SwitchField;
