import React from "react";
import { WithContext as ReactTags } from "react-tag-input";
import { updateNoteAPI } from "../api/noteAPI";

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const TagInput = ({ currentId, notes, setNotes }) => {
  const handleDelete = (i) => {
    const deletedTags = [...notes[currentId].tags];
    deletedTags.splice(i, 1);
    const deletedNotes = [...notes];
    const deletedNote = { ...notes[currentId], tags: deletedTags };
    deletedNotes[currentId] = deletedNote;
    setNotes(deletedNotes);
    updateNoteAPI(deletedNote);
  };

  const handleAddition = (tag) => {
    const addedTags = [...notes[currentId].tags, tag];
    const addedNotes = [...notes];
    const addedNote = { ...notes[currentId], tags: addedTags };
    addedNotes[currentId] = addedNote;
    setNotes(addedNotes);
    updateNoteAPI(addedNote);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const draggedTags = notes[currentId].tags.slice();

    draggedTags.splice(currPos, 1);
    draggedTags.splice(newPos, 0, tag);

    const draggedNotes = [...notes];
    const draggedNote = { ...notes[currentId], tags: draggedTags };
    draggedNotes[currentId] = draggedNote;
    setNotes(draggedNotes);
    updateNoteAPI(draggedNote);
  };
  // console.log("---------");
  // console.log(notes[currentId]);
  // console.log(currentId);
  // console.log("---------");

  return (
    <>
      {currentId >= 0 && (
        <div className="wholeTagBox">
          <ReactTags
            tags={notes[currentId]?.tags || []}
            suggestions={[]}
            delimiters={delimiters}
            handleDelete={handleDelete}
            handleAddition={handleAddition}
            handleDrag={handleDrag}
            inputFieldPosition="bottom"
            autocomplete
            autofocus={false}
            placeholder={"Enter a tag"}
          />
        </div>
      )}
    </>
  );
};
export default TagInput;
