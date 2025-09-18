import { JSX } from "react";

export default function TestError(): JSX.Element {
  throw new Error("Intentional Error...");
  // TypeScript still needs a return type that matches React expectations
  return <></>;
}
