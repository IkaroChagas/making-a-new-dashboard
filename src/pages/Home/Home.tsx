import React from "react";

import styles from "./Home.module.css";
import Sidebar from "../../components/layout/Sidebar";


const Home = () => {
    return (
        <>
            <Sidebar />
            <p className={styles.p}>Seja bem vindo. Navegue pelo o menu lateral.</p>
        </>
    );
};

export default Home;