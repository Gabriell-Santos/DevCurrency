import { useParams, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export function Detail() {
  const { id } = useParams();
  const [coin, setCoin] = useState<object>();
  const navigate = useNavigate();
  useEffect(() => {
    async function getData() {
      try {
        const ResponseApi = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}`,
        );
        const data = await ResponseApi.json();

        const FormatedCoin = {
          id: data.id,
          name: data.name,
          symbol: data.symbol,
          link: data.links?.homepage?.[0],
          image: data.image.thumb,
          description:
            data.description?.pt ||
            data.description?.en ||
            "Descrição indisponível para essa moeda",
          rank: data.market_cap_rank,
          markCap: data.market_data?.market_cap?.usd,
          porcent24h: data.market_data?.price_change_percentage_24h,
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
  }, [id]);
  return (
    <div>
      <h2> Detalhes do Crypto {id} </h2>
    </div>
  );
}

// fetch(`https://api.coingecko.com/api/v3/coins/${id}`
