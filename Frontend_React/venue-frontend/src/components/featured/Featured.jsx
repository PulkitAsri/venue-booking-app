import { useQuery } from "@apollo/client";
import { gql } from "apollo-boost";
import "./featured.css";
import OrgItem from "./OrgItem";

const QUERY = gql`
  query Query {
    allOrgs {
      pk
      address
      email
      orgName
      website
    }
  }
`;

const Featured = () => {
  const { data, loading, error } = useQuery(QUERY);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className="featured">
      {data.allOrgs.map((org) => (
        <OrgItem org={org} />
      ))}
    </div>
  );
};

export default Featured;
