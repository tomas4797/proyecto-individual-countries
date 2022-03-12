import React from "react";
import { getallcountries, getallActivities } from "../actions/index.js";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AlphabeticalFilter from "./AlphabeticalFilter";
import FilterByContinent from "./FilterByContinent";
import FilterByPopulation from "./FilterByPopulation";
import FilterByActivity from "./FilterByActivity";
import CountriesCards from "./CountriesCards";
import Paging from "./Paging";
import SearchBar from "./searchBar";
import Styles from "./home.module.css";
import ButtonCreateActivity from "./ButtonCreateActivity";
import ButtonReloadCountries from "./ButtonReloadCountries";

const Home = () => {
  ///////////local-states////////////////
  const loadedCountries = useSelector((state) => state.loadedCountries);
  const allcountries = useSelector((state) => state.allcountries); //Me traigo el estado local //Es lo mismo que hacer el mapstatetoprops
  const [currentPage, setCurrentPage] = useState(1); //constante que me me setea la pagina actual
  //Pises por pagina
  let countriesPerPage = 0;
  currentPage === 1 ? (countriesPerPage = 9) : (countriesPerPage = 10);

  const lastCountryIndex = currentPage * countriesPerPage;
  const firstCountryIndex = lastCountryIndex - countriesPerPage;
  const [order, setOrder] = useState(""); // estado para que el render se  actualize
  const currentCountries = loadedCountries.slice(
    //constante que me dice cuantos paises van haber dependiendo de la  pagina que haga click
    firstCountryIndex,
    lastCountryIndex
  );

  const paging = (value) => {
    // funcion seteadora de pagina
    setCurrentPage(value);
  };

  ///////////hooks////////////////////////
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getallcountries());
    dispatch(getallActivities());
  }, [dispatch]);

  /////////////Functions /////////////////////
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getallcountries());
  };
  return (
    <div className={Styles.container}>
      <h1 className={Styles.title}>Find your country App</h1>
      <div className={Styles.buttons}>
        <div>
          <Link to="/">
            <button className={Styles.button}>
              <span class={Styles.shadow}></span>
              <span class={Styles.edge}></span>
              <span class={`${Styles.front} ${Styles.text}`}>Exit</span>
            </button>
          </Link>
        </div>
        <ButtonReloadCountries handleClick={handleClick} />
        <ButtonCreateActivity />
      </div>
      <SearchBar />
      <div>
        <div>
          <h2 className={Styles.title2}>Filter Options</h2>
        </div>
        <div className={Styles.filters}>
          <AlphabeticalFilter
            setCurrentPage={setCurrentPage}
            setOrder={setOrder}
          />
          <FilterByContinent
            allcountries={allcountries}
            setCurrentPage={setCurrentPage}
            setOrder={setOrder}
          />
          <FilterByPopulation
            setCurrentPage={setCurrentPage}
            setOrder={setOrder}
          />
          <FilterByActivity setCurrentPage={setCurrentPage} />
        </div>
      </div>
      <div>
        <CountriesCards currentCountries={currentCountries} />
      </div>
      <div>
        <Paging
          countriesPerPage={countriesPerPage}
          loadedCountries={loadedCountries.length}
          paging={paging}
        />
      </div>
    </div>
  );
};

export default Home;
