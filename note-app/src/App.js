import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Left from "./components/Left";
import Right from "./components/Right";
import Modal from "./components/Modal";

const App = () => {
  const [notes, setNotes] = useState([
    // {
    //   textTitle: "CSE 316",
    //   date: new Date("Mon Apr 4 2022 23:02:18 GMT+0900"),
    //   text: "CSE 316",
    //   tags: [],
    // },
    // {
    //   textTitle: "Another wrapping line example! This is another text",
    //   date: new Date("Mon Apr 4 2022 22:02:18 GMT+0900"),
    //   text: "Another wrapping line example! This is another text",
    //   tags: [],
    // },
  ]);

  const [seletedId, setSeletedId] = useState(-1);

  const [windowWidth, setWindowWidth] = useState(0);

  const [visibleSidebar, setVisibleSidebar] = useState(false);
  const [searchText, setSearchText] = useState("");

  const layoutRef = useRef(null);

  //addNewNote
  const addNewNote = (text) => {
    const newNote = {
      textTitle: "New Note",
      date: new Date(),
      text: "",
      tags: [],
    };

    const newNoteList = [newNote, ...notes];

    setNotes(newNoteList);

    setSeletedId(0);
    console.log(newNoteList);

    setSearchText("");
  };

  //deleteNote
  const deleteNote = () => {
    if (seletedId === notes.length - 1) {
      setSeletedId(notes.length - 2);
    }

    setNotes([...notes.filter((eachNote, idx) => idx != seletedId)]);
  };

  //saving notes to local storage
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes-data"));

    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notes-data", JSON.stringify(notes));
  }, [notes]);

  const getWidth = () => {
    if (layoutRef.current) {
      console.log(layoutRef?.current.clientWidth);
      setWindowWidth(layoutRef?.current.clientWidth);
    }
  };

  useEffect(() => {
    // mount 단계
    getWidth();
    window.addEventListener("resize", getWidth);
    return () => {
      //unmount단계에서 실행.
      window.removeEventListener("resize", getWidth);
    };
  }, []);

  return (
    <div className="whole-note" id="whole-note" ref={layoutRef}>
      {((windowWidth <= 500 && visibleSidebar) || windowWidth > 500) && (
        <Left
          notes={notes.filter((note) =>
            note.text.toLowerCase().includes(searchText)
          )}
          addNewNote={addNewNote}
          seletedId={seletedId}
          setSeletedId={setSeletedId}
          windowWidth={windowWidth}
          setVisibleSidebar={setVisibleSidebar}
          searchText={searchText}
          setSearchText={setSearchText}
        />
      )}
      {((windowWidth <= 500 && !visibleSidebar) || windowWidth > 500) && (
        <Right
          deleteNote={deleteNote}
          notes={notes}
          setNotes={setNotes}
          seletedId={seletedId}
          // getTimeAndDate={getTimeAndDate}
          setSeletedId={setSeletedId}
          setVisibleSidebar={setVisibleSidebar}
        />
      )}
      <Modal />
    </div>
  );
};

export default App;
