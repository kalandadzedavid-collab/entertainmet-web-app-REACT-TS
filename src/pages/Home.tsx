import { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import TrendingCard from "../components/TrendingCard";
import ForyouCard from "../components/ForyouCard";

const Home = () => {
  const [data, setData] = useState([]);
  const [filterWord, setFitlerWord] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/movies")
      .then((res) => res.json())
      .then(setData);
  }, []);

  const trendingData = useMemo(() => {
    return data.filter((item) => item.isTrending === true);
  }, [data]);

  const filteredData = useMemo(() => {
    if (filterWord){
        return data.filter((item) => {
            return item.title.toLowerCase().includes(filterWord.toLowerCase())
        })
    }else{
        return data
    }
  }, [filterWord, data])

  console.log(data[0]);
  return (
    <>
      <Header />
      <main className="px-4 pt-6.5">
        <label className="flex gap-3 items-center mb-6.5" htmlFor="search">
          <img src="./search.svg" alt="" />
          <input onChange={(e) => setFitlerWord(e.target.value)}
            className="w-full outline-0"
            placeholder="Search for movies or TV series"
            type="text"
          />
        </label>

        <section className="flex flex-col">
          <h1 className="text-xl font-normal mb-4">Trending</h1>

          <div className="flex overflow-scroll gap-4">
            {trendingData.map((trending) => (
              <TrendingCard key={trending.id} trending={trending} />
            ))}
          </div>
        </section>

        <section className="mt-6">
          <h2
            className="text-xl
font-normal mb-6"
          >
            Recommended for you
          </h2>
          <div className="flex flex-wrap justify-between gap-5">
            {filteredData.map((item) => (
              <ForyouCard key={item.id} item={item} />
            ))}
          </div>
          <div></div>
        </section>
      </main>
    </>
  );
};

export default Home;
