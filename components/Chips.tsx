import { IconX } from "@tabler/icons-react";
import { FC } from "react";
import styled from "styled-components";

import { ButtonRoundIcon } from "@/components/Elements/Buttons";
import { FlexColumn, FlexRow } from "@/components/Elements/DisplayFlex";
import { SelectOptionType } from "@/types/utilities";
import { color } from "@/utilities/color";
import { size } from "@/utilities/size";
import {
  FilterOptionCaption,
  FilterOptionName,
} from "@/views/Users/FilterBars/elements";

const ChipContainer = styled.div({
  marginTop: "10px",
  display: "flex",
  flexWrap: "wrap",
});

const Chip = styled(FlexRow.BetweenCenter)({
  width: "auto",
  padding: "5px 10px",
  borderRadius: "4px",
  backgroundColor: color.gray100,
  border: `1px solid ${color.gray200}`,
  marginRight: "10px",
  marginBottom: "10px",
  fontSize: size[12],
  fontWeight: 500,
  color: color.gray700,
  "&:hover": {
    backgroundColor: color.gray200,
  },
});

const Remove = styled(ButtonRoundIcon)({
  cursor: "pointer",
  marginLeft: "15px",
  "&:hover": {
    backgroundColor: color.gray300,
  },
});

interface ChipsProps {
  options: SelectOptionType[];
  handleRemoveOption: (option: string) => void;
}

const Chips: FC<ChipsProps> = ({ options, handleRemoveOption }) => (
  <>
    {options.length > 0 && (
      <ChipContainer className="chip-container">
        {options.map((option) => (
          <Chip
            key={option.value}
            onClick={(): void => handleRemoveOption(option.value)}
            className="chip"
          >
            <FlexColumn.StartStart gap={4}>
              <FilterOptionName>{option.name}</FilterOptionName>
              <FilterOptionCaption>{option.value}</FilterOptionCaption>
            </FlexColumn.StartStart>

            <Remove className="remove-chip-button">
              <IconX size={16} color={color.gray650} />
            </Remove>
          </Chip>
        ))}
      </ChipContainer>
    )}
  </>
);

export default Chips;
