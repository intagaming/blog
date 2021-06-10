import Link from "next/link";
import Menu from "./menu";
import { useState } from "react";

const navLinks = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Home",
    href: "/",
  },
];

export default function TopNavigation() {
  const [extend, setExtend] = useState(false);

  const menuClick = () => {
    setExtend((extend) => !extend);
  };

  return (
    <>
      <div className="md:hidden fixed text-white h-screen w-screen flex flex-col">
        <div className="bg-black flex justify-between items-center px-4 h-10">
          <Link href="/">An7's Blog</Link>
          <Menu onClick={menuClick} />
        </div>
        {extend && (
          <div className="bg-black flex-1 flex flex-col">
            <ul className="flex-1 flex flex-col gap-4 justify-center items-center">
              {navLinks.map((link) => (
                <li>
                  <Link href={link.href}>{link.title}</Link>
                </li>
              ))}
            </ul>
            <div className="h-10 flex justify-center items-center gap-4">
              <span>FB</span>
              <span>TWT</span>
            </div>
          </div>
        )}
      </div>
      <div className="hidden md:flex fixed bg-black items-center px-8 h-14 text-white w-screen">
        <div className="flex gap-6">
          <Link href="/">
            <span className="text-xl font-bold">An7's Blog</span>
          </Link>
          <ul className="flex gap-4">
            {navLinks.map((link) => (
              <li className="flex items-center">
                <Link href={link.href}>
                  <span className="opacity-70">{link.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="h-10 md:h-14" />
    </>
  );
}
