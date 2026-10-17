import { Old_Standard_TT, Roboto } from "next/font/google";
import "./globals.css";

const oldStandard = Old_Standard_TT({
  variable: "--font-old-standard",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "700"],
  style: ["normal", "italic"],
});

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${oldStandard.variable} ${roboto.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
