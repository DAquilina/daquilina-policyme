import "./DecrementButton.scss";


function DecrementButton(props: { isDisabled: boolean, onClick: () => void}) {

  return (
    <>
      <button type="button" onClick={props.onClick} className="decrement-button sm" disabled={props.isDisabled}>-</button>
    </>
  );
}

export default DecrementButton;
