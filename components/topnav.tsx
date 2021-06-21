import Link from "next/link";
import Menu from "./menu";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FaFacebook, FaGithub } from "react-icons/fa";

const navLinks = [
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];

const TopNavigation = (): JSX.Element => {
  const [extend, setExtend] = useState(false);
  const router = useRouter();

  const menuClick = () => {
    setExtend((extend) => !extend);
  };

  useEffect(() => {
    const onRouteStart = () => {
      setExtend(false);
    };
    router.events.on("routeChangeStart", onRouteStart);

    return () => {
      router.events.off("routeChangeStart", onRouteStart);
    };
  }, []);

  return (
    <>
      <div
        className={
          "fixed text-white w-screen flex flex-col md:flex-row z-50" +
          (extend ? " h-full md:h-auto" : "")
        }
      >
        <div
          className={
            "bg-black flex justify-between items-center px-4 h-10 md:h-14"
          }
        >
          <Link href="/">
            <a>
              <span className={"md:text-lg md:font-bold px-2"}>
                <span className="text-indigo-600 font-extrabold">&lt;</span>An
                Hoang
                <span className="text-indigo-600 font-extrabold">/&gt;</span>
              </span>
            </a>
          </Link>
          <div className={"md:hidden"}>
            <Menu onClick={menuClick} />
          </div>
        </div>
        <ul
          className={
            "md:flex flex-col md:flex-row md:flex-1 md:justify-start gap-6 justify-center items-center bg-black text-2xl md:text-base" +
            (extend ? " flex flex-1" : " hidden")
          }
        >
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>
                <a>
                  <span className={"opacity-70"}>{link.title}</span>
                </a>
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
            <a href={"https://facebook.com/an.xuanhoang"}>
              <span className={"cursor-pointer"}>
                <FaFacebook />
              </span>
            </a>
          </li>
          <li key={"github"}>
            <a href={"https://github.com/intagaming/blog"}>
              <span className={"cursor-pointer"}>
                <FaGithub />
              </span>
            </a>
          </li>
        </ul>
      </div>
      <div className="h-10 md:h-14" />
    </>
  );
};

export default TopNavigation;
