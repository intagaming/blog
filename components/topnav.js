import Link from "next/link";
import Menu from "./menu";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const navLinks = [
  {
    title: "About",
    href: "/about",
  },
];

const TopNavigation = () => {
  const [extend, setExtend] = useState(false);

  const menuClick = () => {
    setExtend((extend) => !extend);
  };

  return (
    <>
      <div
        className={
          "fixed text-white w-screen flex flex-col md:flex-row z-50" +
          (extend ? " h-full" : "")
        }
      >
        <div
          className={
            "bg-black flex justify-between items-center px-4 h-10 md:h-14"
          }
        >
          <div className={"flex gap-6 cursor-pointer"}>
            <Link href="/">
              <span className={"md:text-lg md:font-bold"}>An7&apos;s Blog</span>
            </Link>
          </div>
          <div className={"md:hidden"}>
            <Menu onClick={menuClick} />
          </div>
        </div>
        <ul
          className={
            "md:px-4 md:flex flex-col md:flex-row md:flex-1 md:justify-start gap-6 md:gap-4 justify-center items-center bg-black text-2xl md:text-base" +
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
            "md:pr-10 bg-black md:flex h-20 md:h-auto justify-center items-center gap-6 text-3xl md:text-2xl" +
            (!extend ? " hidden" : " flex")
          }
        >
          <li key={"fb"}>
            <Link href={"https://facebook.com/an.xuanhoang"}>
              <span className={"cursor-pointer"}>
                <FontAwesomeIcon icon={["fab", "facebook"]} />
              </span>
            </Link>
          </li>
          <li key={"github"}>
            <Link href={"https://github.com/intagaming/blog"}>
              <span className={"cursor-pointer"}>
                <FontAwesomeIcon icon={["fab", "github"]} />{" "}
              </span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="h-10 md:h-14" />
    </>
  );
};

export default TopNavigation;
