import style from "./style.module.css";
import { Link } from "react-router-dom";
export function NotFound() {
  return (
    <div className={style.container}>
      <h2>404 - Página Não Encontrada</h2>
      <Link to={"/"}> Voltar Para Página Principal </Link>
    </div>
  );
}
