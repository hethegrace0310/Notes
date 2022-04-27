import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Left from "./components/Left";
import Right from "./components/Right";
import Modal from "./components/Modal";
import Login from "./components/Login";
import { createNoteAPI, deleteNoteAPI, getNotesAPI } from "./api/noteAPI";
import SignUp from "./components/SignUp";
import { getUserAPI } from "./api/userAPI";

const App = () => {
  const [notes, setNotes] = useState([]);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    colorScheme: "",
  });

  console.log(notes);

  const [seletedId, setSeletedId] = useState(-1);

  const [windowWidth, setWindowWidth] = useState(0);

  const [visibleSidebar, setVisibleSidebar] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [userdata, setUserdata] = useState();

  const layoutRef = useRef(null);

  //addNewNote
  const addNewNote = async (text) => {
    const newNote = {
      textTitle: "New Note",
      lastUpdatedDate: new Date(),
      text: "",
      tags: [],
    };

    setSeletedId(0);

    setSearchText("");

    const returnedNote = await createNoteAPI("New Note", "", []);
    console.log(returnedNote);

    const newNoteList = [returnedNote, ...notes];
    setNotes(newNoteList);
  };

  //deleteNote
  const deleteNote = async () => {
    if (seletedId === notes.length - 1) {
      setSeletedId(notes.length - 2);
    }

    await deleteNoteAPI(notes[seletedId]._id);

    setNotes([...notes.filter((eachNote, idx) => idx != seletedId)]);
  };

  useEffect(() => {
    getUserAPI().then((user) => {
      if (user) {
        setUserdata(user);
      }
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedNote = await getNotesAPI();

      if (fetchedNote) {
        setNotes(fetchedNote);
      }
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //   localStorage.setItem("notes-data", JSON.stringify(notes));
  // }, [notes]);

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
      {!userdata ? (
        <>
          <Login setUserdata={setUserdata} />
          <SignUp />
        </>
      ) : (
        <>
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
              notes={notes.filter((note) =>
                note.text.toLowerCase().includes(searchText)
              )}
              setNotes={setNotes}
              seletedId={seletedId}
              setSeletedId={setSeletedId}
              setVisibleSidebar={setVisibleSidebar}
            />
          )}
          <Modal profile={profile} setProfile={setProfile} />
        </>
      )}
    </div>
  );
};

export default App;
