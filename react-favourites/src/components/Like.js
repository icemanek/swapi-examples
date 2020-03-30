import React, { useEffect, useState } from "react";

const cookieStorage = {
  getItem: (key) => {
    const allCookies = document.cookie;
    const entry = allCookies.split(";").map(x => x.split("=").map(x => x.trim())).find(x => x[0] === key)
    return entry ? entry[1] : undefined
  },
  setItem: (key, value) => {
    document.cookie = `${key}=${value}`
  }
}

/**
 * HomeWork
 */
const cookieSessionStorage = {
  getItem: (key) => {
    const allCookies = document.cookie;
    const entry = allCookies.split(";").map(x => x.split("=").map(x => x.trim())).find(x => x[0] === key)
    return entry ? entry[1] : undefined
  },
  setItem: (key, value) => {
    document.cookie = `${key}=${value}`
  }
}

const storageToUse = cookieStorage;

const EpisodeLike = ({ episodeId }) => {
  const isLiked = storageToUse.getItem("Episode" + episodeId) === "true";
  const [like, toggleLike] = useState(isLiked);

  const heartIcon = like ? "fas fa-heart" : "far fa-heart";

  return (
    <i
      style={{ cursor: "pointer", color: "#E53A40" }}
      onClick={() =>
        toggleLike(prevState => {
          storageToUse.setItem("Episode" + episodeId, !prevState);
          return !prevState;
        })
      }
      className={heartIcon}
    ></i>
  );
};

export default EpisodeLike;
