import React, { useState } from "react";

export const MyVow = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const sentences = [
    "Sandy, my lover, partner, best friend, and now my wife. From the moment I met you, nakaingon na gyud ko, mao na ni.",
    "I thank God because He answered my prayer—I prayed for a partner who would accept me completely, despite all my imperfections, and here you are, accepting me for who I am.",
    "Thank you for loving me unconditionally, laaab.",
    "There are times when we feel exhausted, but I am grateful to the Lord for giving us the strength to face the battles in our relationship.",
    "I promise to make you happy, to make you laugh even on our hardest days, to bring you joy, fun, and to love you even more throughout our journey.",
    "I promise to be a good husband, to be responsible, and to be a good leader and head of our future family.",
    "I promise to be more patient in times nga magkalalis ta ug dili ta magkasabot.",
    "I promise never to leave you, especially when you're sick—I will take care of you, prioritize you, protect you, and fight for you.",
    "Salamat kaayo sa Ginoo, because without Him, none of this would be possible.",
    "We have even built our house together, and now we're finally getting married.",
    "Grabe kaayo si Lord muhatag ug blessing basta perfect time na gyud niya. T_T",
    "We once only dreamed and planned for this, always saying sana all, and now, little by little, God's plan for us is unfolding.",
    "Grabe pagka-buotan gyud ni Lord sa atoa, bisag dili ta perfect. T_T (Thank you, Jesus).",
    "Today, I stand before you, not just to make a promise, but to dedicate my whole life to you.",
    "Whether in joy or sorrow, I will remain by your side.",
    "I will love you faithfully and walk beside you in every journey.",
    "Thank you for being my greatest support.",
    "Panindigan tika, I will love you even more—you are the last woman I will ever love.",
    "I love you today and for all the days of my life.",
  ];

  const handleClick = () => {
    setCurrentIndex((prev) => (prev < sentences.length - 1 ? prev + 1 : 0));
  };

  return (
    <div
      className="flex items-center justify-center h-screen bg-gradient-to-b from-[#9B7E52] via-[#8B6B3E] to-[#7A5C2F] p-6"
      onClick={handleClick}
    >
      <div className="bg-white bg-opacity-70 p-6 rounded-lg shadow-lg max-w-2xl text-center">
        <h1 className="text-5xl font-semibold mb-4">My Vow</h1>
        <p className="text-xl italic">
          {sentences.map((sentence, index) => (
            <span
              key={index}
              className={index === currentIndex ? "bg-yellow-200" : ""}
            >
              {sentence}{" "}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default MyVow;
