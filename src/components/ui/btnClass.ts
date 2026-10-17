const variants = {
  outline: "bg-white text-green border-green hover:bg-green hover:text-white",
  solid: "bg-purple text-white border-purple hover:bg-green hover:border-green",
  white: "bg-white text-green border-white hover:bg-green hover:text-white hover:border-green",
};

export type BtnVariant = keyof typeof variants;

export const btnClass = (variant: BtnVariant = "outline") =>
  `inline-flex min-h-[52px] min-w-[170px] items-center justify-center rounded-[50px] border-2 px-8 py-2 text-center font-sans text-[18px] font-normal leading-tight transition-[color,background-color,border-color,transform,box-shadow] duration-300 ease-out hover:-translate-y-[2px] hover:shadow-[0_10px_24px_-12px_rgba(44,57,63,0.45)] active:translate-y-0 ${variants[variant]}`;
