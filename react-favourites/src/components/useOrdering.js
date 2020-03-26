import React, { useEffect, useState } from "react";

function getNumberFromReleaseDate(a) {
  return Number.parseInt(a.release_date.replace(/-/g, ""));
}

function getDateFromReleaseDate(a) {
  return new Date(a.release_date);
}

const getComparator = asc => (a, b) => {
  return (
    (asc ? -1 : 1) * (getDateFromReleaseDate(a) - getDateFromReleaseDate(b))
  );
};

const isSorted = asc => (collectionOld, collectionSorted) => {
  for (var i = 0; i < collectionOld.length; i++) {
    const result =
      getComparator(asc)(collectionOld[i], collectionSorted[i]) === 0;
    if (!result) {
      return false;
    }
  }
  return true;
};

export const useFilmReleaseOrdering = (collection, setCollection) => {
  const [asc, setAsc] = useState(true);

  useEffect(() => {
    if (collection) {
      const sortedCollection = [...collection].sort(getComparator(asc));
      if (!isSorted(asc)(collection, sortedCollection)) {
        setCollection(sortedCollection);
      }
    }
  }, [asc, collection]);

  return () => setAsc(s => !s);
};
