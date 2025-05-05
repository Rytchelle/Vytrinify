// src/components/StarRating.js

import React from 'react';
import { FaStar } from 'react-icons/fa';
import '../styles/StarRating.css';

function StarRating({ rating, onRatingChange }) {
  // Criação das estrelas clicáveis
  const handleStarClick = (index) => {
    if (onRatingChange) {
      onRatingChange(index + 1); // Passa a avaliação de 1 a 5
    }
  };

  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => (
        <FaStar
          key={index}
          color={index < rating ? '#ffc107' : '#e4e5e9'}
          size={18}
          onClick={() => handleStarClick(index)} // Chama a função ao clicar na estrela
        />
      ))}
    </div>
  );
}

export default StarRating;
