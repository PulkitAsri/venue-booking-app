import { useNavigate } from "react-router-dom";
import "./featured.css";

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
        <h2>{org.address}</h2>
      </div>
    </div>
  );
};

export default OrgItem;
