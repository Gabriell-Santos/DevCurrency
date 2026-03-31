import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import style from "./style.module.css";
export function Detail() {
  const { id } = useParams();
  const [coin, setCoin] = useState<DataCoin>();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  interface DataCoin {
    id: string;
    name: string;
    symbol: string;
    link: string;
    image: string;
    rank: string;
    markCap: string;
    porcent24h: string;
    formatedMarkCap?: string;
    formatedPorcent24h?: string;
  }

  // Formatar valor de mercado
  function FormatedMarkCap(value: string): string {
    const ValueMark = Number(value);
    return Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      notation: "compact",
    }).format(ValueMark);
  }

  // formatando a porcentagem
  function FormatedPorcent(value: string): string {
    const ValuePorcent = Number(value);
    return Intl.NumberFormat("en-US", {
      style: "percent",
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }).format(ValuePorcent / 100);
  }

  useEffect(() => {
    async function getData() {
      try {
        const ResponseApi = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}`,
        );
        const data = await ResponseApi.json();

        const FormatedCoin: DataCoin = {
          id: data.id,
          name: data.name,
          symbol: data.symbol,
          link: data.links?.homepage?.[0],
          image: data.image?.thumb,
          rank: data.market_cap_rank,
          markCap: data.market_data?.market_cap?.usd,
          porcent24h: data.market_data?.price_change_percentage_24h,
          formatedMarkCap: FormatedMarkCap(data.market_data?.market_cap?.usd),
          formatedPorcent24h: FormatedPorcent(
            data.market_data?.price_change_percentage_24h,
          ),
        };

        setCoin(FormatedCoin);
      } catch (error) {
        alert("Erro na Página");
        navigate("/");
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [id, navigate]);

  // Mensagem Informando que está buscando os dados
  if (loading || !coin) {
    return (
      <div className={style.loadingContainer}>
        <p>Buscando as informações</p>
      </div>
    );
  }

  return (
    <div className={style.detailContainer}>
      <div className={style.header}>
        <img className={style.image} src={coin?.image} alt={coin?.name} />
        <div className={style.title}>
          <h1>{coin.name}</h1>
          <span className={style.rank}> Rank : {coin?.rank} </span>
        </div>
      </div>

      {/* Informações do mercado */}
      <div className={style.infoMark}>
        <div className={style.inforCard}>
          <h2>Capitalização do Mercado</h2>
          <p className={style.markCap}> {coin?.formatedMarkCap} </p>
        </div>
        <div>
          <div className={style.inforCard}>
            <h3>Variação 24 horas</h3>
            <p
              className={`${style.porcent} ${Number(coin?.porcent24h) >= 0 ? style.positive : style.negative} `}
            >
              {coin?.formatedPorcent24h}
            </p>
          </div>
        </div>

        {/* Link para mais detalhes da moeda */}
        {coin?.link && (
          <div className={style.link}>
            <h2>Link para mais Detalhes</h2>
            <a href={coin.link}>Site Oficial</a>
          </div>
        )}
      </div>
    </div>
  );
}
