import { useParams, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export function Detail() {
  const { id } = useParams();
  const [coin, setCoin] = useState<DataCoin>();
  const navigate = useNavigate();

  interface DataCoin {
    id: string;
    name: string;
    symbol: string;
    link: string;
    image: string;
    description: string;
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
          description:
            data.description?.pt ||
            data.description?.en ||
            "Descrição indisponível para essa moeda",
          rank: data.market_cap_rank,
          markCap: data.market_data?.market_cap?.usd,
          porcent24h: data.market_data?.price_change_percentage_24h,
          formatedMarkCap: FormatedMarkCap(data.market_data?.market_cap?.usd),
          formatedPorcent24h: FormatedPorcent(
            data.market_data?.price_change_percentage_24h,
          ),
        };

        setCoin(FormatedCoin);
        console.log(FormatedCoin);
      } catch (error) {
        alert("Erro na Página");
        navigate("/");
        return;
      }
    }
    getData();
  }, [id, navigate]);
  return (
    <div>
      <h2> Detalhes do Crypto {id} </h2>
      <h2> Nome: {coin?.name} </h2>
    </div>
  );
}

// fetch(`https://api.coingecko.com/api/v3/coins/${id}`
