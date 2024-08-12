import React, { useState } from 'react';
import Flashcard from './Flashcard';
import './Flashcard.css';

function FlashcardList({ flashcards }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!flashcards || flashcards.length === 0) {
    return (
      <h2 className='font-bold text-3xl text-white m-2 text-center'>No Flashcard available</h2>
    );
  }

  const nextFlashcard = () => {
    setCurrentIndex((currentIndex + 1) % flashcards.length);
  };

  const prevFlashcard = () => {
    setCurrentIndex((currentIndex - 1 + flashcards.length) % flashcards.length);
  };

  return (
    <div className="relative mx-auto text-center perspective-1000 max-w-[520px] my-5">
      <Flashcard flashcard={flashcards[currentIndex]} />
      <button className="mx-5 px-7 py-2 text-white bg-blue-800 rounded-md shadow-md cursor-pointer transition-colors duration-300 hover:bg-blue-700" onClick={prevFlashcard}>Previous</button>
      <button className="mx-5 px-7 py-2 text-white bg-blue-800 rounded-md shadow-md cursor-pointer transition-colors duration-300 hover:bg-blue-700" onClick={nextFlashcard}>Next</button>
    </div>
  );
}

export default FlashcardList;
