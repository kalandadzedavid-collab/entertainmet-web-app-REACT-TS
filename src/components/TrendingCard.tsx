const TrendingCard = ({ trending }) => {
  return (
    <div
      className={`px-4 py-4 flex items-end shrink-0 relative w-60 h-36 rounded-lg overflow-hidden`}
    >
      <img
        className="h-full absolute z-[-1] left-0 top-0"
        src={trending.thumbnail.trending.small}
        alt="image"
      />

        <img className="absolute top-2 right-4" src={trending.isBookmarked ? "./book.svg" : "./nobook.svg"} alt="" />

      <div>
        <div className="opacity-75 flex items-center gap-1
text-xs
font-normal">
          <p>{trending.year}</p>
          <img src="./Oval.svg" alt="oval" />
          <button className="flex items-center gap-1">
            <img
              src={
                trending.category == "Movie"
                  ? "./lightmovie.svg"
                  : "lighttv.svg"
              }
              alt=""
            />
            {trending.category}
          </button>
          <img src="./Oval.svg" alt="oval" />
          <p>{trending.rating}</p>
        </div>
        <h3 className="text-base
font-normal">{trending.title}</h3>
      </div>
    </div>
  );
};

export default TrendingCard;
