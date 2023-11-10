import { css } from "@emotion/css";
import { forwardRef, useEffect, useState } from "react";

interface VariableProps extends React.HtmlHTMLAttributes<HTMLSpanElement> {
  name: string;
  value: string;
  fontSize?: number;
  multiplier?: number;
}

export default forwardRef<HTMLSpanElement, VariableProps>((props, ref) => {
  const { name, value, fontSize, multiplier, style, ...restProps } = props;

  const [_fontSize, setFontSize] = useState<number | undefined>(undefined);
  const [_multiplier, setMultiplier] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (fontSize !== undefined) {
      setFontSize(fontSize);
    }
  }, [fontSize]);

  useEffect(() => {
    if (multiplier !== undefined) {
      setMultiplier(multiplier);
    }
  }, [multiplier]);

  return (
    <div
      {...restProps}
      style={{ ...style, fontSize: _fontSize, display: "flex" }}
    >
      <div>{name}:</div>
      <div
        style={{
          backgroundColor: "red",
          width: `${50 * (_multiplier ?? 1)}px`,
        }}
      >
        {value}
      </div>
    </div>
  );
});
