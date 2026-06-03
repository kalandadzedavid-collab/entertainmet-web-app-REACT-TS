const Header = () => {
  return (
    <header className="px-4 py-4.5 bg-[#161D2F] flex">
      <img src="./logo.svg" alt="logo" />

      <div className="flex items-center gap-5 ml-auto mr-auto">
        <img src="./all.svg" alt="everything" />
        <img src="./movies.svg" alt="movies" />
        <img src="./tv.svg" alt="tv series" />
        <img src="./bookmark.svg" alt="bookmarked" />
      </div>
    </header>
  );
};

export default Header;
