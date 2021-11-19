import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PetHealth from "./PetHealth";
import Playing from "./Playing";
import Size from "./Size";
import Trained from "./Trained";
import Type from "./Type";

const FilterContainer = () => {
  return (
    <div>
      <Type />
      <Size />
      <PetHealth />
      <Trained />
      <Playing />
    </div>
  );
};

export default FilterContainer;
