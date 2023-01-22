import { useNavigate } from "react-router-dom";
import "./venueItem.css";

const VenueItem = ({ venue }) => {
  const navigate = useNavigate();
  const openingTime = venue.openingTime.slice(0, -1);
  const closingTime = venue.closingTime.slice(0, -1);

  return (
    <div className="searchItem">
      <img
        src="https://cf.bstatic.com/xdata/images/hotel/square600/261707778.webp?k=fa6b6128468ec15e81f7d076b6f2473fa3a80c255582f155cae35f9edbffdd78&o=&s=1"
        alt=""
        className="siImg"
      />
      <div className="siDesc">
        <h1 className="siTitle">{venue.venueName}</h1>
        <span className="siDistance">{venue.address}</span>
        <span className="siTaxiOp">
          {openingTime} - {closingTime}
        </span>
        <span className="siSubtitle">
          {venue.address}
        </span>
        <span className="siFeatures">
          {venue.description}
        </span>
      </div>
      <div className="siDetails">
        <div className="siRating">
          <button>8.9</button>
        </div>
        <div className="siDetailTexts">
          <button
            className="siCheckButton"
            onClick={() => {
              navigate("./" + venue.pk, {
                replace: true,
                state: { venuePk: venue.pk },
              });
            }}
          >
            See availability
          </button>
        </div>
      </div>
    </div>
  );
};

export default VenueItem;
