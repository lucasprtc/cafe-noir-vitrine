// components/Menu.tsx
import InfiniteSLider, { Comment } from "../InfiniteSlider";
import TextReveal from "../TextReveal";

const comments: Comment[] = [
  {
    description: "Loving the concept, the coffee, the people there, the location. It’s a must visit",
    name: "Olivier Béaslas",
    color: "#044799",
  },
  {
    description: "Absolutely the best quality-price ratio in town! It opened just two weeks ago and I’m proud to say today was my 10th visit — that says it all. Highly recommended.",
    name: "Miika Lindqvist",
    color: "#AAD0F0",
  },
  {
    description: "Unbeatable value for money! Excellent service, atmosphere and location 🤝🏻 …",
    name: "Arttu Viipola",
    color: "#ED6956",
  },
  {
    description: "My new favourite place in Helsinki 🤩 the quality of the coffee is one of a kind …",
    name: "Liz Pa",
    color: "#AAD0F0",
  },
];

export default function Reviews() {
  return (
    <section className="py-9 md:py-[50px]">
      <TextReveal delay={0.2} yOffset={50} className="grid-layout grid-gap container-grid pb-9 lg:pb-18">
        <h3 className="col-span-6 col-start-2 md:col-span-12 text-right text-lg md:text-2xl font-secondary text-dark-blue">A sip of quality. A taste of community</h3>
      </TextReveal>
      <InfiniteSLider comments={comments} />
    </section>
  );
}
