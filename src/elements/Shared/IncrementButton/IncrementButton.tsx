import "./IncrementButton.scss";


function IncrementButton(props: { isDisabled: boolean, onClick: () => void}) {

  return (
    <>
      <button type="button" onClick={props.onClick} className="increment-button sm" disabled={props.isDisabled}>+</button>
    </>
  );
}

export default IncrementButton;
