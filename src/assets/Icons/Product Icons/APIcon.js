import React from "react";

const ApIcon = (props) => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="8" fill={props.bgColor} />
      <path
        d="M24.0394 32H21.4099L20.2266 29.5832L15.546 20.1814L10.8391 29.5832H15.5197L16.7556 27.1132L17.9389 29.5301V29.5832L16.7556 32H7L8.18329 29.5832L15.4934 15.0025L22.8035 29.5832L24.0394 32ZM41 20.8454C41 21.5625 40.8685 22.3061 40.5793 22.9701C40.3163 23.6075 39.9219 24.1652 39.4223 24.6433C38.949 25.0948 38.3967 25.4666 37.7657 25.7056C37.1083 25.9446 36.4246 26.0774 35.7409 26.0774H31.4547V23.9262H35.5568C35.9776 23.9262 36.372 23.8465 36.7401 23.6872C37.1083 23.5544 37.4238 23.3419 37.6605 23.0498C37.9497 22.7576 38.1601 22.4123 38.2916 22.0405C38.4493 21.6156 38.5282 21.1907 38.5282 20.7392C38.5282 20.2611 38.4756 19.8096 38.3441 19.3316C38.2127 18.9066 38.0286 18.5348 37.7919 18.163C37.5553 17.8177 37.2397 17.5521 36.8716 17.3662C36.4772 17.1803 36.0302 17.0741 35.5831 17.1006H28.9304V31.9203H26.3534V15.0025H35.8198C36.6349 14.9759 37.4501 15.1619 38.2127 15.5071C38.8438 15.8258 39.4223 16.3039 39.8693 16.8616C40.29 17.4193 40.6056 18.0833 40.7896 18.7738L41 20.8454Z"
        fill="#02B89D"
      />
    </svg>
  );
};

export default ApIcon;