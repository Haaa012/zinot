import { useState ,useEffect} from "react";
import "../../App.css";
import {  FaFilePdf } from "react-icons/fa"; // Importez les icônes
import { FaSearch, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import AddListe from "./AddListe";
import Modifyliste from "./Modifyliste";
import GetPdf from "./GetPdf";

export default function Liste() {
  const [users, setUsers] = useState([]); 
  const [isGenerePdf , setIsgenerePdf] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selection, setSelection] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // État pour gérer l'ouverture de la modal d'ajout
  const [currentUser, setCurrentUser] = useState(null); //akana id user 
  const [searchTerm, setSearchTerm] = useState(""); // recherche


  const fetchUsers = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/afficher_employer/");  // Ton endpoint API
      console.log(response)
      const data = await response.json(); // Récupérer les données en format JSON
      setUsers(data); // Mettre à jour l'état avec les utilisateurs récupérés
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs:", error);
    }
  };

  const handledelete = async (user) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/delete_liste/${user.id}/`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id)); // Met à jour la liste des utilisateurs
        alert("Utilisateur supprimé avec succès.");
      } else {
        alert("Erreur lors de la suppression de l'utilisateur.");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur:", error);
      alert("Une erreur est survenue. Veuillez réessayer.");
    }
  };
    
  // Utiliser useEffect pour appeler fetchUsers une fois que le composant est monté
  useEffect(() => {
    fetchUsers();
  }, []);

  const openPdf =(user)=> {
    setCurrentUser(user)
    setIsgenerePdf(true)
  }
  const handleEdit = (user) => {
    setCurrentUser(user);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setCurrentUser(null);
  };

  const openAddModal = () => {
    setIsAddModalOpen(true);
    console.log(isAddModalOpen)
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
    fetchUsers()
    console.log(isAddModalOpen)
  };
  const closePdf = ()=>{
    setIsgenerePdf(false);
  }

  const handleAddUser = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]); 
    console.log('coucou')
    console.log(newUser)// Ajoute immediate le nouvel utilisateur
    console.log("efa ato")
  };

  const updateUserInList = (updatedUser) => {
    setUsers((prevList) =>
      prevList.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      )
    );
  }; // manao update direct eo inteface apres ny modification
  
  const filteredUsers = users.filter(
    (user) =>
      user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="w-screen mt-14 p-2">
        <div className="w-[100%]">
          <header className="flex justify-between items-center bg-white p-4 shadow-md rounded-lg mb-6">
            <h1 className="text-2xl pl-0 text-white font-bold w-full bg-bgortext text-center py-2 rounded-lg shadow-md transition duration-300 hover:shadow-lg hover:scale-105">
              Employés enregistrés
            </h1>
          </header>
          <div className="flex pt-0 gap-2">
            <div className="relative cursor-pointer inline-block group">
            </div>
            <div className="relative cursor-pointer inline-block group">
              <div
                className="flex w-44 hover:bg-blue-400 gap-8 items-center px-6 py-3 rounded-lg bg-blue-500 transition-all duration-300"
                onClick={openAddModal} // Ouvre la modal d'ajout
              >
                <FaPlus className="h-4 w-4 text-white transition-colors duration-300 transform" />
                <span className="text-white transition-opacity duration-300">
                  Ajouter
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
        <div>
      <div className="relative">
        <div className="flex gap-8">
          {/* Première section */}
          <p
            onClick={() => setSelection(selection === "info" ? null : "info")}
            className=" cursor-pointer font-bold text-gray-500"
          >
            Informations personnelles
          </p>
            <p
              onClick={() =>
                setSelection(selection === "donnees" ? null : "donnees")
              }
              className="font-bold cursor-pointer text-gray-500"
            >
              Autres
            </p>
          </div>

          {selection === null ? (
            <>
              <div className="p-[2px] w-60  bg-gray-400"></div>
              <div className="w-full">
              <UserTable users={filteredUsers} onEdit={handleEdit} />
              </div>
            </>
          ) : (
            <>
              <div className="p-[2px] w-24 translate-x-64 bg-gray-400"></div>
              <div className="w-full">
                 <TableData_perso  users={filteredUsers} onEdit={handleEdit} openPdf={openPdf} ondelete={handledelete}/>
              </div>
            </>
          )}
        </div>

        {/* Deuxième section */}
      </div>


      </div>
      {isEditModalOpen && (
        <Modifyliste selectedUser={currentUser} onUpdateUser={updateUserInList} onClose={closeEditModal} />
      )}
      {isAddModalOpen && (
        <AddListe addUserToList={handleAddUser} onClose={closeAddModal} /> // Modal d'ajout
      )}
      {isGenerePdf && (
        <GetPdf selectedUser={currentUser} onClose={closePdf}/>
      )}
    </>
  );
}

const SearchInput = ({ searchTerm, setSearchTerm }) => {
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex w-96 items-center justify-end border border-gray-300 rounded-lg p-2 bg-white shadow-md">
      <FaSearch className="text-gray-500" />
      <input
        type="text"
        placeholder="Rechercher par nom ou email..."
        value={searchTerm}
        onChange={handleChange}
        className="ml-2 outline-none flex-1"
      />
    </div>
  );
};

const UserTable = ({ users }) => {
  return (
    <div className="overflow-x-auto py-8">
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
        <thead>
          <tr className="bg-gray-100 border-b">
            {/* <th className="py-3 px-4 text-left text-gray-600">ID</th> */}
            <th className="py-3 px-4 text-left text-gray-600">Nom et prénom</th>
            <th className="py-3 px-4 text-left text-gray-600">
              Date et lieu de naissance
            </th>
            <th className="py-3 px-4 text-left text-gray-600">Genre</th>
            <th className="py-3 px-4 text-left text-gray-600">Age</th>
            <th className="py-3 px-4 text-left text-gray-600">Adresse</th>
            <th className="py-3 px-4 text-left text-gray-600">Email</th>
            <th className="py-3 px-4 text-left text-gray-600">Téléphone</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user , index) => (
            <tr key={user.id || index} className="hover:bg-gray-50 border-b">
              <td className="py-3 px-4 text-gray-800">{user.nom + " "+ user.prenom}</td> 
              <td className="py-3 px-4 text-gray-800">{user.date_naissance}</td>
              <td className="py-3 px-4 text-gray-800">{user.genre}</td>
              <td className="py-3 px-4 text-gray-800">{user.age}</td>
              <td className="py-3 px-4 text-gray-800">{user.adresse}</td>
              <td className="py-3 px-4 text-gray-800">{user.email}</td>
              <td className="py-3 px-4 text-gray-800">{user.telephone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const TableData_perso = ({ users, onEdit , ondelete , openPdf }) => {
  return (
    <div className="overflow-x-auto py-8">
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
        <thead>
          <tr className="bg-gray-100 border-b">
            {/* <th className="py-3 px-4 text-left text-gray-600">ID</th> */}
            <th className="py-3 px-4 text-left text-gray-600">Nom et prénom</th>
            <th className="py-3 px-4 text-left text-gray-600">N° CNaPS</th>
            <th className="py-3 px-4 text-left text-gray-600">
                N° Compte bancaire
            </th>
            <th className="py-3 px-4 text-left text-gray-600">Commune</th>
            <th className="py-3 px-4 text-left text-gray-600">Nom de la banque</th>
            <th className="py-3 px-4 text-left text-gray-600">
              Clé
            </th>
            <th className="py-3 px-4 text-left text-gray-600">Code postale</th>
            <th className="py-3 px-4 text-left text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user , index) => (
            <tr key={user.id || index} className="hover:bg-gray-50 border-b">
              <td className="py-3 px-4 text-gray-800">{user.nom + " "+ user.prenom}</td>
              <td className="py-3 px-4 text-gray-800">{user.cnaps}</td>
              <td className="py-3 px-4 text-gray-800">{user.num_bancaire}</td>
              <td className="py-3 px-4 text-gray-800">{user.commune}</td>
              <td className="py-3 px-4 text-gray-800">{user.nom_banque}</td>
              <td className="py-3 px-4 text-gray-800">{user.cle}</td>
              <td className="py-3 px-4 text-gray-800">{user.code_postal}</td>
              <td className="py-3 px-4 text-gray-800 flex gap-2">
                <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => onEdit(user)}
                >
                  <FaEdit size={20} />
                </button>
                <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={()=>openPdf(user)}
                >
                  <FaFilePdf size={20} />
                </button>

                <button className="text-red-500 hover:text-red-700">
                  <FaTrash size={20} onClick={()=>ondelete(user)} />
                </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};




// Nouveau composant pour la modal d'ajout d'utilisateur



