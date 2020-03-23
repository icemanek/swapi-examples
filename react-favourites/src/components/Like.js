import React, { useState } from "react";

const Like = () => {
  const [like, toggleLike] = useState(false);

  const heartIcon = like ? "fas fa-heart" : "far fa-heart";

  return (
    <i
      style={{ cursor: "pointer", color: "#E53A40" }}
      onClick={() => toggleLike(prevState => !prevState)}
      className={heartIcon}
    ></i>
  );
};

export default Like;
