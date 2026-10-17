import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Btn } from "@/components/ui/Btn";
import { Container, Section } from "@/components/ui/Section";
import type { PricingSection as Props } from "@/sanity/lib/types";

export function PricingSection({ section }: { section: Props }) {
  return (
    <Section background={section.background} className="py-12 md:py-[73px]">
      <Container className="xl:max-w-[1083px]">
        <Stagger className="grid gap-[22px] md:grid-cols-3" stagger={0.15}>
          {section.plans?.map((plan) => {
            const hl = plan.highlighted;
            const numeric = /\d/.test(plan.price ?? "");
            return (
              <StaggerItem key={plan._key} preset={hl ? "scale" : "up"} className="h-full">
              <article
                className={`flex h-full flex-col rounded-[16px] px-8 pt-[23px] pb-[31px] transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_24px_48px_-24px_rgba(87,47,124,0.45)] ${hl ? "bg-purple text-white" : "border border-[#e3ded8] text-black"}`}
              >
                <div className="flex min-h-[40px] justify-center">
                  {plan.badge && (
                    <span className="flex h-[27px] w-[171px] items-center justify-center rounded-[4px] bg-[#faf7f0] text-[14px] uppercase text-[#a0905f]">
                      {plan.badge}
                    </span>
                  )}
                </div>
                <div className={`text-center font-normal ${numeric ? "" : "-mt-3"}`}>
                  <p className={`text-[24px] leading-[1.8] ${hl ? "text-white" : "text-purple"}`}>{plan.name}</p>
                  {numeric ? (
                    <p className="text-[36px] font-light leading-[1.2]">{plan.price}</p>
                  ) : (
                    <p className={`text-[24px] leading-[1.8] ${hl ? "text-white" : "text-purple"}`}>{plan.price}</p>
                  )}
                </div>
                <ul className="mt-7 mb-8">
                  {plan.features?.map((f, i) => (
                    <li key={i} className={`border-t py-[13px] text-[18px] font-light last:border-b ${hl ? "border-white/30" : "border-[#e3ded8]"}`}>
                      {f}
                    </li>
                  ))}
                </ul>
                {plan.button && (
                  <div className="mt-auto flex justify-center">
                    <Btn button={plan.button} className="min-h-[53px] min-w-[212px]" />
                  </div>
                )}
              </article>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </Section>
  );
}
