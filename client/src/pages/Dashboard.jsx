import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
    const [flashcards, setFlashcards] = useState([]);
    const [newCard, setNewCard] = useState({ question: '', answer: '' });
    const [editCard, setEditCard] = useState(null);
    const [error, setError] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false); // Track form submission

    useEffect(() => {
        axios.get('http://localhost:5000/api/flashcards')
            .then(response => setFlashcards(response.data))
            .catch(error => setError('Failed to load flashcards. Please try again later.'));
    }, []);

    const validateAddForm = () => {
        return newCard.question.trim() !== '' && newCard.answer.trim() !== '';
    };

    const validateUpdateForm = () => {
        return editCard.question.trim() !== '' && editCard.answer.trim() !== '';
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true); // Mark form as submitted
        if (editCard) {
            if (validateUpdateForm()) {
                updateFlashcard();
            }
        } else {
            if (validateAddForm()) {
                addFlashcard();
            }
        }
    };

    const addFlashcard = () => {
        axios.post('http://localhost:5000/api/flashcards', newCard)
            .then(response => {
                setFlashcards([...flashcards, response.data]);
                setNewCard({ question: '', answer: '' });
                setIsSubmitted(false); // Reset form submission status
            })
            .catch(error => setError('Failed to add flashcard. Please try again later.'));
    };

    const deleteFlashcard = (id) => {
        axios.delete(`http://localhost:5000/api/flashcards/${id}`)
            .then(() => {
                setFlashcards(flashcards.filter(card => card.id !== id));
            })
            .catch(error => setError('Failed to delete flashcard. Please try again later.'));
    };

    const updateFlashcard = () => {
        if (editCard) {
            axios.put(`http://localhost:5000/api/flashcards/${editCard.id}`, editCard)
                .then(response => {
                    setFlashcards(flashcards.map(card => (card.id === editCard.id ? response.data : card)));
                    setEditCard(null);
                    setIsSubmitted(false); // Reset form submission status
                })
                .catch(error => setError('Failed to update flashcard. Please try again later.'));
        }
    };

    return (
        <div className="p-6 max-w-2xl mx-auto bg-black bg-opacity-70 text-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>

            {error && <div className="text-red-500 mb-4">{error}</div>}
            
            <form onSubmit={handleSubmit} className="flex flex-col mb-6 space-y-4">
                {!editCard && (
                    <>
                        <input
                            type="text"
                            placeholder="Enter Question"
                            className={`mb-2 p-2 text-base text-black placeholder:text-gray-600 rounded border ${isSubmitted && !newCard.question ? 'border-red-500' : 'border-gray-300'} outline-none transition-colors duration-300 focus:border-black`}
                            value={newCard.question}
                            onChange={e => setNewCard({ ...newCard, question: e.target.value })}
                        />
                        {isSubmitted && !newCard.question && <p className="text-red-500 text-sm">Question is required</p>}

                        <input
                            type="text"
                            placeholder="Enter Answer"
                            className={`mb-2 p-2 text-base text-black placeholder:text-gray-600 rounded border ${isSubmitted && !newCard.answer ? 'border-red-500' : 'border-gray-300'} outline-none transition-colors duration-300 focus:border-black`}
                            value={newCard.answer}
                            onChange={e => setNewCard({ ...newCard, answer: e.target.value })}
                        />
                        {isSubmitted && !newCard.answer && <p className="text-red-500 text-sm">Answer is required</p>}
                    </>
                )}

                {editCard && (
                    <>
                        <input
                            type="text"
                            placeholder="Update Question"
                            className={`mb-2 p-2 text-base text-black placeholder:text-gray-600 rounded border ${isSubmitted && !editCard.question ? 'border-red-500' : 'border-gray-300'} outline-none transition-colors duration-300 focus:border-black`}
                            value={editCard.question}
                            onChange={e => setEditCard({ ...editCard, question: e.target.value })}
                        />
                        {isSubmitted && !editCard.question && <p className="text-red-500 text-sm">Question is required</p>}

                        <input
                            type="text"
                            placeholder="Update Answer"
                            className={`mb-2 p-2 text-base text-black placeholder:text-gray-600 rounded border ${isSubmitted && !editCard.answer ? 'border-red-500' : 'border-gray-300'} outline-none transition-colors duration-300 focus:border-black`}
                            value={editCard.answer}
                            onChange={e => setEditCard({ ...editCard, answer: e.target.value })}
                        />
                        {isSubmitted && !editCard.answer && <p className="text-red-500 text-sm">Answer is required</p>}
                    </>
                )}

                <button
                    type="submit"
                    className="py-2 px-4 text-white bg-green-600 rounded shadow-md hover:bg-green-700 hover:scale-105 transition-transform duration-300"
                >
                    {editCard ? 'Update Flashcard' : 'Add Flashcard'}
                </button>
            </form>

            <ul className="list-none p-0">
                {flashcards.map(card => (
                    <li key={card.id} className="flex justify-between items-center p-2 border-b border-gray-300 mb-1">
                        <span>{card.question} - {card.answer}</span>
                        <div className="flex gap-2">
                            <button
                                className="py-1 px-2 text-white bg-red-600 rounded shadow-md hover:bg-red-700 transition-colors duration-300"
                                onClick={() => deleteFlashcard(card.id)}
                            >
                                Delete
                            </button>
                            <button
                                className="py-1 px-2 text-white bg-blue-600 rounded shadow-md hover:bg-blue-700 transition-colors duration-300"
                                onClick={() => setEditCard(card)}
                            >
                                Edit
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Dashboard;
