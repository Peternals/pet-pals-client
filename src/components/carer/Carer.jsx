import React from "react";
import PetGrid from "./PetGrid";

import "../../styles/carer/carer.scss";
import FilterContainer from "../filter/FilterContainer";

const Carer = () => {
  return (
    <main className="carerMain">
      <FilterContainer />
      <PetGrid />
    </main>
  );
};

export default Carer;
