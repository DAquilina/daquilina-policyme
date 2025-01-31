import React from "react";

import "./ToggleButton.scss";


function ToggleButton(props: { state: boolean, handleToggle: () => void, label: string }) {

  const [buttonClass, setButtonClass] = React.useState<string>(getButtonClass(props.state));


  React.useEffect(() => {

    setButtonClass(getButtonClass(props.state));
  }, [props.state]);


  function getButtonClass(isToggled: boolean): string {

    return `toggle-button ${isToggled ? "on" : "off"}`;
  }


  return (
    <>
      <button type="button" onClick={props.handleToggle} className={buttonClass}>{props.label}</button>
    </>
  );
}

export default ToggleButton;
