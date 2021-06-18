import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-4 flex flex-col items-center">
      <p>
        Made by An Hoang with <FontAwesomeIcon icon="heart" color="red" />
      </p>
      <p>Checkout the source code on GitHub</p>
      <ul className={"flex gap-4 text-2xl mt-4"}>
        <li key={"fb"}>
          <a href={"https://facebook.com/an.xuanhoang"}>
            <span className={"cursor-pointer"}>
              <FontAwesomeIcon icon={["fab", "facebook"]} />
            </span>
          </a>
        </li>
        <li key={"github"}>
          <a href={"https://github.com/intagaming/blog"}>
            <span className={"cursor-pointer"}>
              <FontAwesomeIcon icon={["fab", "github"]} />
            </span>
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
