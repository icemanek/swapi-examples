import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Like from "./Like";
import Loading from "./Loading";
import { useFilmReleaseOrdering } from "./useOrdering";

const FilmListBody = ({ films, pageNo = 0, pageSize = 7 }) => {
  
  const mappedFilms = films.filter(
    (_, index) => index >= pageNo * pageSize && index < (pageNo + 1) * pageSize
  );

  return (
    <tbody>
      {mappedFilms.map((el, index) => (
        <tr key={el.episode_id}>
          <td>
            {el.isVisible} {index + 1}
          </td>
          <td>
            <Link to={"/film-list/" + el.episode_id}>{el.title}</Link>
          </td>
          <td>{el.episode_id}</td>
          <td>{el.opening_crawl}</td>
          <td>{el.director}</td>
          <td>{el.producer}</td>
          <td>{el.release_date}</td>
          <td>
            <Like episodeId={el.episode_id}></Like>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

const FilmList = () => {
  const [pageNo, changePage] = useState(0);

  const [films, setFilms] = useState(undefined);

  useEffect(() => {
    fetch("https://swapi.co/api/films", { mode: "cors" })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error("Failed to fetch data from swapi");
        }
      })
      .then(json => {
        return json.results;
      })
      .then(setFilms)
      .catch(err => {
        console.log(err);
      });
  }, []);

  const changeSortOrder = useFilmReleaseOrdering(films, setFilms);

  return (
    <StyledWrapper>
      <h1>Film List</h1>
      <div className="columns">
        <div className="column">
          <div className="field">
            <label className="label">Wyszukaj po tytule</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Wyszukaj po tytule"
              />
            </div>
          </div>
          <div className="field ">
            <label className="label">Wyszukaj po dacie</label>
            <div className="columns">
              <div className="control column">
                <label className="label">Od</label>
                <input className="input" type="text" placeholder="Od" />
              </div>
              <div className="control column">
                <label className="label">Do</label>
                <input className="input" type="text" placeholder="Do" />
              </div>
            </div>
          </div>
        </div>
        <div className="field column">
          <label className="label">Date picker</label>
          <div className="control">
            <input type="date" data-is-range="true" />
          </div>
        </div>
        <div className="column">
          <label className="label">Likes</label>
          <div className="control">
            <label className="checkbox">
              <input type="checkbox" /> Liked
            </label>
            <label className="checkbox">
              <input type="checkbox" /> Unliked
            </label>
          </div>
        </div>
        <div className="column">
          <button
            className="button is-link is-light is-medium"
            onClick={() => changePage(0)}
          >
            1
          </button>
          <button
            className="button is-link is-light is-medium"
            onClick={() => changePage(1)}
          >
            2
          </button>
          <button
            className="button is-link is-light is-medium"
            onClick={() => changePage(2)}
          >
            3
          </button>
          <button
            className="button is-link is-light is-medium"
            onClick={() => changePage(3)}
          >
            4
          </button>
          <button
            className="button is-link is-light is-medium"
            onClick={() => changePage(4)}
          >
            5
          </button>
        </div>
      </div>
      {films ? (
        <table className="table is-striped is-hoverable is-fullwidth is-narrow">
          <thead>
            <tr>
              <th>#</th>
              <th onClick={() => changeSortOrder("title")}>Title</th>
              <th onClick={() => changeSortOrder("episode_id")}>Episode ID</th>
              <th onClick={() => changeSortOrder("opening_crawl")}>Opening crawl</th>
              <th onClick={() => changeSortOrder("director")}>Director</th>
              <th onClick={() => changeSortOrder("producer")}>Producer</th>
              <th onClick={() => changeSortOrder("release_date")}>Release Date</th>
              <th>Like</th>
            </tr>
          </thead>
          <FilmListBody films={films} pageNo={pageNo} />
        </table>
      ) : (
        <Loading></Loading>
      )}
    </StyledWrapper>
  );
};

export default FilmList;

const StyledWrapper = styled.div`
  padding-bottom: 10rem;
`;
