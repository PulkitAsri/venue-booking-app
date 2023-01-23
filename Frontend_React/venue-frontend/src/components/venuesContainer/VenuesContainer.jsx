import { gql, useQuery } from "@apollo/client";
import VenueItem from "../venueItem/VenueItem";
import "./venueCard.css";
import VenueCard from "./VenueCard";
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
        <VenueCard venue={venue} org={venue.orgPk} key={venue.pk} />
      ))}
    </div>
  );
};

export default VenueContainer;
