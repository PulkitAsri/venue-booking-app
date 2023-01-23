import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import "./orgContainer.css";

const OrgItem = ({ org }) => {
  const navigate = useNavigate();
  return (
    <div
      className="featuredItem"
      onClick={() => {
        navigate("/" + org.pk + "/venues", { state: { orgPk: org.pk } });
      }}
    >
      {/* <img
        src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o="
        alt=""
        className="featuredImg"
      /> */}
      <div className="featuredTitles">
        <h1>{org.orgName}</h1>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <h4>{`@ ${org.website}`}</h4>
        </div>
        <div style={{ height: "5px" }}></div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <FontAwesomeIcon icon={faLocationDot} />
          <h3>{org.address}</h3>
        </div>
      </div>
    </div>
  );
};

export default OrgItem;
