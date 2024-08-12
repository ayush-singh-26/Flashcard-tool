import React, { useState } from 'react';
import './Flashcard.css';

function Flashcard({ flashcard }) {
    const [flipped, setFlipped] = useState(false);

    const handleClick = () => {
        setFlipped(!flipped);
    };

    return (
        <div className="flashcard-frame">
            <div className={`flashcard ${flipped ? 'flipped' : ''}`} onClick={handleClick}>
                <div className="flashcard-inner">
                    <div className="flashcard-front">
                        <h2 className='text-2xl font-semibold'>{flashcard.question}</h2>
                    </div>
                    <div className="flashcard-back">
                        <p className='font-semibold text-xl p-3'>{flashcard.answer}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Flashcard;
