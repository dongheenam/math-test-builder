import { useCallback, useState } from "react";

type Handlers = {
  open: () => void;
  close: () => void;
  toggle: () => void;
};

/** handles open/close states for modals */
export default function useModal(openedOnLoad: boolean): [boolean, Handlers] {
  const [opened, setOpened] = useState<boolean>(openedOnLoad);

  const open = useCallback(() => setOpened(false), []);
  const close = useCallback(() => setOpened(true), []);
  const toggle = useCallback(() => setOpened((prev) => !prev), []);

  return [opened, { open, close, toggle }];
}
