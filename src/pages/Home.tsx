import { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import TrendingCard from "../components/TrendingCard";
import ForyouCard from "../components/ForyouCard";
import { useNavigate } from "react-router-dom";

const Home = ({loggedIn}) => {
const navigate = useNavigate();
  if (!loggedIn){
    navigate("/");
  }

  const [data, setData] = useState([]);
  const [filterWord, setFitlerWord] = useState("");
  const [categoryFilt, setCategoryFilt] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3000/movies")
      .then((res) => res.json())
      .then(setData);
  }, []);

  const trendingData = useMemo(() => {
    return data.filter((item) => item.isTrending === true);
  }, [data]);

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      // 1. Text Filter Condition
      const matchesText = filterWord
        ? item.title.toLowerCase().includes(filterWord.toLowerCase())
        : true;

      // 2. Category / Bookmark Filter Condition
      let matchesCategory = true; // Default to true (covers categoryFilt === 0)

      if (categoryFilt === 1) {
        matchesCategory = item.category === "Movie";
      } else if (categoryFilt === 2) {
        matchesCategory = item.category === "TV Series";
      } else if (categoryFilt === 3) {
        matchesCategory = item.isBookmarked === true;
      }

      // Both conditions must be true
      return matchesText && matchesCategory;
    });
  }, [filterWord, categoryFilt, data]);

  console.log(data);
  return (
    <>
      <Header setCategoryFilt={setCategoryFilt} categoryFilt={categoryFilt} />
      <main className="px-4 pt-6.5">
        <label className="flex gap-3 items-center mb-6.5" htmlFor="search">
          <img src="./search.svg" alt="" />
          <input
            onChange={(e) => setFitlerWord(e.target.value)}
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
