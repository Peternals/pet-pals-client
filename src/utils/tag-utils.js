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

export { getTagClass };
