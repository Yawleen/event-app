import Link from "next/link";
import style from "./Navbar.module.css";
import { useRef } from "react";

export default function Navbar({ children }) {
  const navEvent = useRef();

  const toggleMenu = () => navEvent.current.classList.toggle(`${style.active}`);

  return (
    <>
      <nav className={style.navbar}>
        <div className={style.brand_text}>
          <Link href="/">NextEvents</Link>
        </div>
        <div className={style.nav_event} onClick={toggleMenu} ref={navEvent}>
          <Link href="/events">Browse All Events</Link>
        </div>
        <button className={style.menu} onClick={toggleMenu}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="23"
            height="23"
            fill="#f1f1f1"
            className="bi bi-list"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
            />
          </svg>
        </button>
      </nav>
      {children}
    </>
  );
}
