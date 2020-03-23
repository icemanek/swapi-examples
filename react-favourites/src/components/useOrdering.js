import React, { useEffect, useState } from "react";

function getNumberFromReleaseDate(a) {
  return Number.parseInt(a.release_date.replace(/-/g, ""));;
}

function getDateFromReleaseDate(a) {
  return new Date(a.release_date);
}

const getComparator = asc => (a, b) => {
  return asc ? -1 : 1 * (getDateFromReleaseDate(a) - getDateFromReleaseDate(b));
}

export const useFilmReleaseOrdering = (collection, setCollection) => {
  const [asc, setAsc] = useState(true);

  useEffect(() => {
    collection && setCollection(collection.sort(getComparator(asc)));
  }, [collection, asc])

  return () => setAsc(s => !s);
}