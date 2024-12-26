import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <svg
        viewBox="0 0 206 206"
        className="w-14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 203C155.228 203 200 158.228 200 103C200 47.7715 155.228 3 100 3C44.7715 3 0 47.7715 0 103C0 158.228 44.7715 203 100 203Z"
          fill="url(#paint0_linear_0_1)"
        />
        <path
          d="M50 123C61.0457 123 70 114.046 70 103C70 91.9543 61.0457 83 50 83C38.9543 83 30 91.9543 30 103C30 114.046 38.9543 123 50 123Z"
          fill="#ECF0F1"
        />
        <path
          d="M150 123C161.046 123 170 114.046 170 103C170 91.9543 161.046 83 150 83C138.954 83 130 91.9543 130 103C130 114.046 138.954 123 150 123Z"
          fill="#ECF0F1"
        />
        <path
          d="M50 23C83.3333 9.66667 116.667 9.66667 150 23"
          stroke="#ECF0F1"
          stroke-width="5"
        />
        <path
          d="M50 183C83.3333 196.333 116.667 196.333 150 183"
          stroke="#ECF0F1"
          stroke-width="5"
        />
        <path d="M30 53L60 83L0 103L30 53Z" fill="#2980B9" />
        <path d="M170 53L140 83L200 103L170 53Z" fill="#2980B9" />
        <path
          opacity="0.1"
          d="M100 193C149.706 193 190 152.706 190 103C190 53.2944 149.706 13 100 13C50.2944 13 10 53.2944 10 103C10 152.706 50.2944 193 100 193Z"
          fill="black"
        />
        <defs>
          <linearGradient
            id="paint0_linear_0_1"
            x1="0"
            y1="3"
            x2="20000"
            y2="20003"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#3498DB" />
            <stop offset="1" stop-color="#2980B9" />
          </linearGradient>
        </defs>
      </svg>
      <h2 className="font-mono text-lg sm:text-xl">Budbak Robots</h2>
    </div>
  );
};

export default Logo;
