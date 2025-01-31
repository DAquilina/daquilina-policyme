import "./CharacterSheetActions.scss";


function CharacterSheetActions(props: { onCancel: () => void, onSave: () => void, isDisabled: boolean }) {

  return (
    <>
      <div className="character-sheet-actions-container">
        <button type="button" onClick={() => { props.onCancel(); }}>Cancel</button>
        <button type="button" disabled={props.isDisabled} onClick={() => { props.onSave(); }}>Save</button>
      </div>
    </>
  );
}

export default CharacterSheetActions;
