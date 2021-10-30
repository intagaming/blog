import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FaFacebook, FaGithub } from "react-icons/fa";
import Menu from "./Menu";
import ThemeToggle from "./ThemeToggle";
import LinkWrapper from "../../common/LinkWrapper";

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
    setExtend((_extend) => !_extend);
  };

  useEffect(() => {
    const onRouteStart = () => {
      setExtend(false);
    };
    router.events.on("routeChangeStart", onRouteStart);

    return () => {
      router.events.off("routeChangeStart", onRouteStart);
    };
  }, [router.events]);

  return (
    <>
      <div
        className={`nightwind-prevent-block fixed text-white w-screen flex flex-col md:flex-row z-50 ${
          extend ? "h-full md:h-auto" : ""
        }`}
      >
        <div className="bg-black flex justify-between items-center px-4 h-10 md:h-14">
          <LinkWrapper href="/">
            <span className="md:text-lg md:font-bold px-2 text-white">
              <span className="text-indigo-600 font-extrabold">&lt;</span>
              An Hoang
              <span className="text-indigo-600 font-extrabold">/&gt;</span>
            </span>
          </LinkWrapper>
          <div className="flex gap-6 md:hidden">
            <ThemeToggle />
            <Menu onClick={menuClick} checked={extend} />
          </div>
        </div>
        <ul
          className={`md:flex flex-col md:flex-row md:flex-1 md:justify-start gap-6 justify-center items-center bg-black text-2xl md:text-base ${
            extend ? "flex flex-1" : "hidden"
          }`}
        >
          {navLinks.map((link) => (
            <li key={link.href}>
              <LinkWrapper href={link.href}>
                <span className="opacity-70 text-white">{link.title}</span>
              </LinkWrapper>
            </li>
          ))}
        </ul>
        <ul
          className={`md:pr-10 bg-black md:flex h-20 md:h-auto justify-center items-center gap-6 text-3xl md:text-2xl ${
            !extend ? "hidden" : "flex"
          }`}
        >
          <li className="hidden md:inline-block">
            <ThemeToggle />
          </li>
          <li>
            <a href="https://facebook.com/an.xuanhoang">
              <span className="cursor-pointer text-white">
                <FaFacebook />
              </span>
            </a>
          </li>
          <li>
            <a href="https://github.com/intagaming/blog">
              <span className="cursor-pointer text-white">
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
