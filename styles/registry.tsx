"use client";

import isPropValid from "@emotion/is-prop-valid";
import { useServerInsertedHTML } from "next/navigation";
import React, { useState } from "react";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";

// Please see below link for more information:
// https://nextjs.org/docs/app/building-your-application/styling/css-in-js#styled-components
export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  // Only create stylesheet once with lazy initial state
  // x-ref: https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
  const [styledComponentsStyleSheet] = useState<ServerStyleSheet>(
    () => new ServerStyleSheet()
  );

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    styledComponentsStyleSheet.instance.clearTag();
    return <>{styles}</>;
  });

  if (typeof window !== "undefined")
    return (
      <StyleSheetManager shouldForwardProp={isPropValid}>
        {children}
      </StyleSheetManager>
    );

  return (
    <StyleSheetManager
      sheet={styledComponentsStyleSheet.instance}
      shouldForwardProp={isPropValid}
    >
      {children}
    </StyleSheetManager>
  );
}
