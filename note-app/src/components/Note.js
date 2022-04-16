const Note = ({ lastUpdatedDate, text, textTitle, onClick, isSelected }) => {
  // console.log(isSelected)
  const showText = () => {
    document.getElementById("left").style.display = "none";
    document.getElementById("right").style.display = "block";
    document.getElementById("only-view-small-screen").style.display = "block";
  };
  return (
    <div
      className={`a-content clickable${isSelected ? " clicked" : " "}`}
      onClick={onClick}
    >
      <div className="content-title">{textTitle}</div>
      <div className="time-and-date">{lastUpdatedDate}</div>
    </div>
  );
};

export default Note;
