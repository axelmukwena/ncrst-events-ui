import { ChangeEvent, FC, FocusEvent } from "react";
import { styled } from "styled-components";

import { color } from "@/utilities/color";

const TextFieldWrapper = styled.div({
  position: "relative",
  width: "100%",
});

const TextInput = styled.input({
  height: "55px",
  width: "100%",
  padding: "15px",
  fontSize: "14px",
  fontWeight: 500,
  color: color.gray800,
  backgroundColor: color.white,
  border: `1px solid ${color.gray300}`,
  borderRadius: "4px",
  outline: "none",
  transition: "border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
  "&:focus": {
    boxShadow: `0 0 0 2px ${color.blue200}`,
    border: `1px solid ${color.blue300}`,
  },
  "&.active + label, &:focus + label": {
    top: "-9px",
    padding: "0 6px",
    fontSize: "12px",
    fontWeight: 600,
    backgroundColor: color.white,
    borderRadius: "4px",
    color: color.gray700,
  },
  "&.disabled": {
    backgroundColor: color.gray100,
    cursor: "not-allowed",
  },
});

const FloatingLabel = styled.label({
  position: "absolute",
  top: "15px",
  left: "15px",
  fontSize: "14px",
  fontWeight: 500,
  color: color.gray600,
  pointerEvents: "none",
  transition: "0.2s ease all",
});

interface TextFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  type?: string;
  iconRight?: boolean;
}

const TextField: FC<TextFieldProps> = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  required = false,
  disabled = false,
  iconRight = false,
}) => (
  <TextFieldWrapper className="textfield-wrapper">
    <TextInput
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      className={`${value ? "active" : ""} ${
        disabled ? "disabled" : ""
      } textfield-input`}
      disabled={disabled}
      style={{ padding: iconRight ? "15px 40px 15px 15px" : "15px" }}
    />
    <FloatingLabel>{`${label}${required ? " *" : ""}`}</FloatingLabel>
  </TextFieldWrapper>
);

export default TextField;
