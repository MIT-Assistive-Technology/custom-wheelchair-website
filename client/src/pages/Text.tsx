import React from "react";
import { Button } from "@/components/ui/button";

const navigationLinks = [
  { label: "Designs", href: "#designs" },
  { label: "Learn more", href: "#learn-more" },
  { label: "Support", href: "#support" },
];

export const Text = (): JSX.Element => {
  return (
    <header className="inline-flex items-center justify-center gap-8 relative w-full min-w-[585px] min-h-8">
      <div className="inline-flex items-center gap-2 relative flex-[0_0_auto]">
        <div className="relative w-8 h-8 rounded-lg [background:url(../figmaAssets/image.png)_50%_50%_/_cover]" />

        <div className="relative flex items-center justify-center w-fit [font-family:'Inter',Helvetica] font-normal text-black text-xl text-center tracking-[-0.40px] leading-[29px] whitespace-nowrap">
          MIT Assistive Technology
        </div>
      </div>

      <nav className="inline-flex items-start gap-8 relative flex-[0_0_auto]">
        {navigationLinks.map((link) => (
          <Button
            key={link.label}
            variant="ghost"
            className="relative flex items-center justify-center w-fit mt-[-1.00px] [font-family:'Inter',Helvetica] font-medium text-[#0000008c] text-base tracking-[-0.08px] leading-[23.2px] whitespace-nowrap h-auto p-0 hover:bg-transparent hover:text-black"
            asChild
          >
            <a href={link.href}>{link.label}</a>
          </Button>
        ))}
      </nav>
    </header>
  );
};
