import type { ComponentPropsWithoutRef } from "react"

export type LogoSvgProps = ComponentPropsWithoutRef<"svg"> & { size?: number }

export const LogoSvg = ({ size = 24, ...props }: LogoSvgProps) => {
  return (
    <svg width={size} height={size} viewBox="0 0 142 142" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g clipPath="url(#clip0_1_5)">
        <rect width="142" height="142" rx="26" fill="url(#paint0_linear_1_5)" />
        <g filter="url(#filter0_d_1_5)">
          <path d="M29.625 56.875L70.5 25.0833L111.375 56.875V106.833C111.375 109.242 110.418 111.553 108.715 113.256C107.011 114.96 104.701 115.917 102.292 115.917H38.7083C36.2993 115.917 33.9889 114.96 32.2854 113.256C30.582 111.553 29.625 109.242 29.625 106.833V56.875Z" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M56.875 115.917V70.5H84.125V115.917" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>
      <rect x="2.5" y="2.5" width="137" height="137" rx="23.5" stroke="url(#paint1_linear_1_5)" strokeWidth="5" />
      <defs>
        <filter id="filter0_d_1_5" x="-34" y="-34" width="209" height="209" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset />
          <feGaussianBlur stdDeviation="25" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0.631373 0 0 0 0 1 0 0 0 1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1_5" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1_5" result="shape" />
        </filter>
        <linearGradient id="paint0_linear_1_5" x1="142" y1="0" x2="0" y2="142" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0C0D0E" />
          <stop offset="1" stopColor="#222222" />
        </linearGradient>
        <linearGradient id="paint1_linear_1_5" x1="142" y1="142" x2="0" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0085D3" />
          <stop offset="0.0001" stopColor="#00A1FF" stopOpacity="0.935" />
          <stop offset="1" stopColor="#00A2FF" stopOpacity="0.5" />
        </linearGradient>
        <clipPath id="clip0_1_5">
          <rect width="142" height="142" rx="26" fill="white" />
        </clipPath>
      </defs>
    </svg>

  )
}