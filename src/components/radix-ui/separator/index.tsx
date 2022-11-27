import * as S from "@radix-ui/react-separator";

import css from "./index.module.scss";

export default function Separator({ ...props }) {
  return <S.Root {...props} className={css.root} />;
}
