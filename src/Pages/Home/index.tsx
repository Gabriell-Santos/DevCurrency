import { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import style from "./style.module.css";

interface CoinProps {
  id: string;
  name: string;
  priceUsd: string;
  changePercent24Hr: string;
  marketCapUsd: string;
  symbol: string;
  maxSupply: string;
  volumeUsd24Hr: string;
  explorer: string;
  formatedPrice?: string;
  formatedMark?: string;
  formatedVol?: string;
  formatedPorcent?: string;
}

interface Dataprops {
  data: CoinProps[];
}

export function Home() {
  // Instanciando o Navigate
  const navigate = useNavigate();
  const [input, setinput] = useState("");
  const [coins, setCoins] = useState<CoinProps[]>([]);
  // Utilizando o UseEffect para chamar a api
  useEffect(() => {
    // Aqui Chama a função da Api
    getData();
  }, []);

  async function getData() {
    fetch("https://rest.coincap.io/v3/assets?limit=10&offset=0")
      .then((response) => response.json())
      .then((data: Dataprops) => {
        const coinsData = data.data;
        const Newprice = Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        });
        const formatedMarkCompact = Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          notation: "compact",
        });
        const formatedVol = Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          notation: "compact",
        });
        const formatedPorcent = Intl.NumberFormat("en-US", {
          style: "percent",
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        });

        const formatedResults = coinsData.map((item) => {
          const formated = {
            ...item,
            formatedPrice: Newprice.format(Number(item.priceUsd)),
            formatedMark: formatedMarkCompact.format(Number(item.marketCapUsd)),
            formatedVol: formatedVol.format(Number(item.volumeUsd24Hr)),
            formatedPorcent: formatedPorcent.format(
              Number(item.changePercent24Hr) / 100,
            ),
          };
          return formated;
        });
        //console.log(formatedResults);
        setCoins(formatedResults);
      });
  }

  function HandleSubmit(event: React.FormEvent) {
    event.preventDefault();
    // não procura nada se o campo estiver vazio
    if (input === "") return;
    navigate(`/detail/${input}`);
  }

  function handleGetMore() {
    alert("Quer mais safado");
  }

  return (
    <main className={style.container}>
      <form className={style.form} onSubmit={HandleSubmit}>
        <input
          type="text"
          placeholder="Digite o nome da moeda"
          value={input}
          onChange={(e) => setinput(e.target.value)}
        />
        <button type="submit">
          <BsSearch size={32} color="#fff" />
        </button>
      </form>

      {/* Tabela com as informações das Moedas vinda da Api  */}
      {/* Cabeçalho*/}
      <table>
        <thead>
          <tr>
            <th scope="col">Moeda</th>
            <th scope="col">Valor Mercado</th>
            <th scope="col">Preço</th>
            <th scope="col">Volume</th>
            <th scope="col">Mudança 24h</th>
          </tr>
        </thead>

        {/* Corpo da Tabela  */}
        <tbody id="tbody">
          {coins.length > 0 &&
            coins.map((item) => (
              <tr className={style.tr} key={item.id}>
                <td className={style.td} data-label="Moeda">
                  <div className={style.name}>
                    <img
                      className={style.logo}
                      src={`https://assets.coincap.io/assets/icons/${item.symbol.toLocaleLowerCase()}@2x.png`}
                      alt="Logo da Moeda"
                    />
                    <Link to={`/detail/${item.id} `}>
                      <span>
                        {item.name} | {item.symbol}
                      </span>
                    </Link>
                  </div>
                </td>
                <td className={style.td} data-label="Valor Mercado">
                  {item.formatedMark}
                </td>
                <td className={style.td} data-label="Preço">
                  {item.formatedPrice}
                </td>
                <td className={style.td} data-label="Volume">
                  {item.formatedVol}
                </td>
                <td
                  className={
                    Number(item.changePercent24Hr) > 0
                      ? style.tdprofit
                      : style.tdlost
                  }
                  data-label="Mudança 24h"
                >
                  <span> {item.formatedPorcent} </span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <button onClick={handleGetMore} className={style.buttonMore}>
        Buscar mais....
      </button>
    </main>
  );
}
