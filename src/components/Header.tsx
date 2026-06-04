const Header = ({ categoryFilt, setCategoryFilt }) => {
  return (
    <header className="px-4 py-4.5 bg-[#161D2F] flex">
      <img src="./logo.svg" alt="logo" />

      <div className="flex items-center gap-5 ml-auto mr-auto">
        <img
          className="w-5"
          onClick={() => setCategoryFilt(0)}
          src={`${categoryFilt == 0 ? "./lightall.svg" : "./all.svg"}`}
          alt="everything"
        />
        <img
          className="w-5"
          onClick={() => setCategoryFilt(1)}
          src={`${categoryFilt == 1 ? "./lightmovie.svg" : "./movies.svg"}`}
          alt="movies"
        />
        <img
          className="h-4 w-5"
          onClick={() => setCategoryFilt(2)}
          src={`${categoryFilt == 2 ? "./lighttv.svg" : "tv.svg"}`}
          alt="tv series"
        />
        <img
          className="w-5"
          onClick={() => setCategoryFilt(3)}
          src={`${categoryFilt == 3 ? "./lightbook.svg" : "bookmark.svg"}`}
          alt="bookmarked"
        />
      </div>
    </header>
  );
};

export default Header;
