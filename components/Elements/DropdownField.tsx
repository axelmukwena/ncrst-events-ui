import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { FC, useEffect, useState } from "react";
import { UseFormSetError, UseFormSetValue } from "react-hook-form";
import styled from "styled-components";

import { SelectOptionType } from "@/types/utilities";
import { color } from "@/utilities/color";

import ClickAwayListener from "../ClickAwayListener";
import { FlexRow } from "./DisplayFlex";

const DropdownWrapper = styled.div({
  position: "relative",
  width: "100%",
});

export const DropdownInput = styled.div({
  width: "100%",
  height: "55px",
  padding: "15px",
  fontSize: "14px",
  fontWeight: 500,
  color: color.gray800,
  cursor: "pointer",
  backgroundColor: color.white,
  border: `1px solid ${color.gray300}`,
  borderRadius: "4px",
  outline: "none",
  transition: "border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
  "&.open": {
    boxShadow: `0 0 0 2px ${color.blue200}`,
    border: `1px solid ${color.blue300}`,
  },
  "&.disabled": {
    backgroundColor: color.gray100,
    cursor: "not-allowed",
  },
});

const FloatingLabel = styled.label({
  color: color.gray600,
  pointerEvents: "none",
  transition: "0.2s ease all",
  "&.open": {
    position: "absolute",
    left: "15px",
    top: "-9px",
    padding: "0 6px",
    fontSize: "12px",
    fontWeight: 600,
    backgroundColor: color.white,
    borderRadius: "4px",
    color: color.gray700,
  },
});

const Dropdown = styled.div({
  position: "absolute",
  top: "130%",
  left: 0,
  width: "100%",
  maxWidth: "300px",
  maxHeight: "300px",
  overflowY: "auto",
  zIndex: 1,
  border: `1px solid ${color.gray150}`,
  boxShadow: "0 4px 16px #0000001a",
  borderRadius: "4px",
  transition: "top 2s ease-in,opacity 2s ease-in",
});

const OptionContainer = styled(FlexRow.BetweenCenter)<{
  selected: boolean;
}>(({ selected }) => ({
  padding: "14px",
  backgroundColor: selected ? color.gray100 : color.white,
  "&:hover": {
    backgroundColor: color.gray100,
    cursor: "pointer",
  },
}));

const OptionName = styled.p({
  fontSize: "14px",
  fontWeight: 500,
  color: color.gray800,
});

interface DropdownFieldProps {
  label: string;
  setValue: UseFormSetValue<any>;
  setError: UseFormSetError<any>;
  name: string;
  required?: boolean;
  options?: string[];
  optionsValues?: SelectOptionType[];
  defaultOptionValue?: SelectOptionType;
  defaultValue?: string;
  disabled?: boolean;
}

const DropdownField: FC<DropdownFieldProps> = ({
  label,
  setValue,
  setError,
  name,
  required = false,
  options,
  optionsValues,
  defaultOptionValue,
  defaultValue,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<SelectOptionType | null>(
    null
  );

  useEffect(() => {
    if (defaultOptionValue) {
      setSelectedValue(defaultOptionValue);
    } else if (defaultValue) {
      setSelectedValue({ value: defaultValue, name: defaultValue });
    }
  }, [defaultOptionValue, defaultValue]);

  const toggleDropdown = (): void => setIsOpen(!isOpen);

  const selectOption = (value: string | SelectOptionType): void => {
    setError(name, {});
    if (typeof value === "string") {
      setSelectedValue({ value, name: value });
      setValue(name, value);
    } else {
      setSelectedValue(value);
      setValue(name, value.value);
    }
    setIsOpen(false);
  };

  return (
    <DropdownWrapper className="dropdown-wrapper">
      <DropdownInput
        onClick={(): boolean | void => !disabled && toggleDropdown()}
        className={`dropdown-input ${isOpen ? "open" : ""} ${
          disabled ? "disabled" : ""
        }`}
      >
        <FlexRow.BetweenCenter>
          {selectedValue?.name && <>{selectedValue.name}</>}
          <FloatingLabel
            className={`${selectedValue?.name ? "open" : ""} floating-label`}
          >
            {`${label}${required ? " *" : ""}`}
          </FloatingLabel>

          {isOpen ? (
            <IconChevronUp size={16} color={color.gray650} />
          ) : (
            <IconChevronDown size={16} color={color.gray650} />
          )}
        </FlexRow.BetweenCenter>
      </DropdownInput>
      {isOpen && (
        <ClickAwayListener onClickAway={(): void => setIsOpen(false)}>
          <Dropdown className="dropdown-options">
            {options &&
              !optionsValues &&
              options.map((option, index) => (
                <OptionContainer
                  key={index}
                  onClick={(): void => selectOption(option)}
                  className="dropdown-item"
                  selected={selectedValue?.value === option}
                >
                  <OptionName>{option}</OptionName>
                </OptionContainer>
              ))}
            {optionsValues &&
              !options &&
              optionsValues.map((option, index) => (
                <OptionContainer
                  key={index}
                  onClick={(): void => selectOption(option)}
                  className="dropdown-item"
                  selected={selectedValue?.value === option.value}
                >
                  <OptionName>{option.name}</OptionName>
                </OptionContainer>
              ))}
          </Dropdown>
        </ClickAwayListener>
      )}
    </DropdownWrapper>
  );
};

export default DropdownField;
