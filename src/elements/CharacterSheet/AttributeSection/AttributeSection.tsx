import React from "react";

import AttributeSectionItem from "./AttributeSectionItem/AttributeSectionItem";

import { ORDERED_ATTRIBUTES } from "../../../constants/ordered-attributes.constant";

import { Attribute } from "../../../enum/attribute.enum";

import AttributeItem from "../../../models/attribute-item.model";

import { AttributeBlock } from "../../../types/attribute-block.type";

import "./AttributeSection.scss";


function AttributeSection(props: { attributes: AttributeBlock, remainingAttributePoints: number, onChange: (attribute: Attribute, newValue: number) => void }) {

  function handleChange(attribute: Attribute, newValue: number): void {

    props.onChange(attribute, newValue);
  }


  function renderAttributes(): React.ReactNode {

    const attributeNodes = new Array<React.ReactNode>();

    // Order matters, so this method enforces that
    ORDERED_ATTRIBUTES.forEach(
      (attribute: Attribute) => {

        attributeNodes.push(renderSingleAttribute(attribute, props.attributes.get(attribute)));
      }
    );

    return (
      <>
        <div className="attribute-section-wrapper">
          { attributeNodes }
        </div>
        <aside className="remaining-attribute-points">Attribute Points Remaining: {props.remainingAttributePoints}</aside>
      </>
    );
  }


  function renderSingleAttribute(attribute: Attribute, value: number): React.ReactNode {

    return (
      <AttributeSectionItem
        key={attribute}
        attribute={new AttributeItem(attribute, value)}
        remainingAttributePoints={props.remainingAttributePoints}
        onChange={(newValue) => { handleChange(attribute, newValue) }}>
      </AttributeSectionItem>
    );
  }


  return renderAttributes();
}

export default AttributeSection;
