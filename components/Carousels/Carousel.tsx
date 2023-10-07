import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import React, { FC, useState } from "react";
import styled from "styled-components";

import { color } from "@/utilities/color";

import { ButtonRoundIcon } from "../Elements/Buttons";

const CarouselContainer = styled.div<{
  isHomePageTop?: boolean;
  isEventPage?: boolean;
}>(({ isHomePageTop, isEventPage }) => ({
  top: isHomePageTop ? "calc(var(--main-layout-padding-y) * -1)" : "0",
  width: isEventPage
    ? "70vw"
    : "calc(100vw - var(--main-layout-padding-x) * 2)",
  height: isEventPage ? "500px" : "470px",
  position: "relative",
  overflow: "hidden",
}));

const Slide = styled.div<{
  index: number;
  image: string;
  isEventPage?: boolean;
}>(({ index, image }) => ({
  width: "100%",
  height: "100%",
  position: "absolute",
  top: "0",
  left: `${index * -100}%`,
  transition: "left 0.3s ease-in-out",
  backgroundImage: `url(${image})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
}));

const NavigationButton = styled(ButtonRoundIcon)<{
  direction: "left" | "right";
}>(({ direction }) => ({
  position: "absolute",
  top: "50%",
  [direction]: "10px",
  backgroundColor: color.gray50,
  opacity: 0.2,
  "&:hover": {
    opacity: 0.5,
    backgroundColor: color.gray200,
  },
}));

interface CarouselProps {
  images: string[];
  isHomePageTop?: boolean;
  isEventPage?: boolean;
}

const Carousel: FC<CarouselProps> = ({
  images,
  isHomePageTop,
  isEventPage,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = (): void => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = (): void => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <CarouselContainer isHomePageTop={isHomePageTop} isEventPage={isEventPage}>
      {images.map((image, index) => (
        <Slide key={index} index={index - activeIndex} image={image} />
      ))}
      <NavigationButton direction="left" onClick={prevSlide}>
        <IconChevronLeft size={20} />
      </NavigationButton>
      <NavigationButton direction="right" onClick={nextSlide}>
        <IconChevronRight size={20} />
      </NavigationButton>
    </CarouselContainer>
  );
};

export default Carousel;
