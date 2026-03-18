import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import style from "./style.module.css";
export function Home() {
  return (
    <main className={style.container}>
      <form className={style.form}>
        <input type="text" placeholder="Digite o nome da moeda" />
        <button type="submit">
          <BsSearch size={32} color="#fff" />
        </button>
      </form>

      {/* Tabela com as informações das Moedas vinda da Api  */}
      {/* Cabeçalho*/}
      <table>
        <tr>
          <th scope="col">Moeda</th>
          <th scope="col">Valor Mercado</th>
          <th scope="col">Preço</th>
          <th scope="col">Volume</th>
          <th scope="col">Mudança 24h</th>
        </tr>
        {/* Corpo da Tabela  */}
        <tbody id="tbody">
          <tr className={style.tr}>
            <td className={style.td} data-label="Moeda">
              <div>
                <Link to={"/detail/:id"}>
                  <span>Bitcoin</span> | BTC
                </Link>
              </div>
            </td>
            <td className={style.td} data-label="Valor Mercado">
              1T
            </td>
            <td className={style.td} data-label="Preço">
              8.200
            </td>
            <td className={style.td} data-label="Volume">
              20
            </td>
            <td className={style.td} data-label="Mudança 24h">
              <span>1.20%</span>
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  );
}
