import React from "react";
import styles from "./App.module.scss";
import Search from "./components/Search";

function App() {
  return (
    <>
      <div className={styles.Container}>
        <h1 className={styles.tittle}>Buscador De CEP</h1>
        <div>
          <Search />
        </div>
      </div>
    </>
  );
}

export default App;
