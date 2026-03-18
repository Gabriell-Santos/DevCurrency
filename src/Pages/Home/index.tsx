import { BsSearch } from "react-icons/bs";
import style from "./style.module.css";
export function Home() {
  return (
    <main className={style.container}>
      <form className={style.form}>
        <input type="text" placeholder="Digite o nome da moeda" />
        <button type="submit">
          <BsSearch size={10} color="#fff" />
        </button>
      </form>
    </main>
  );
}
