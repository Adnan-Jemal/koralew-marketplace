import { HeroHighlight } from "../ui/hero-highlight";
import { TypewriterEffect } from "../ui/typewriter-effect";
import { categoryDisplayNames } from "@/lib/categories";
import { Button } from "../ui/button";
import Link from "next/link";
import { auth } from "@/auth";

const RotatingWords = categoryDisplayNames.map((n) => {
  return { text: n };
});

export async function HeroSection() {
  const session = await auth();
  return (
    <HeroHighlight>
      <h1 className="text-3xl px-4 py-8 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto ">
        <span className="flex items-center gap-3 flex-col">
          {" "}
          Your Local Marketplace for{"  "}
          <TypewriterEffect words={RotatingWords} />
        </span>
      </h1>
      <h2 className="text-xl px-4 pb-8 md:text-2xl text-center ">
        Connect, buy, and sell with ease on Koralew, <br /> Your one-stop
        Ethiopian marketplace for buying and selling anything.
      </h2>
      <div className=" w-full flex pb-10 items-center justify-center ">
        <Button size={"lg"} variant={"brand"} className="text-xl py-3 ">
          {session?.user ? (
            <Link href="/sign-in">Explore</Link>
          ) : (
            <Link href="/signin">Get Started</Link>
          )}
        </Button>
      </div>
    </HeroHighlight>
  );
}
