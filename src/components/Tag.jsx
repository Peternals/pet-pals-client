import React from "react";
import { getTagClass } from "../utils/tag-utils";

const Tags = ({ tags }) => {
  return (
    <div className="field is-grouped is-grouped-multiline">
      {tags.map((tg, i) => (
        <span className={getTagClass(tg.color)} key={i}>
          {tg.name}
        </span>
      ))}
    </div>
  );
};

export default Tags;
