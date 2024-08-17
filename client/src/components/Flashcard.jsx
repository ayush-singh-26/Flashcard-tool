import React, { useState } from 'react';
// import './Flashcard.css';

function Flashcard({ flashcard }) {
    const [flipped, setFlipped] = useState(false);

    const handleClick = () => {
        setFlipped(!flipped);
    };

    return (
        <div className="relative w-[420px] mx-auto my-5 text-center" style={{ perspective: '1000px' }}>
            <div
                className={`relative w-full h-[300px] transition-transform duration-700 ease-in-out cursor-pointer`}
                onClick={handleClick}
                style={{
                    transformStyle: 'preserve-3d',
                    transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
            >
                <div
                    className="absolute w-full h-full"
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    <div
                        className="absolute w-full h-full bg-gradient-to-br from-[#8800ff] to-[#00fbff] rounded-lg flex justify-center items-center text-white"
                        style={{ backfaceVisibility: 'hidden' }}
                    >
                        <h2 className="text-2xl font-semibold">{flashcard.question}</h2>
                    </div>
                    <div
                        className="absolute w-full h-full bg-gradient-to-br from-[rgb(255,65,65)] to-blue-500 rounded-lg flex justify-center items-center text-white"
                        style={{
                            backfaceVisibility: 'hidden',
                            transform: 'rotateY(180deg)',
                        }}
                    >
                        <p className="font-semibold text-xl p-3">{flashcard.answer}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Flashcard;
