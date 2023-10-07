export interface IconProps {
  width?: number;
  height?: number;
  color?: string;
}

export const Icon = ({
  width = 24,
  height = 24,
  color = "currentColor",
  children,
}: IconProps & { children: React.ReactNode }): JSX.Element => (
  <div style={{ width, height, color }}>
    <svg viewBox={`0 0 48 48`} fill={color}>
      {children}
    </svg>
  </div>
);
