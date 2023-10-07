import { IconCheckbox, IconChevronDown } from "@tabler/icons-react";
import { ChangeEvent, FC, useEffect, useState } from "react";
import styled from "styled-components";

import { SelectOptionType } from "@/types/utilities";
import { color } from "@/utilities/color";

import ClickAwayListener from "../ClickAwayListener";
import CircularLoader from "../Loaders/CircularLoader";
import { FlexColumn, FlexRow } from "./DisplayFlex";
import { FormErrorMessage } from "./General";

const Container = styled.div({
  position: "relative",
  width: "100%",
});

const InputContainer = styled.div({
  position: "relative",
  width: "100%",
});

const Input = styled.input<{ formField: boolean }>(({ formField }) => ({
  width: "100%",
  padding: formField ? "15px" : "10px 30px 10px 8px",
  fontSize: "13px",
  fontWeight: 500,
  color: color.gray800,
  outline: "none",
  borderRadius: "4px",
  backgroundColor: formField ? color.white : color.gray100,
  border: formField
    ? `1px solid ${color.gray300}`
    : `1px solid ${color.gray200}`,
  transition: "border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
  "&:focus": {
    border: formField
      ? `1px solid ${color.blue300}`
      : `1px solid ${color.gray300}`,
    boxShadow: formField ? `0 0 0 2px ${color.blue200}` : "",
  },
}));

const ChevronDown = styled(IconChevronDown)<{ formField: boolean }>(
  ({ formField }) => ({
    position: "absolute",
    top: "50%",
    right: formField ? "16px" : "10px",
    transform: "translateY(-50%)",
    color: color.gray650,
  })
);

const Loader = styled(CircularLoader)<{ formField: boolean }>(
  ({ formField }) => ({
    position: "absolute",
    top: "30%",
    right: formField ? "16px" : "10px",
    transform: "translateY(-50%)",
  })
);

const Dropdown = styled.div<{ formField: boolean }>(({ formField }) => ({
  position: "absolute",
  top: "130%",
  left: 0,
  width: "100%",
  maxWidth: formField ? "300px" : "100%",
  maxHeight: "300px",
  overflowY: "auto",
  zIndex: 1,
  border: `1px solid ${color.gray150}`,
  boxShadow: "0 4px 16px #0000001a",
  borderRadius: "4px",
  transition: "top 2s ease-in,opacity 2s ease-in",
}));

const OptionContainer = styled(FlexRow.BetweenCenter)<{
  selected: boolean;
}>(({ selected }) => ({
  padding: "12px",
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

const OptionCaption = styled.p({
  fontSize: "11px",
  fontWeight: 500,
  color: color.gray600,
});

interface SelectPickerProps {
  options: SelectOptionType[];
  selectedOptions: string[];
  setSelectedOption: (option: string) => void;
  placeholder?: string;
  setSearchInput?: (input: string) => void;
  loading?: boolean;
  localFiltering?: boolean; // are we searching the options locally or on the server?
  showCaption?: boolean;
  formField?: boolean;
  error?: string;
}

const SelectPicker: FC<SelectPickerProps> = ({
  options,
  selectedOptions,
  setSelectedOption,
  placeholder = "Select option",
  setSearchInput,
  loading = false,
  localFiltering = true,
  showCaption = false,
  formField = false,
  error,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const [filteredOptions, setFilteredOptions] =
    useState<SelectOptionType[]>(options);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setInputValue(value);

    if (setSearchInput) {
      setSearchInput(value);
    }

    if (localFiltering) {
      const newFilteredOptions = options.filter((option) =>
        option.name.toLowerCase().includes(value.toLowerCase())
      );

      setFilteredOptions(newFilteredOptions);
    }
  };

  useEffect(() => {
    if (!localFiltering) {
      setFilteredOptions(options);
    }
  }, [options]);

  return (
    <ClickAwayListener onClickAway={(): void => setOpenDropdown(false)}>
      <Container className="select-picker-container">
        <InputContainer className="select-picker-input-container">
          <Input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onFocus={(): void => setOpenDropdown(true)}
            onClick={(): void => setOpenDropdown(true)}
            placeholder={placeholder}
            className="select-picker-input"
            formField={formField}
          />
          {loading ? (
            <Loader formField={formField} />
          ) : (
            <ChevronDown
              onClick={(): void => setOpenDropdown(true)}
              formField={formField}
              size={16}
              color={color.gray650}
            />
          )}
        </InputContainer>

        {openDropdown && (
          <Dropdown formField={formField} className="select-picker-dropdown">
            {error && (
              <OptionContainer selected={false}>
                <FormErrorMessage>{error}</FormErrorMessage>
              </OptionContainer>
            )}
            {filteredOptions.map((option, index) => (
              <OptionContainer
                key={index}
                selected={selectedOptions.includes(option.value)}
                onClick={(): void => setSelectedOption(option.value)}
                className="select-picker-option"
              >
                <FlexColumn.CenterStart gap={5}>
                  <OptionName>{option.name}</OptionName>
                  {showCaption && <OptionCaption>{option.value}</OptionCaption>}
                </FlexColumn.CenterStart>
                {selectedOptions.includes(option.value) && (
                  <IconCheckbox size={16} color={color.blue500} stroke={3} />
                )}
              </OptionContainer>
            ))}

            {!loading && inputValue && filteredOptions.length === 0 && (
              <OptionContainer
                selected={false}
                className="select-picker-option"
              >
                <OptionName>No results found</OptionName>
              </OptionContainer>
            )}

            {loading && (
              <OptionContainer
                selected={false}
                className="select-picker-option"
              >
                <OptionName>Loading...</OptionName>
              </OptionContainer>
            )}

            {!loading && !inputValue && filteredOptions.length === 0 && (
              <OptionContainer
                selected={false}
                className="select-picker-option"
              >
                <OptionName>Start typing to search</OptionName>
              </OptionContainer>
            )}
          </Dropdown>
        )}
      </Container>
    </ClickAwayListener>
  );
};

export default SelectPicker;
