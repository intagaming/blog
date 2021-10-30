import { Switch } from "@headlessui/react";

type Props = {
  onClick(checked: boolean): void;
  checked: boolean;
};

const Menu = ({ checked, onClick }: Props): JSX.Element => (
  <Switch
    checked={checked}
    className="text-white focus:outline-none flex items-center"
    onChange={onClick}
  >
    <span className="sr-only">Menu toggle</span>
    <span className="transform">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-6 w-6 ${checked ? "rotate-90" : 0} transition`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </span>
  </Switch>
);

export default Menu;
