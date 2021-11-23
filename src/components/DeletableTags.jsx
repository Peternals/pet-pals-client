import React from "react";
import { getTagClass } from "../utils/tag-utils";

const DeletableTags = ({ tags, deleteTag }) => {
  return (
    <div className="field is-grouped is-grouped-multiline">
      {tags.map((tg, i) => (
        <div className="tags has-addons" key={i}>
          <span className={getTagClass(tg.color)}>{tg.value}</span>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a name={tg.value} className="tag is-delete" onClick={deleteTag}>
            {" "}
          </a>
        </div>
      ))}
    </div>
  );
};

export default DeletableTags;
