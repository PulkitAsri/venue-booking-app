import { gql, useQuery } from "@apollo/client";
import VenueItem from "../venueItem/VenueItem";
import "./venueCard.css";
import VenueCard from "./VenueCard";
import { Link } from "react-router-dom";
const QUERY = gql`
  query Query {
    allVenues {
      pk
      venueName
      openingTime
      closingTime
      address
      description
      images
      orgPk {
        pk
        orgName
        website
      }
    }
  }
`;
const VenueContainer = () => {
  const { data, loading, error } = useQuery(QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  return (
    <div className="fp">
      {data.allVenues.map((venue) => (
        <Link
          to={`${venue.orgPk.pk}/venues/${venue.pk}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <VenueCard venue={venue} org={venue.orgPk} key={venue.pk} />
        </Link>
      ))}
    </div>
  );
};

export default VenueContainer;
