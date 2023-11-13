
import "./Admin.css";
import "./Sidebar.css";
import "./Dashboard.css";
import "./Orders.css";
import Dashboard from "./Dashboard";

function Admin() {
  const [games, setGames] = useState([]);

  return (
    <div className="container content hv-100">
      <div className="row">
        <Dashboard />
      </div>
    </div>
  );
}

export default Admin;
