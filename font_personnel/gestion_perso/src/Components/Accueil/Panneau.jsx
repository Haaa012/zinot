import React, { useState, useEffect } from 'react';

const Panneau = () => {
  // URLs des images pour la démonstration
  const images = [
    '/images/tsinjo.png',
    '/images/motivation.jpeg',
    '/images/ong2.jpg'
  ];

  // État pour suivre l'index de l'image actuelle
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Utilisation de useEffect pour changer l'image toutes les 3 secondes
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // 3000 ms = 3 secondes


    return () => clearInterval(intervalId); // Nettoyage de l'intervalle pour éviter les fuites de mémoire
  }, []);

  return (
    <div style={{ overflow: 'hidden', width: '100%', height: '300px',objectFit:'cover', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)', marginTop: '4px' }}>
      <div
        style={{
          display: 'flex',
          transition: 'transform 0.5s ease-in-out',
          transform: `translateX(-${currentImageIndex * 100}%)`,
          width: `${images.length * 100}%`
        }}
      >
        {images.map((image, index) => (
          <div key={index} style={{ width: '100%', flexShrink: 0 }}>
            <img
              src={image}
              alt={`slide-${index}`}
              style={{
                width: '40%',
                height: '3n00px',
                objectFit: 'cover', // Assure que l'image couvre bien le conteneur sans déformation
                borderRadius: '10px'
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Panneau;
