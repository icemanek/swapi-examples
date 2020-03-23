import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import Like from "./Like";
import { Link } from "react-router-dom";

const FilmList = () => {
  const [filmList, setFilmList] = useState(null);

  useEffect(() => {
    fetch("https://swapi.co/api/films/")
      .then(resp => resp.json())
      .then(data => setFilmList(data));
  }, []);

  console.log(filmList);
  return (
    <div>
      <h1>Film List</h1>
      {filmList ? (
        <table className="table is-striped is-hoverable is-fullwidth is-narrow">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Episode ID</th>
              <th>Opening crawl</th>
              <th>Director</th>
              <th>Producer</th>
              <th>Release Date</th>
              <th>Like</th>
            </tr>
          </thead>
          <tbody>
            {filmList &&
              filmList.results.map((el, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <Link to={"/film-list/" + el.episode_id}>{el.title}</Link>
                  </td>
                  <td>{el.episode_id}</td>
                  <td>{el.opening_crawl}</td>
                  <td>{el.director}</td>
                  <td>{el.producer}</td>
                  <td>{el.release_date}</td>
                  <td>
                    <Like></Like>
                  </td>
                </tr>
              ))}
          </tbody>
          <tfoot>
            <tr>
              <td>Podsumowanie</td>
            </tr>
          </tfoot>
        </table>
      ) : (
        <Loading></Loading>
      )}
    </div>
  );
};

export default FilmList;
