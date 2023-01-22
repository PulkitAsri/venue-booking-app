const VenueCard = ({ venue }) => {
  const openingTime = venue.openingTime.slice(0, -1);
  const closingTime = venue.closingTime.slice(0, -1);
  return (
    <div className="fpItem">
      <img
        src="https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=e148feeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1"
        alt=""
        className="fpImg"
      />
      <span className="fpName">{venue.venueName}</span>
      <span className="fpCity">{venue.address}</span>
      <span className="fpPrice">{`${openingTime} - ${closingTime}`}</span>
      <div className="fpRating">
        <button>8.9</button>
        <span>orgPk</span>
      </div>
    </div>
  );
};
export default VenueCard;
