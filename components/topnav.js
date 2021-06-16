import Link from "next/link";
import Menu from "./menu";
import { useState } from "react";

const navLinks = [
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Collections",
    href: "/collections",
  },
];

export default function TopNavigation() {
  const [extend, setExtend] = useState(false);

  const menuClick = () => {
    setExtend((extend) => !extend);
  };

  return (
    <>
      <div
        className={
          "md:h-auto fixed text-white w-screen flex flex-col md:flex-row z-50" +
          (extend ? " h-full" : "")
        }
      >
        <div className={"bg-black flex justify-between items-center px-4 h-10"}>
          <div className={"flex gap-6 cursor-pointer"}>
            <Link href="/">
              <span className={"md:text-xl md:font-bold"}>An7's Blog</span>
            </Link>
          </div>
          <div className={"md:hidden"}>
            <Menu onClick={menuClick} />
          </div>
        </div>
        <ul
          className={
            "md:px-4 md:flex flex-col md:flex-row md:flex-1 md:justify-start gap-4 justify-center items-center bg-black" +
            (extend ? " flex flex-1" : " hidden")
          }
        >
          {navLinks.map((link) => (
            <li key={link.href} className={"cursor-pointer"}>
              <Link href={link.href}>
                <span className={"opacity-70"}>{link.title}</span>
              </Link>
            </li>
          ))}
        </ul>
        <ul
          className={
            "px-4 bg-black md:flex h-10 justify-center items-center gap-4" +
            (!extend ? " hidden" : " flex")
          }
        >
          <li key={"fb"}>
            <Link href={"https://facebook.com/an.xuanhoang"}>
              <span></span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="h-10 md:h-14" />
    </>
  );
}
