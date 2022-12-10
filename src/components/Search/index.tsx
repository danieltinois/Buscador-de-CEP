import React, { FormEvent, useState, useEffect } from "react";
import styles from "./search.module.scss";
import { AiOutlineSearch } from "react-icons/ai";
import Api from "../../services/api";
import { CepModel } from "../../models/cep.model";
import { mask, unMask } from "node-masker";
import Swal from "sweetalert2";

const Search = () => {
  const [input, setInput] = useState("");
  const [cep, setCep] = useState<CepModel | undefined>();
  const [cepChange, setCepChange] = useState<boolean>(false);

  useEffect(() => {
    if (input.length < 8) {
      return;
    }
    if (input.length === 8) {
      handleSearch();
    }
  }, [input]);

  useEffect(() => {
    setCepChange(false);
  }, [cep]);

  const handleSearch = async (event?: FormEvent) => {
    event?.preventDefault();

    if (input.length < 8 || input === "") {
      Swal.fire({
        background: "#17181f",
        icon: "warning",
        title: "Validação.",
        text: "Favor informar um CEP válido.",
      });
      return;
    }

    try {
      const respBuscaCep = await Api.get(`${input}/json`);
      let resultadoApi: CepModel = respBuscaCep.data;

      if (resultadoApi.erro) {
        Swal.fire({
          background: "#17181f",
          icon: "warning",
          title: "Validação.",
          text: "CEP não encontrado.",
        });
        setInput("");
        return;
      }

      if (resultadoApi) {
        setCep(resultadoApi);
        setInput("");
        setCepChange(true);
        return;
      }
    } catch (error) {
      Swal.fire({
        background: "#17181f",
        icon: "warning",
        title: "Validação.",
        text: "CEP não encontrado.",
      });
      setInput("");
      return;
    }
  };

  return (
    <div className={styles.Container}>
      <div className={styles.mainInput}>
        <form id="pesquisar" autoComplete="off" onSubmit={handleSearch}>
          <button className={styles.searchIcon}>
            <AiOutlineSearch size={28} />
          </button>
          <input
            type="text"
            className={`${styles.inputConfig}`}
            id="textoDigitado"
            name="textoDigitado"
            placeholder="Digite seu cep..."
            value={mask(input!, ["99999-999"])}
            onChange={(e) => {
              setInput(unMask(e.target.value));
            }}
            autoComplete="Off"
          />
        </form>
      </div>
      {!cepChange && cep?.cep! && (
        <div className={styles.main}>
          <div className={styles.info}>
            {/* Diz que apropriedade não existe no tipo '{}' (tentar consertar depois) */}
            <h2>CEP: {cep.cep}</h2>
            <span>{cep.logradouro}</span>
            <span>Bairro: {cep.bairro}</span>
            <span>
              {cep.localidade} - {cep.uf}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
