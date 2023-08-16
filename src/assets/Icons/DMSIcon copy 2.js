import React from "react";

const DMSIcon = (props) => {
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
          d="M10.593 30.0002H6.122V18.6612H10.593C14.146 18.6612 16.611 20.9222 16.611 24.3392C16.611 27.7562 14.146 30.0002 10.593 30.0002ZM8.536 20.7862V27.8752H10.593C12.837 27.8752 14.146 26.2602 14.146 24.3392C14.146 22.3332 12.922 20.7862 10.593 20.7862H8.536ZM30.9551 30.0002H28.5241V21.8402L25.3281 30.0002H24.2741L21.0781 21.8402V30.0002H18.6641V18.6612H22.0471L24.8011 25.7332L27.5551 18.6612H30.9551V30.0002ZM32.7651 28.4022L34.0911 26.5662C34.8901 27.3992 36.1311 28.0962 37.6951 28.0962C39.0211 28.0962 39.6671 27.4672 39.6671 26.8212C39.6671 25.9712 38.6811 25.6822 37.3721 25.3762C35.5191 24.9512 33.1391 24.4412 33.1391 21.9082C33.1391 20.0212 34.7711 18.4912 37.4401 18.4912C39.2421 18.4912 40.7381 19.0352 41.8601 20.0722L40.5171 21.8402C39.5991 20.9902 38.3751 20.5992 37.2701 20.5992C36.1821 20.5992 35.6041 21.0752 35.6041 21.7552C35.6041 22.5202 36.5561 22.7582 37.8651 23.0642C39.7351 23.4892 42.1151 24.0502 42.1151 26.5662C42.1151 28.6402 40.6361 30.2042 37.5761 30.2042C35.4001 30.2042 33.8361 29.4732 32.7651 28.4022Z"
          fill="#02B89D"
        />
      </svg>
    </div>
  );
};

export default DMSIcon;
