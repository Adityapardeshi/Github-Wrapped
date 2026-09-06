import "./Card.css";
import { Commits } from "./Cards/Commits";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Streak } from "./Cards/Streak";
import { useState } from "react";

export function Card() {
  const data = [
    {
      title: "THE NUMBERS",
      heading: "2,450",
      desc: "Total Commits in 2026",
      data: [
        {
          1: "143k",
          2: "Additions",
        },
        {
          1: "84k",
          2: "Deletions",
        },
      ],
    },
  ];

  const [current, Setcurrent] = useState(0);

  const nextSlide = () => {
    Setcurrent((prev) => (prev + 1)%2)
  }

  const prevSlide = () =>{
    Setcurrent((prev) => (prev - 1 + 2)%2)
  }

  return (
    <div className="mt-28 flex flex-col items-center justify-center">

      {/* Cards container */}
      <div className="w-full max-w-xl overflow-hidden">

        {/* Sliding wrapper */}
        <div className="flex transition-transform ease-in-out duration-550" style={{transform : `translateX(-${current * 100}%)`}}>
          {/* Card 1 */}
          <div className="flex w-full shrink-0 justify-center">
            <Commits data={data} />
          </div>

          {/* Card 2 */}
          <div className="flex w-full shrink-0 justify-center">
            <Streak />
          </div>
        </div>

      </div>

      {/* Navigation */}
      <div className="mt-5 flex items-center justify-center gap-4">

        {/* Previous */}
        <button
          onClick = {prevSlide}
          className="mx-14 rounded-full border border-white/80 bg-white/20 px-4 py-2 text-sm font-medium text-(--neutral) backdrop-blur-sm transition hover:bg-white/30"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>

        {/* Next */}
        <button
          onClick = {nextSlide}
          className="mx-14 rounded-full bg-(--primary) px-5 py-2 text-sm font-medium text-white shadow-lg transition hover:bg-pink-300 hover:text-pink-500"
        >
          Next
        </button>

      </div>
    </div>
  );
}