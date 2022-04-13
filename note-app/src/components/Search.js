import React from "react";

const Search = ({ handleSearchNote, seachText, setSearchText }) => {
  return (
    <div className="contents-in-search">
      <div className="search">
        <div className="material-icons search-icon">search</div>
      </div>
      <div>
        <input
          value={seachText}
          onChange={(event) => {
            handleSearchNote(event.target.value.toLowerCase());
            setSearchText(event.target.value);
          }}
          className="search-input"
          id="search"
          type={"text"}
          placeholder="Seach all notes"
        ></input>
      </div>
    </div>
  );
};

export default Search;
