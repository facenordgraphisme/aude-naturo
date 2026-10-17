import { PageTransition } from "@/components/motion/PageTransition";

// Un template (contrairement à un layout) est remonté à chaque navigation : idéal pour une transition
export default function SiteTemplate({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
