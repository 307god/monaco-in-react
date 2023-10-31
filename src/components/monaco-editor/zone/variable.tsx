import { css } from "@emotion/css";

export default function App(props: { name: string; value: string }) {
  const { name, value } = props;
  return (
    <span>
      {name}: {value}
    </span>
  );
}
