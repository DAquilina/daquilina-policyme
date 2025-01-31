import { Class } from "../../../../enum/class.enum";

import "./ClassTile.scss";


function ClassTile(props: { targetClass: Class, isDisabled: boolean, isSelected: boolean, onSelect: (targetClass: Class) => void }) {

  function getClassName(): string {

    let className = "class-tile";

    if (props.isDisabled) {
      className += ` disabled`;
    }

    if (props.isSelected) {
      className += ` selected`;
    }

    return className;
  }


  function handleSelect(): void {

    if (!props.isDisabled) {
      props.onSelect(props.targetClass);
    }
  }

  return (
    <>
      <div className={getClassName()} onClick={handleSelect}>
        <span className="class-name">{props.targetClass}</span>
      </div>
    </>
  );
}

export default ClassTile;
