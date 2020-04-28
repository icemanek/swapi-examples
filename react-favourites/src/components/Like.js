import React, { useEffect, useState, useContext } from "react";
import Firebase from "firebase";

import AuthContext from "../AuthContext";

const cookieStorage = {
  getItem: (key) => {
    const allCookies = document.cookie;
    const entry = allCookies
      .split(";")
      .map((x) => x.split("=").map((x) => x.trim()))
      .find((x) => x[0] === key);
    return entry ? entry[1] : undefined;
  },
  setItem: (key, value) => {
    document.cookie = `${key}=${value}`;
  },
};

/**
 * HomeWork
 */
const cookieSessionStorage = {
  getItem: (key) => {
    const allCookies = document.cookie;
    const entry = allCookies
      .split(";")
      .map((x) => x.split("=").map((x) => x.trim()))
      .find((x) => x[0] === key);
    return entry ? entry[1] : undefined;
  },
  setItem: (key, value) => {
    document.cookie = `${key}=${value}`;
  },
};

const localStoregeWrapper = {
  getItem: (key) => {
    return new Promise((resolve, reject) => {
      const stringValue = localStorage.getItem(key);
      if (stringValue) {
        resolve(stringValue === "true");
      } else {
        resolve(false);
      }
    });
  },
  setItem: (key, value) => {
    localStorage.setItem(key, value);
  },
};

/**
 * Firebase storage
 */
const firebaseStorage = (userId) => ({
  getItem: (key) => {
    return new Promise((resolve, reject) => {
      console.log("FB getItem", key);
      const ref = Firebase.firestore()
        .collection(`users/${userId}/favourites`)
        .doc(key);
      ref.get().then((doc) => {
        console.log(doc.data());
        if (doc.exists) {
          const data = doc.data();
          resolve(data.like);
        } else {
          resolve(false);
        }
      });
    });
  },
  setItem: (key, value) => {
    console.log(key, value);
    Firebase.firestore().doc(`users/${userId}/favourites/${key}`).set({
      like: value,
    });
  },
});

const EpisodeLike = ({ episodeId }) => {
  const [like, toggleLike] = useState();
  const authContext = useContext(AuthContext);

  const storageToUse = authContext
    ? firebaseStorage(authContext.id)
    : localStoregeWrapper;

  useEffect(() => {    
    const promies = storageToUse.getItem("Episode" + episodeId)
    promies.then((isLiked) => {
      toggleLike(isLiked);
    });
  }, []);

  const heartIcon = like ? "fas fa-heart" : "far fa-heart";

  return (
    <i
      style={{ cursor: "pointer", color: "#E53A40" }}
      onClick={() =>
        toggleLike((prevState) => {
          storageToUse.setItem("Episode" + episodeId, !prevState);
          return !prevState;
        })
      }
      className={heartIcon}
    ></i>
  );
};

export default EpisodeLike;
