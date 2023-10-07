import React, { ReactElement, ReactNode, useEffect, useRef } from "react";
import { styled } from "styled-components";

const ClickAway = styled.div({
  width: "100%",
  height: "100%",
});

interface ClickawayProps {
  children: ReactNode;
  onClickAway: () => void;
}

const ClickAwayListener = ({
  children,
  onClickAway,
}: ClickawayProps): ReactElement => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent): void => {
      const target = event.target as Node;
      if (containerRef.current && !containerRef.current.contains(target)) {
        onClickAway();
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [onClickAway]);

  return (
    <ClickAway className="click-away-listener" ref={containerRef}>
      {children}
    </ClickAway>
  );
};

export default ClickAwayListener;
