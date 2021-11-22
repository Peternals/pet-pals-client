import React from "react";

const Tags = ({ tags }) => {
  const getTagClass = (color) => {
    switch (color) {
      case "yellow":
        return "tag is-warning";
      case "orange":
        return "tag is-coral";
      case "green":
        return "tag is-success";
      case "red":
        return "tag is-danger";
      case "blue":
        return "tag is-info";
      default:
        return "tag is-dark";
    }
  };

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
