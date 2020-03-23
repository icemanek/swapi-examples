import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import Like from "./Like";
import styled from "styled-components";
import { Link } from "react-router-dom";

const FilmList = () => {
  const [filmList, setFilmList] = useState(null);

  useEffect(() => {
    fetch("https://swapi.co/api/films/")
      .then(resp => resp.json())
      .then(data => setFilmList(data));
  }, []);

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
          <button className="button is-link is-light is-medium">1</button>
          <button className="button is-link is-light is-medium">2</button>
          <button className="button is-link is-light is-medium">3</button>
          <button className="button is-link is-light is-medium">4</button>
          <button className="button is-link is-light is-medium">5</button>
        </div>
      </div>
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
