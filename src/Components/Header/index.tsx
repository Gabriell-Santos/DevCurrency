import { Link } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import styles from "./Header.module.css";
export function Header() {
  return (
    <div className={styles.container}>
      <Link to={"/"}>
        <img src={Logo} alt="Logo DevCurrency" />
      </Link>
    </div>
  );
}
