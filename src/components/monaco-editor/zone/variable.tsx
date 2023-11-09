import { css } from "@emotion/css";
import { forwardRef, useEffect, useState } from "react";

interface VariableProps extends React.HtmlHTMLAttributes<HTMLSpanElement> {
  name: string;
  value: string;
  fontSize?: number;
}

export default forwardRef<HTMLSpanElement, VariableProps>((props, ref) => {
  const { name, value, fontSize, style, ...restProps } = props;

  const [_fontSize, setFontSize] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (fontSize !== undefined) {
      setFontSize(fontSize);
    }
  }, [fontSize]);

  return (
    <span {...restProps} style={{ ...style, fontSize: _fontSize }}>
      {name}: {value}
    </span>
  );
});
