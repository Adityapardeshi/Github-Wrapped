import "./Card.css";
import { Commits } from "./Cards/Commits";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Streak } from "./Cards/Streak";
import { useState } from "react";

export function Card({ wrappedData }) {
  const commitData = [
    {
      title: "THE NUMBERS",
      heading: String(wrappedData?.commitStats?.totalCommits ?? 0),
      desc: "Total Commits in 2026",
      data: [
        [1, String(wrappedData?.commitStats?.additions ?? 0), "Additions"],
        [2, String(wrappedData?.commitStats?.deletions ?? 0), "Deletions"],
      ],
    },
  ];

  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % 2)
  }

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + 2) % 2)
  }

  return (
    <div className="mt-38 flex flex-col items-center justify-center">

      {/* Cards container */}
      <div className="w-full max-w-xl overflow-hidden">

        {/* Sliding wrapper */}
        <div className="flex transition-transform ease-in-out duration-550" style={{transform : `translateX(-${current * 100}%)`}}>
          {/* Card 1 */}
          <div className="flex w-full shrink-0 justify-center">
            <Commits data={commitData} />
          </div>

          {/* Card 2 */}
          <div className="flex w-full shrink-0 justify-center">
            <Streak streak={wrappedData?.streak} />
          </div>

          <div></div>
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