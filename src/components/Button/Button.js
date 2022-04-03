import React, { useState } from "react";
import { iconValid, btnValid, urlValid } from 'helpers/validators';
import "./Button.scss";

const Button = props => {
  const {
    text,
    style,
    hoverStyle,
    callback,
    btnType,
    icon,
    url,
    children,
    passthrough,
    ...rest
  } = props;

  const [ mouseOver, setMouseOver ] = useState(false);
  const myClass = btnValid(btnType) || "solid";

  const handleClick = e => {
    const validUrl = urlValid(url);

    if (rest.type === "submit") e.preventDefault();
    if (passthrough) e.stopPropagation();
    if (validUrl) window.open(validUrl, rest.target || "_blank");
    if (callback) callback();
  };

  return (
    <div>
      <button
        className={`${myClass} ${rest.className || ""}`}
        style={rest.disabled ? {} : (mouseOver ? hoverStyle : style)}
        onMouseOver={() => setMouseOver(true)}
        onMouseOut={() => setMouseOver(false)}
        onClick={e => {
          if (rest.type !== "submit") {
            handleClick(e);
          }
        }}
        {...rest}
      >
        {iconValid(icon) && <i className={icon} />}&nbsp;
        {text || (rest.type === "submit" && "Submit")}
      </button>

      {children}
    </div>
  );
};

export default Button;