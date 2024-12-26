import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import { toast } from "react-toastify";
import 'jspdf-autotable'; 

const GetPdf = ({ selectedUser, onClose }) => {
  const [userData, setUserData] = useState({
    formData: {},
    parcours: {},
    famille: {},
    sante: {},
    formation : {},
  });

  const [error, setError] = useState(null);

  // Fonction générique pour récupérer les données
  const fetchData = async (url, key) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Erreur de récupération des données');
      const data = await response.json();
      setUserData(prevData => ({ ...prevData, [key]: data }));
    } catch (error) {
      setError(error.message);
    }
  };

  // Récupérer les données au changement de `selectedUser`
  useEffect(() => {
    if (selectedUser) {
      setUserData(prevData => ({
        ...prevData,
        formData: { ...prevData.formData, ...selectedUser }
      }));
      fetchData(`http://localhost:8000/api/recupere_parcours/${selectedUser.id}/`, 'parcours');
      fetchData(`http://localhost:8000/api/recupere_famille/${selectedUser.id}/`, 'famille');
      fetchData(`http://localhost:8000/api/recupere_sante/${selectedUser.id}/`, 'sante');
      fetchData(`http://localhost:8000/api/recupere_formation/${selectedUser.id}/`, 'formation');
    }
  }, [selectedUser]);

  // Générer le PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(9);

    const { formData, parcours, famille, sante , formation } = userData;

    // Fonction pour ajouter des tables au PDF
    const addTable = (header, body, startY) => {
      doc.autoTable({
        startY,
        head: [header],
        body,
        headStyles: {
          font: 'helvetica',
          fontStyle: 'bold', // Met en gras les titres des colonnes
        }
      });
    };

    // Informations personnelles
    doc.setFont('helvetica', 'bold');
    doc.text("ONG Tsinjoaina", 170, 5);

    doc.setFont('helvetica', 'bold');
    doc.text("Information personnelle", 20, 10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Nom: ${formData.nom}`, 20, 15);
    doc.text(`Prénom: ${formData.prenom}`, 20, 20);
    doc.text(`Âge: ${formData.age}`, 20, 25);
    doc.text(`Genre: ${formData.genre === 'M' ? 'Masculin' : 'Féminin'}`, 20, 30);
    doc.text(`Adresse: ${formData.adresse}`, 20, 35);
    doc.text(`Date et Lieu de Naissance: ${formData.date_naissance}`, 20, 40);
    doc.text(`Téléphone: ${formData.telephone}`, 20, 45);
    doc.text(`Email: ${formData.email}`, 20, 50);
    doc.text(`Numéro CNAPS: ${formData.cnaps}`, 20, 55);
    doc.text(`Commune: ${formData.commune}`, 20, 60);
    doc.text(`Numéro de Compte Bancaire: ${formData.num_bancaire}`, 20, 65);
    doc.text(`Nom de la Banque: ${formData.nom_banque}`, 20, 70);
    doc.text(`Clé: ${formData.cle}`, 20, 75);
    doc.text(`Code Postal: ${formData.code_postal}`, 20, 80);

    // Informations sur la famille
    doc.setFont('helvetica', 'bold');
    doc.text("Information à propos de la famille", 20, 85);
    doc.setFont('helvetica', 'normal');
    addTable(
      ['Nom Conjoint(e)', 'Profession', 'Téléphone', 'Date et lieu de naissance'],
      [
        [famille.nom_conjoint, famille.profession_conjoint, famille.telephone_conjoint, famille.naissance_conjoint]
      ],
      88
    );
    doc.setFont('helvetica', 'bold');
    doc.text("Information à propos de l'enfant", 20, 110);
    doc.setFont('helvetica', 'normal');
    addTable(
      ['Nom complet', 'Date et lieu de naissance', 'A la charge', 'Date de décès'],
      [
        [famille.nom_enfant, famille.naissance_enfant, famille.acharge_enfant, famille.dece_enfant]
      ],
      112
    );

    // Informations sur le parcours
    doc.setFont('helvetica', 'bold');
    doc.text("Information du parcours", 20, 150);
    doc.setFont('helvetica', 'normal');
    addTable(
      ['Poste Antérieur', 'Période Début', 'Période Fin', 'Adresse employeur'],
      [
        [parcours.poste_anterieur, parcours.periode_debut, parcours.periode_fin, parcours.adresse_employeur]
      ],
      152
    );

    doc.setFont('helvetica', 'bold');
    doc.text("Information du formation", 20, 170);
    doc.setFont('helvetica', 'normal');
    addTable(
      ['Formation et diplôme', 'Année d\'obtention'],
      [
        [formation.formation_effectuer, formation.annee_obtention ]
      ],
      175
    );


    doc.setFont('helvetica', 'bold');
    doc.text("Information du contrat", 20, 210);
    doc.setFont('helvetica', 'normal');
    addTable(
      ['Poste', 'Type', 'Début', 'Fin'],
      [
        [parcours.poste_contrat, parcours.type_contrat, parcours.debut_contrat, parcours.fin_contrat]
      ],
      215
    );
    addTable(
      ['Qualification', 'Horaire hebdomadaire', 'Salaire brut', 'Salaire net'],
      [
        [parcours.qualification, parcours.horaire_hebdo, parcours.salaire_brut, parcours.salaire_net]
      ],
      230
    );

    // Informations sur la santé
    doc.setFont('helvetica', 'bold');
    doc.text("Information à propos de la santé", 20, 250);
    doc.setFont('helvetica', 'normal');
    addTable(
      ['État de santé', 'Contact d\'urgence'],
      [
        [sante.etat_sante, sante.tel_urgence]
      ],
      255
    );

    // Télécharger le PDF
    doc.save(`${formData.nom} ${formData.prenom}.pdf`);
    onClose();
  };

  // Afficher l'erreur si elle existe

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-lg relative">
        <h2 className="text-lg font-bold mb-6 text-center">Générer le PDF</h2>
        <button
          onClick={generatePDF}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Générer le PDF
        </button>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default GetPdf;
