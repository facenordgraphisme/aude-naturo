// Au survol, un fond vert monte depuis le bas du bouton (pseudo-élément ::before)
const variants = {
  outline: "bg-white text-green border-green hover:text-white",
  solid: "bg-purple text-white border-purple hover:border-green",
  white: "bg-white text-green border-white hover:text-white hover:border-green",
};

export type BtnVariant = keyof typeof variants;

export const btnClass = (variant: BtnVariant = "outline") =>
  `group/btn relative isolate inline-flex min-h-[52px] min-w-[170px] items-center justify-center overflow-hidden rounded-[50px] border-2 px-8 py-2 text-center font-sans text-[18px] font-normal leading-tight transition-[color,border-color,box-shadow] duration-500 ease-out hover:shadow-[0_14px_30px_-14px_rgba(76,91,64,0.6)] before:absolute before:inset-[-2px] before:-z-10 before:translate-y-[102%] before:rounded-[50px] before:bg-green before:transition-transform before:duration-500 before:ease-[cubic-bezier(.22,1,.36,1)] hover:before:translate-y-0 focus-visible:before:translate-y-0 ${variants[variant]}`;
