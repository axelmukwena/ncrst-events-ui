import { FC, HTMLAttributes } from "react";
import { styled } from "styled-components";

type FlexProps = {
  gap?: number;
};

type FlexComponentProps = FlexProps &
  HTMLAttributes<HTMLElement> & {
    justifyContent?: string;
    alignItems?: string;
  };

type FlexComponent = FC<FlexComponentProps>;

type FlexComponents = {
  Base: FlexComponent;
  BetweenCenter: FlexComponent;
  AroundCenter: FlexComponent;
  BetweenStart: FlexComponent;
  BetweenEnd: FlexComponent;
  AroundStart: FlexComponent;
  AroundEnd: FlexComponent;
  StartCenter: FlexComponent;
  CenterCenter: FlexComponent;
  StartStart: FlexComponent;
  StartEnd: FlexComponent;
  CenterStart: FlexComponent;
  CenterEnd: FlexComponent;
  EndCenter: FlexComponent;
};

// Define a return type for createFlexComponent
const createFlexComponent = (flexDirection: "row" | "column"): FlexComponent =>
  styled.div<FlexProps>((props) => ({
    display: "flex",
    flexDirection,
    width: "100%",
    gap: props.gap ? `${props.gap}px` : undefined,
  }));

const FlexRowBase = createFlexComponent("row");
const FlexColumnBase = createFlexComponent("column");

const alignments = [
  ["Between", "Center"],
  ["Around", "Center"],
  ["Between", "Start"],
  ["Between", "End"],
  ["Around", "Start"],
  ["Around", "End"],
  ["Start", "Center"],
  ["Center", "Center"],
  ["Start", "Start"],
  ["Start", "End"],
  ["Center", "Start"],
  ["Center", "End"],
  ["End", "Center"],
];

const mapAlignment = (alignment: string, type: "justify" | "align"): string => {
  if (
    type === "justify" &&
    (alignment === "Between" || alignment === "Around")
  ) {
    return `space-${alignment.toLowerCase()}`;
  }
  return alignment.toLowerCase();
};

const createFlexVariations = (
  BaseComponent: typeof FlexRowBase
): Record<string, FlexComponent> =>
  alignments.reduce(
    (acc, [justify, align]) => {
      acc[`${justify}${align}`] = styled(BaseComponent)({
        justifyContent: mapAlignment(justify, "justify"),
        alignItems: mapAlignment(align, "align"),
      });
      return acc;
    },
    {} as Record<string, typeof FlexRowBase>
  );

export const FlexRow = {
  Base: FlexRowBase,
  ...createFlexVariations(FlexRowBase),
} as FlexComponents;

export const FlexColumn = {
  Base: FlexColumnBase,
  ...createFlexVariations(FlexColumnBase),
} as FlexComponents;
