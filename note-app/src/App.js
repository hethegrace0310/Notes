import React, { useEffect, useRef } from "react";
import { useState } from "react";
import Left from "./components/Left";
import Right from "./components/Right";
import Modal from "./components/Modal";
import Login from "./components/Login";
import { createNoteAPI, deleteNoteAPI, getNotesAPI } from "./api/noteAPI";
import SignUp from "./components/SignUp";
import { getUserAPI } from "./api/userAPI";
import {
  loadModel,
  determineRelatednessOfSentences,
} from "./universalSentenceEncoder";

const App = () => {
  const [notes, setNotes] = useState([]);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    colorScheme: "",
    img: "",
  });

  // console.log(notes);

  const [seletedId, setSeletedId] = useState(-1);

  const [windowWidth, setWindowWidth] = useState(0);

  const [visibleSidebar, setVisibleSidebar] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [userdata, setUserdata] = useState();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");

  const layoutRef = useRef(null);

  const [isCreatedNumber, setIsCreatedNumber] = useState(0);
  const [isDeletedNumber, setIsDeletedNumber] = useState(0);

  //addNewNote
  const addNewNote = async (text) => {
    const newNote = {
      textTitle: "New Note",
      lastUpdatedDate: new Date(),
      text: "",
      tags: [],
    };

    setSearchText("");

    const returnedNote = await createNoteAPI("New Note", "", []);
    console.log(returnedNote);

    const newNoteList = [returnedNote, ...notes];
    setNotes(newNoteList);

    setIsCreatedNumber((prev) => prev + 1);
  };

  //deleteNote
  const deleteNote = async () => {
    await deleteNoteAPI(notes[seletedId]._id);

    if (seletedId === notes.length - 1) {
      setSeletedId(notes.length - 2);
    }

    setNotes([...notes.filter((eachNote, idx) => idx != seletedId)]);

    setIsDeletedNumber((prev) => prev + 1);
  };

  useEffect(() => {
    const autoLogin = async () => {
      try {
        const userInfo = await getUserAPI();
        if (userInfo) {
          setUserdata(userInfo);
        }
      } catch (error) {
        console.log("there is no session");
      }
    };
    autoLogin();
  }, []);

  useEffect(() => {
    setProfile(userdata);
  }, [userdata]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedNote = await getNotesAPI();

      if (fetchedNote) {
        setNotes(fetchedNote);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log("the status state afftected!");

    const fetchSimilars = async () => {
      if (isCreatedNumber === 0) {
        return;
      }
      setSeletedId(0);
      const comparedNote = notes.map((note) => note.text);
      const ret = await determineRelatednessOfSentences(
        comparedNote,
        seletedId
      );

      console.log("result: ", ret);
      for (let i = 0; i < ret.length; i++) {
        if (ret[i].score >= 0.5) {
          document.getElementsByClassName("a-content")[
            i
          ].style.backgroundColor = "#e1fff9";
          document.getElementsByClassName("similarity")[i].style.display =
            "block";
          if (i == seletedId) {
            document.getElementsByClassName("a-content")[
              i
            ].style.backgroundColor = "#e5f1fd";
            document.getElementsByClassName("similarity")[i].style.display =
              "none";
          }
        } else {
          document.getElementsByClassName("a-content")[
            i
          ].style.backgroundColor = "#ffffff";
          document.getElementsByClassName("similarity")[i].style.display =
            "none";
        }
      }
    };

    fetchSimilars();
  }, [isCreatedNumber]);

  useEffect(() => {
    console.log("the status state afftected!");
    const fetchSimilars = async () => {
      if (isDeletedNumber === 0) {
        return;
      }
      const comparedNote = notes.map((note) => note.text);
      const ret = await determineRelatednessOfSentences(
        comparedNote,
        seletedId
      );

      console.log("result: ", ret);
      for (let i = 0; i < ret.length; i++) {
        if (ret[i].score >= 0.5) {
          if (document.getElementsByClassName("a-content")[i]) {
            document.getElementsByClassName("a-content")[
              i
            ].style.backgroundColor = "#e1fff9";
            document.getElementsByClassName("similarity")[i].style.display =
              "block";
            if (i == seletedId) {
              document.getElementsByClassName("a-content")[
                i
              ].style.backgroundColor = "#e5f1fd";
              document.getElementsByClassName("similarity")[i].style.display =
                "none";
            }
          }
        } else {
          document.getElementsByClassName("a-content")[
            i
          ].style.backgroundColor = "#ffffff";
          document.getElementsByClassName("similarity")[i].style.display =
            "none";
        }
      }
    };

    fetchSimilars();
  }, [isDeletedNumber]);

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
    loadModel();
    return () => {
      //unmount단계에서 실행.
      window.removeEventListener("resize", getWidth);
    };
  }, []);

  useEffect(() => {
    const fetchSimilars = async () => {
      console.log("selectedId: ", seletedId);
      console.log("notes", notes);
      console.log("notes[selectedId]", notes[seletedId]);

      const comparedNote = notes.map((note) => note.text);
      const ret = await determineRelatednessOfSentences(
        comparedNote,
        seletedId
      );

      if (!ret) {
        return;
      }

      console.log("result: ", ret);
      for (let i = 0; i < ret.length; i++) {
        if (ret[i].score >= 0.5) {
          if (document.getElementsByClassName("a-content")[i]) {
            document.getElementsByClassName("a-content")[
              i
            ].style.backgroundColor = "#e1fff9";
            document.getElementsByClassName("similarity")[i].style.display =
              "block";
            if (i == seletedId) {
              document.getElementsByClassName("a-content")[
                i
              ].style.backgroundColor = "#e5f1fd";
              document.getElementsByClassName("similarity")[i].style.display =
                "none";
            }
          }
        } else {
          document.getElementsByClassName("a-content")[
            i
          ].style.backgroundColor = "#ffffff";
          document.getElementsByClassName("similarity")[i].style.display =
            "none";
        }
      }
    };

    fetchSimilars();
  }, [seletedId]);

  return (
    <div className="whole-note" id="whole-note" ref={layoutRef}>
      {!profile ? (
        <>
          <Login
            user={user}
            setUser={setUser}
            pwd={pwd}
            setPwd={setPwd}
            setUserdata={setUserdata}
          />
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
              profile={profile}
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
          <Modal
            profile={profile}
            setProfile={setProfile}
            setUserdata={setUserdata}
          />
        </>
      )}
    </div>
  );
};

export default App;
