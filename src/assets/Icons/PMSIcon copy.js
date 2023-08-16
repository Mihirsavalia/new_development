import React from "react";

const PMSIcon = (props) => {
  return (
    <div>
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="48" height="48" rx="8" fill={props.bgColor} />
        <path
          d="M9.036 30H6.622V18.661H11.926C14.391 18.661 15.734 20.327 15.734 22.316C15.734 24.288 14.374 25.937 11.926 25.937H9.036V30ZM13.269 22.299C13.269 21.364 12.555 20.735 11.603 20.735H9.036V23.863H11.603C12.555 23.863 13.269 23.251 13.269 22.299ZM29.8614 30H27.4304V21.84L24.2344 30H23.1804L19.9844 21.84V30H17.5704V18.661H20.9534L23.7074 25.733L26.4614 18.661H29.8614V30ZM31.6714 28.402L32.9974 26.566C33.7964 27.399 35.0374 28.096 36.6014 28.096C37.9274 28.096 38.5734 27.467 38.5734 26.821C38.5734 25.971 37.5874 25.682 36.2784 25.376C34.4254 24.951 32.0454 24.441 32.0454 21.908C32.0454 20.021 33.6774 18.491 36.3464 18.491C38.1484 18.491 39.6444 19.035 40.7664 20.072L39.4234 21.84C38.5054 20.99 37.2814 20.599 36.1764 20.599C35.0884 20.599 34.5104 21.075 34.5104 21.755C34.5104 22.52 35.4624 22.758 36.7714 23.064C38.6414 23.489 41.0214 24.05 41.0214 26.566C41.0214 28.64 39.5424 30.204 36.4824 30.204C34.3064 30.204 32.7424 29.473 31.6714 28.402Z"
          fill="#02B89D"
        />
      </svg>
    </div>
  );
};

export default PMSIcon;