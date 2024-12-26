import React, { useState, useEffect } from "react";
import "../../App.css";
import { FaSearch, FaPlus } from "react-icons/fa";
import AjouterForm from "./AjouterForm";

export default function Formation() {
  const [users, setUsers] = useState([]);
  const [formation, setFormation] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/afficher_employer/");
      const data = await response.json();
      console.log(data)
      setUsers(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs:", error);
    }
  };

  const fetchFormation = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/afficher_formation/");
      const data = await response.json();
      setFormation(data);
      console.log(data)
    } catch (error) {
      console.error("Erreur lors de la récupération des données de formation:", error);
    }
  };
//ref mclique option sante vao recharge ilay useEffect d mande ny fetch
  useEffect(() => {
    fetchUsers();
    fetchFormation();
  }, []);

  const handleEdit = (user) => {
    setCurrentUser(user);
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleAddUser = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === updatedUser.id ? { ...user, ...updatedUser } : user
      )
    );

    setFormation((prevFormation) => {
      const existingFormation = prevFormation.find((s) => s.declarant === updatedUser.id);
      if (existingFormation) {
        return prevFormation.map((s) =>
          s.declarant === updatedUser.id
            ? { ...s, formation_effectuer: updatedUser.formation_effectuer, annee_obtention: updatedUser.annee_obtention }
            : s
        );
      } else {
        return [
          ...prevFormation,
          { declarant: updatedUser.id, formation_effectuer: updatedUser.formation_effectuer, annee_obtention: updatedUser.annee_obtention }
        ];
      }
    });
    closeAddModal();
  };

  const filteredUsers = users.filter((user) =>
    user.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="w-screen mt-14 px-2">
        <div className="w-[100%]">
          <header className="flex justify-between items-center bg-white p-4 shadow-md rounded-lg mb-6">
            <h1 className="text-2xl pl-0 text-white font-bold w-full bg-bgortext text-center py-2 rounded-lg shadow-md transition duration-300 hover:shadow-lg hover:scale-105">
              Formation
            </h1>
          </header>
        </div>
        <div className="flex justify-end">
          <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
        <div>
          <div className="relative">
            <div className="flex flex-col gap-4">
              <div>
                <p className="cursor-pointer font-bold text-gray-500">Information de formation</p>
                <div className="p-[2px] w-56 bg-gray-400"></div>
              </div>
              <Table_Medicale users={filteredUsers} formation={formation} onEdit={handleEdit} />
            </div>
          </div>
        </div>
      </div>
      {isAddModalOpen && (
      <AjouterForm
      onUpdateUser={handleAddUser}
      selectedUser={currentUser}
      formation={formation}     
      onClose={closeAddModal}
      />
      )}
    </>
  );
}

const SearchInput = ({ searchTerm, setSearchTerm }) => {
  const handleChange = (e) => setSearchTerm(e.target.value);

  return (
    <div className="flex w-96 items-center justify-end border border-gray-300 rounded-lg p-2 bg-white shadow-md">
      <FaSearch className="text-gray-500" />
      <input
        type="text"
        placeholder="Rechercher par nom..."
        value={searchTerm}
        onChange={handleChange}
        className="ml-2 outline-none flex-1"
      />
    </div>
  );
};

const Table_Medicale = ({ users, formation, onEdit }) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full bg-white border border-gray-300 rounded-lg shadow-lg">
        <thead>
          <tr className="bg-gray-100 border-b">
          <th className="py-3 px-4 text-left text-gray-600">Nom et prénom</th>
            <th className="py-3 px-4 text-left text-gray-600">Formation et diplôme</th>
            <th className="py-3 px-4 text-left text-gray-600">Année d'obtention</th>
            <th className="py-3 px-4 text-left text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
  {users.map((user) => {
    const userFormation = formation.find((etat) => etat.declarant === user.id);
    return (
      <tr key={user.id} className="hover:bg-gray-50 border-b">
        <td className="py-3 px-4 text-gray-800">{user.nom} {user.prenom}</td>
        <td className="py-3 px-4 text-gray-800">
          {userFormation && userFormation.formation_effectuer ? userFormation.formation_effectuer : "-- -- --"}
        </td>
        <td className="py-3 px-4 text-gray-800">
          {userFormation && userFormation.annee_obtention ? userFormation.annee_obtention : "-- -- --"}
        </td>
        <td className="py-3 px-4 text-gray-800 flex gap-2">
          <button onClick={() => onEdit(user)} className="text-blue-500 hover:text-blue-700">
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-red-600 text-white">
              <FaPlus size={20} />
            </div>
          </button>
        </td>
      </tr>
    );
  })}
</tbody>
      </table>
    </div>
  );
};
