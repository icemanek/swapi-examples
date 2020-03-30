import React, { useEffect, useState } from "react";

function getNumberFromReleaseDate(a) {
  return Number.parseInt(a.release_date.replace(/-/g, ""));
}

function getDateFromReleaseDate(a) {
  return new Date(a.release_date);
}

const getComparator = sortObj => (a, b) => {
  if (sortObj.property === "release_date") {
    return (
      (sortObj.asc ? -1 : 1) *
      (getDateFromReleaseDate(a) - getDateFromReleaseDate(b))
    );
  } else {
    return (
      (sortObj.asc ? -1 : 1) *
      `${a[sortObj.property]}`.localeCompare(`${b[sortObj.property]}`)
    );
  }
};

const isSorted = sortObj => (collectionOld, collectionSorted) => {
  for (var i = 0; i < collectionOld.length; i++) {
    const result =
      getComparator(sortObj)(collectionOld[i], collectionSorted[i]) === 0;
    if (!result) {
      return false;
    }
  }
  return true;
};

export const useFilmReleaseOrdering = (collection, setCollection) => {
  const [sortObj, setSortObj] = useState({
    property: "release_date",
    asc: true
  });

  useEffect(() => {
    if (collection) {
      const sortedCollection = [...collection].sort(getComparator(sortObj));
      if (!isSorted(sortObj)(collection, sortedCollection)) {
        setCollection(sortedCollection);
      }
    }
  }, [sortObj, collection]);

  return property => {
    setSortObj(s => {
      return { property, asc: !s.asc };
    });
  };
};
