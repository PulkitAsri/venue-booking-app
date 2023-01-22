const VenueCard = ({ venue }) => {
  const openingTime = venue.openingTime.slice(0, -1);
  const closingTime = venue.closingTime.slice(0, -1);
  return (
    <div className="fpItem">
      <img
        src="https://media.istockphoto.com/id/1295114854/photo/empty-red-armchairs-of-a-theater-ready-for-a-show.jpg?b=1&s=170667a&w=0&k=20&c=W__8iZMDp4XtPAMPRuTPPYzszc1A4fdajYGn0ox9kG4="
        alt=""
        className="fpImg"
      />
      <span className="fpName">{venue.venueName}</span>
      <span className="fpCity">{venue.address}</span>
      <span className="fpPrice">{`${openingTime} - ${closingTime}`}</span>
      <div className="fpRating">
        <button>8.9</button>
      </div>
    </div>
  );
};
export default VenueCard;
