import Dashboard from "./components/DashBoard";
import Login from "./components/Login";
import CadProduct from "./components/CadProducts";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import OrderTable from "./components/OrderTable";
import BudgetsTable from "./components/BudgetsTable";
import CadBudgets from "./components/CadBudgets";
import OrgTable from "./components/OrgTable";
import CadOrg from "./components/CadOrg";
import { CookiesProvider } from "react-cookie";
import CadUser from "./components/CadUser";

function App() {
  return (
    <div className="App">
      <CookiesProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/CadUser" element={<CadUser />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/OrderTable" element={<OrderTable />} />
            <Route path="/CadProducts" element={<CadProduct />} />
            <Route path="/BudgetsTable" element={<BudgetsTable />} />
            <Route path="/CadBudgets" element={<CadBudgets />} />
            <Route path="/OrgTable" element={<OrgTable />} />
            <Route path="/CadOrg" element={<CadOrg />} />
          </Routes>
        </Router>
      </CookiesProvider>
    </div>
  );
}

export default App;
