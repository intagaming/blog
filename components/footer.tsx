import { FaHeart, FaFacebook, FaGithub } from "react-icons/fa";

const Footer = (): JSX.Element => {
  return (
    <footer className="nightwind-prevent-block nightwind-prevent bg-black text-white py-20 flex flex-col items-center">
      <p>
        Made by
        <span className="text-indigo-600 font-bold"> &lt;</span>An Hoang
        <span className="text-indigo-600 font-bold">/&gt; </span>
        with <FaHeart className="inline-block" color="red" />
      </p>
      <p>Checkout the source code on GitHub</p>
      <ul className={"flex gap-4 text-2xl mt-8"}>
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
    </footer>
  );
};

export default Footer;
