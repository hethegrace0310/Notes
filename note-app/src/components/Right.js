import { updateNoteAPI } from "../api/noteAPI";
import TagInput from "./TagInput";

const Right = ({
  deleteNote,
  notes,
  setNotes,
  seletedId,
  setSeletedId,
  setVisibleSidebar,
}) => {
  const saveNote = async (newText) => {
    let forSplitText = newText;
    let splitNewText = forSplitText.split("\n");
    let firstlineForTextTitle = splitNewText[0];

    const newNoteList = [
      ...notes.map((note, idx) =>
        idx != seletedId
          ? note
          : newText == ""
          ? {
              ...note,
              text: "",
              textTitle: "New Note",
              lastUpdatedDate: new Date(),
              tags: [],
            }
          : {
              ...note,
              text: newText,
              textTitle: firstlineForTextTitle,
              lastUpdatedDate: new Date(),
            }
      ),
    ];

    await updateNoteAPI({
      ...notes[seletedId],
      textTitle: firstlineForTextTitle,
      text: newText,
      lastUpdatedDate: new Date(),
    });

    const orderedDate = [...newNoteList].sort(
      (a, b) => new Date(b.lastUpdatedDate) - new Date(a.lastUpdatedDate)
    );
    // console.log(orderedDate);
    setNotes(orderedDate);

    setSeletedId(0);
  };

  return (
    <div className="right" id="right">
      <div className="top-icons">
        <div className="only-view-small-screen" id="only-view-small-screen">
          <div
            className="material-icons clickable"
            onClick={() => setVisibleSidebar(true)}
          >
            arrow_back
          </div>
        </div>
        <div className="material-icons clickable">notification_add</div>
        <div className="material-icons clickable">person_add_alt</div>
        <div className="material-icons clickable" onClick={deleteNote}>
          delete_outline
        </div>
      </div>

      <div className="div-for-text">
        <p id="texts">
          <textarea
            className="text-input"
            id="text-input"
            value={notes[seletedId]?.text || ""}
            onChange={(e) => {
              saveNote(e.currentTarget.value);
            }}
            disabled={seletedId < 0}
          ></textarea>
        </p>
      </div>

      <TagInput currentId={seletedId} setNotes={setNotes} notes={notes} />
    </div>
  );
};
export default Right;
