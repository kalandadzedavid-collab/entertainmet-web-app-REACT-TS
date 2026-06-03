const ForyouCard = ({item}) => {
  return (
    <div className="relative w-[45%]">
      <img className="mb-2 w-full rounded-lg" src={item.thumbnail.regular.small} alt="" />
      <img className="absolute top-2 right-4" src={item.isBookmarked ? "./book.svg" : "./nobook.svg"} alt="" />
        <div>
        <div className="opacity-75 flex items-center gap-1
text-xs
font-normal">
          <p>{item.year}</p>
          <img src="./Oval.svg" alt="oval" />
          <button className="flex items-center gap-1">
            <img
              src={
                item.category == "Movie"
                  ? "./lightmovie.svg"
                  : "lighttv.svg"
              }
              alt=""
            />
            {item.category}
          </button>
          <img src="./Oval.svg" alt="oval" />
          <p>{item.rating}</p>
        </div>
        <h3 className="text-base
font-normal">{item.title}</h3>
      </div>
    </div>
  )
}

export default ForyouCard
