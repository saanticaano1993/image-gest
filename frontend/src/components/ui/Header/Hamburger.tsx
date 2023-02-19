export type HamburgerProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

function Hamburger({ isOpen, setIsOpen }: HamburgerProps) {
  const genericHamburgerLine = `h-0.5 w-6 bg-slate-200 rounded-full bg-white transition ease transform duration-300`;
  return (
    <button
      className="flex flex-col rounded justify-center items-center group space-y-1"
      onClick={() => setIsOpen(!isOpen)}>
      <div
        className={`${genericHamburgerLine} ${
          isOpen
            ? "rotate-45 translate-y-1"
            : ""
        }`}
      />
      <div
        className={`${genericHamburgerLine} ${
          isOpen ? "opacity-0" : ""
        }`}
      />
      <div
        className={`${genericHamburgerLine} ${
          isOpen
            ? "-rotate-45 -translate-y-2 "
            : ""
        }`}
      />
    </button>
  );
}

export default Hamburger;
