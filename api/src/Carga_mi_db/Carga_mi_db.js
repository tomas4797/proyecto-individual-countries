const axios = require("axios");
const { Country } = require ("../db.js");

const URLAPI = "https://restcountries.com/v3/all";
const Carga_mi_db = async () => {
    try {
        const Infoapi = await axios.get(URLAPI);
        console.log (Infoapi)
        const necessaryInfo = await Infoapi.data.map ((el) => {
            return {
                id: el.cca3,
                name: el.name.common,
                flagimage: el.flags [0],
                continent: el.continents[0],
                capital: el.capital,
                subregion: el.subregion,
                area: el.area,
                population: el.population,
            };
        });

        necessaryInfo.map (async (el) => {
            await Country.findOrCreate ({
                where: {
                    id: el.id,
                    name: el.name.toLowerCase(),
                    flagImage: el.flagImage,
                    continent: el.continent,
                    capital: el.capital ? el.capital [0]: "Este Pais no tiene capital",
                    subregion: el.subregion ? el.subregion : "Este Pais no tiene region ",
                    area: el.area,
                    population: el.population,
                },
            });
        });
        return necessaryInfo;
    }catch (e) {

    }

};
module.exports = { Carga_mi_db };
