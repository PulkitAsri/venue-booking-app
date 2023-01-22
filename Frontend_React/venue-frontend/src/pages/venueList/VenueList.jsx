import "./venueList.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useParams } from "react-router-dom";
import VenueItem from "../../components/venueItem/VenueItem";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/client";

const QUERY = gql`
  query Query($orgPk: String!) {
    allVenuesForOrg(orgPk: $orgPk) {
      address
      closingTime
      description
      images
      openingTime
      pk
      venueName
    }
  }
`;
const VenueList = () => {
  // const location = useLocation();
  const { orgPk } = useParams();
  console.log(orgPk); // ▶ { sort: 'name', order: 'asecnding' }
  const { data, loading, error } = useQuery(QUERY, {
    variables: { orgPk },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  return (
    <div>
      {console.log(data)}
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listResult">
            {data.allVenuesForOrg.map((venue) => (
              <VenueItem venue={venue} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueList;
