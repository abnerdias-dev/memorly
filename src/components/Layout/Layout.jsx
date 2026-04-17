import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import styles from "./Layout.module.css";

function Layout() {
  return (
    <>
      <div className={styles.layout}>
        <div className={styles.content}>
          <Outlet />
        </div>
        <Navbar />
      </div>
    </>
  );
}

export default Layout;
