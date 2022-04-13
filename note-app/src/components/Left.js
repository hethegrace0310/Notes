import { useState } from "react";
import Note from "./Note";
import Modal from "./Modal";
import Search from "./Search";
const Left = ({
  notes,
  addNewNote,
  seletedId,
  setSeletedId,
  windowWidth,
  setVisibleSidebar,
  searchText,
  setSearchText,
}) => {
  const openModal = () => {
    document.getElementById("modal-background").style.display = "block";
  };

  //getTimeAndDate
  const getTimeAndDate = (today) => {
    // let today = new Date();
    if (typeof today === "string") {
      today = new Date(today);
    }

    let year = today.getFullYear().toString();
    let month = (today.getMonth() + 1).toString();
    let date = today.getDate().toString();

    let hours = today.getHours().toString() % 12 || 12;
    let minutes = today.getMinutes().toString();
    let seconds = today.getSeconds().toString();

    let ampm = hours < 12 ? "PM" : "AM";

    return (
      month +
      "/" +
      date +
      "/" +
      year +
      ", " +
      hours +
      ":" +
      minutes +
      ":" +
      seconds +
      " " +
      ampm
    );
  };
  return (
    <div
      className="left"
      style={windowWidth <= 500 ? { width: "100%" } : {}}
      id="left"
    >
      <div className="main-title-box">
        <button className="profile-picture-button" onClick={openModal}></button>
        <button className="my-notes-title">My notes</button>
        <button className="add-new-note">
          <div className="material-icons" onClick={addNewNote}>
            note_add
          </div>
        </button>
      </div>

      <div className="contents">
        <Search
          handleSearchNote={(newValue) => {
            setSearchText(newValue);
            setSeletedId(0);
          }}
          setSearchText={setSearchText}
          seachText={searchText}
        />
        <div className="contents-in" id="contents-in">
          {notes.map((note, idx) => (
            <Note
              key={`note-${idx}`}
              textTitle={note.textTitle}
              date={getTimeAndDate(note.date)}
              text={note.text}
              onClick={() => {
                setSeletedId(idx);
                setVisibleSidebar(false);
              }}
              isSelected={seletedId === idx}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Left;
