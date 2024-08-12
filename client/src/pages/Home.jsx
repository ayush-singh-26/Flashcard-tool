import React, { useEffect, useState } from 'react';
import FlashcardList from '../components/FlashcardList';
import axios from 'axios';

function Home() {
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/flashcards')
      .then(response => {
        setFlashcards(response.data);
      })
      .catch(error => console.error('Error fetching flashcards:', error));
  }, []);

  if (!flashcards) {
    return <div>Loading...</div>;
  }

  return (
    <div >
      <h1 className='text-3xl text-white text-center'>Flashcard Learning Tool</h1>
      <FlashcardList flashcards={flashcards} />
    </div>
  );
}

export default Home;
