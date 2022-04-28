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
  profile,
}) => {
  const openModal = () => {
    document.getElementById("modal-background").style.display = "block";
  };

  const getTimeAndDate = (today) => {
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
        {/* <img
          src="/img/profile.png"
          className="profile-img clickable"
          onClick={openModal}
        ></img> */}
        {!(profile.profileImage == "") ? (
          <img
            src={profile?.profileImage}
            alt="profile"
            className="profile-img clickable"
            onClick={openModal}
          />
        ) : (
          <img
            src="/img/initial-img.png"
            className="profile-img clickable"
            onClick={openModal}
          ></img>
        )}
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
              textTitle={note.textTitle ? note.textTitle : "New Note"}
              lastUpdatedDate={getTimeAndDate(note.lastUpdatedDate)}
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
