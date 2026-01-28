import { Outlet } from "react-router-dom";
import NavBar from '../components/Navbar';
import SolAcilirMenu from '../components/SolAcilirMenu';
import "../styles/analayout.css"
function AnaLayout() {
  return (
    <>
      <NavBar />

      <main className="main-content">
        <div className="main-content-left">
          <SolAcilirMenu />
        </div>

        <div className="main-content-right">
          <Outlet /> {/* SAĞ TARAF BURADA DEĞİŞECEK */}
        </div>
      </main>
    </>
  );
}

export default AnaLayout;