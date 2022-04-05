import React, { Fragment } from 'react';
import { hexValid } from 'helpers/validators';
import { isEmpty } from 'lodash';
import colors from 'theme/colors.scss';
import './FieldReqs.scss';

const FieldReqs = props => {
  const {
    value,
    upper,
    lower,
    number,
    min,
    special,
    exclude,
    color,
    exColor,
    bgColor,
  } = props;

  const length = Number.isInteger(min) ? min : 8;
  const specialChars = typeof special === "string" ? special : "@#$%^&+=!";
  const test = testVal => new RegExp(`^(?=.*[${testVal}]).*$`).test(value ?? "");

  const loadIcon = (type, localVal) => {
    const local = localVal?.toLowerCase();
    const workingVal = value?.toLowerCase();
    const exclusion = type === 'exclude';
    let valid = false;
    let style;
    let exStyle;

    if (
      (type === 'number' && test("0-9")) ||
      (type === 'min' && value?.length >= length) ||
      (type === 'uppercase' && test("A-Z")) ||
      (type === 'lowercase' && test("a-z")) ||
      (type === 'special' && test(specialChars)) ||
      (exclusion && !workingVal.includes(local))
    ) valid = true;

    style = {
      color: valid
        ? hexValid(color) || colors.blue
        : hexValid(bgColor) || colors.lightGrey,
    };

    exStyle = {
      color: valid
        ? hexValid(bgColor) || colors.lightGrey
        : hexValid(exColor) || colors.red,
    };

    return (
      <i
        className={`fa-solid ${exclusion ? "fa-exclamation-circle" : "fa-check-circle"}`}
        style={exclusion ? exStyle : style}
      />
    );
  };

  const buildRequirements = () => {
    const renderContent = [];

    const addContent = (type, text, localVal) => {
      renderContent.push(
        <li key={text}>{loadIcon(type, localVal)} {text}</li>
      );
    };

    if (upper) addContent('uppercase', 'Uppercase');
    if (lower) addContent('lowercase', 'Lowercase');
    if (number) addContent('number', 'Number');
    if (min) addContent('min', `${length} Minimum`);
    if (special) addContent('special', `Special: ${specialChars.split('').join(' ')}`);

    if (!isEmpty(exclude)) {
      exclude.forEach(ex => {
        if (ex.display && ex.value) {
          addContent('exclude', ex.display, ex.value);
        }
      });
    }

    return (
      <Fragment>
        {renderContent}
      </Fragment>
    );
  };

  return (
    <ul className="reqs">
      {buildRequirements()}
    </ul>
  );
}

export default FieldReqs;