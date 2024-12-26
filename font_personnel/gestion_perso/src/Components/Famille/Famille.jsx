import { useState ,useEffect} from "react";
import "../../App.css";
import { FaSearch, FaPlus } from "react-icons/fa";
import Modifyfamille from "./Modifyfamille";

export default function Famille() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selection, setSelection] = useState(null);
  const [users, setUsers] = useState([]);
  const [famille, setFamille] = useState([])
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

  const fetchFamille = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/afficher_famille/");
      const data = await response.json();
      setFamille(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des données de famille:", error);
    }
  };
//ref mclique option sante vao recharge ilay useEffect d mande ny fetch
  useEffect(() => {
    fetchUsers();
    fetchFamille();
  }, []);


  const handleEdit = (user) => {
    setCurrentUser(user);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setCurrentUser(null);
  };  

  const handleAddUser = (updatedUser) => {
    setUsers((prevUsers) => {
      // Vérifier si l'utilisateur existe déjà
      const existingUser = prevUsers.find((user) => user.id === updatedUser.id);
  
      if (existingUser) {
        // Si l'utilisateur existe, mettre à jour ses données
        return prevUsers.map((user) =>
          user.id === updatedUser.id ? { ...user, ...updatedUser } : user
        );
      } else {
        // Sinon, ajouter le nouvel utilisateur
        return [...prevUsers, updatedUser];
      }
    });
  
    setFamille((prevFamille) => {
      // Vérifier si l'information de famille existe déjà
      const existingFamille = prevFamille.find((p) => p.declarant === updatedUser.id);
  
      if (existingFamille) {
        // Si les informations de famille existent, les mettre à jour
        return prevFamille.map((p) =>
          p.declarant === updatedUser.id
            ? {
                ...p,
                nom_conjoint: updatedUser.nom_conjoint,
                naissance_conjoint: updatedUser.naissance_conjoint,
                age_conjoint: updatedUser.age_conjoint,
                genre_conjoint: updatedUser.genre_conjoint,
                profession_conjoint: updatedUser.profession_conjoint,
                telephone_conjoint: updatedUser.telephone_conjoint,
                nom_enfant: updatedUser.nom_enfant,
                naissance_enfant: updatedUser.naissance_enfant,
                acharge_enfant: updatedUser.acharge_enfant,
                genre_enfant: updatedUser.genre_enfant,
                dece_enfant: updatedUser.dece_enfant,
              }
            : p
        );
      } else {
        // Sinon, ajouter les nouvelles informations de famille
        return [
          ...prevFamille,
          {
            declarant: updatedUser.id,
            nom_conjoint: updatedUser.nom_conjoint,
            naissance_conjoint: updatedUser.naissance_conjoint,
            age_conjoint: updatedUser.age_conjoint,
            genre_conjoint: updatedUser.genre_conjoint,
            profession_conjoint: updatedUser.profession_conjoint,
            telephone_conjoint: updatedUser.telephone_conjoint,
            nom_enfant: updatedUser.nom_enfant,
            naissance_enfant: updatedUser.naissance_enfant,
            acharge_enfant: updatedUser.acharge_enfant,
            genre_enfant: updatedUser.genre_enfant,
            dece_enfant: updatedUser.dece_enfant,
          },
        ];
      }
    });
  
    closeEditModal();
  };
    const filteredUsers = users.filter(
    (user) =>
      user.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="w-screen mt-14 p-2">
        <div className="w-[100%]">
          <header className="flex justify-between items-center bg-white p-4 shadow-md rounded-lg mb-6">
            <h1 className="text-2xl pl-0 text-white font-bold w-full bg-bgortext text-center py-2 rounded-lg shadow-md transition duration-300 hover:shadow-lg hover:scale-105">
              Situation familiale
            </h1>
          </header>
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
            Situation de la conjoint(e)
          </p>
            <p
              onClick={() =>
                setSelection(selection === "donnees" ? null : "donnees")
              }
              className="font-bold cursor-pointer text-gray-500"
            >
              Enfant(s)
            </p>
          </div>

          {selection === null ? (
            <>
              <div className="p-[2px] w-60  bg-gray-400"></div>
              <div className="w-full">
              <Table_Conjoint users={filteredUsers} famille={famille} onEdit={handleEdit} />
              </div>
            </>
          ) : (
            <>
              <div className="p-[2px] w-24 translate-x-64 bg-gray-400"></div>
              <div className="w-full">
                 <TableData_perso  users={filteredUsers} famille={famille} onEdit={handleEdit}/>
              </div>
            </>
          )}
        </div>

        {/* Deuxième section */}
      </div>


      </div>
      {isEditModalOpen && (
        <Modifyfamille selectedUser={currentUser}  famille_employer={famille} onUpdateUser={handleAddUser} onClose={closeEditModal} />
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

const Table_Conjoint = ({ users, onEdit , famille }) => {
  return (
    <div className="overflow-x-auto py-8">
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
        <thead>
          <tr className="bg-gray-100 border-b">
            {/* <th className="py-3 px-4 text-left text-gray-600">ID</th> */}
            <th className="py-3 px-4 text-left text-gray-600">Nom et prénom</th>
            <th className="py-3 px-4 text-left text-gray-600">Nom complet du conjoint(e)</th>
            <th className="py-3 px-4 text-left text-gray-600">
              Date et lieu de naissance
            </th>
            <th className="py-3 px-4 text-left text-gray-600">Age</th>
            <th className="py-3 px-4 text-left text-gray-600">Genre</th>
            <th className="py-3 px-4 text-left text-gray-600">
             Profession
            </th>
            <th className="py-3 px-4 text-left text-gray-600">Téléphone</th>
          </tr>
        </thead>
        <tbody>
  {users.map((user) => {
    const userFamille = famille.find((etat) => etat.declarant === user.id);
    return (
      <tr key={user.id} className="hover:bg-gray-50 border-b">
        <td className="py-3 px-4 text-gray-800">{user.nom} {user.prenom}</td>
        <td className="py-3 px-4 text-gray-800">
          {userFamille && userFamille.nom_conjoint ? userFamille.nom_conjoint : "-- -- --"}
        </td>
        <td className="py-3 px-4 text-gray-800">
          {userFamille && userFamille.naissance_conjoint ? userFamille.naissance_conjoint : "-- -- --"}
        </td>
        <td className="py-3 px-4 text-gray-800">
          {userFamille && userFamille.age_conjoint ? userFamille.age_conjoint : "-- -- --"}
        </td>
        <td className="py-3 px-4 text-gray-800">
          {userFamille && userFamille.genre_conjoint ? userFamille.genre_conjoint : "-- -- --"}
        </td>
        <td className="py-3 px-4 text-gray-800">
          {userFamille && userFamille.profession_conjoint ? userFamille.profession_conjoint : "-- -- --"}
        </td>
        <td className="py-3 px-4 text-gray-800">
          {userFamille && userFamille.telephone_conjoint ? userFamille.telephone_conjoint : "-- -- --"}
        </td>
      </tr>
    );
  })}
</tbody>
      </table>
    </div>
  );
};

const TableData_perso = ({ users, famille,  onEdit }) => {
  return (
    <div className="overflow-x-auto py-8">
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
        <thead>
          <tr className="bg-gray-100 border-b">
            {/* <th className="py-3 px-4 text-left text-gray-600">ID</th> */}
            <th className="py-3 px-4 text-left text-gray-600">Nom et prénom</th>
            <th className="py-3 px-4 text-left text-gray-600">Nom des Enfants</th>
            <th className="py-3 px-4 text-left text-gray-600">
                A charge
            </th>
            <th className="py-3 px-4 text-left text-gray-600">              
                Date et lieu de naissance
            </th>
            <th className="py-3 px-4 text-left text-gray-600">Genre</th>
            <th className="py-3 px-4 text-left text-gray-600">Date de décés</th>
            <th className="py-3 px-4 text-left text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
        {users.map((user) => {
  const userFamille = famille.find((etat) => etat.declarant === user.id);
  return (
    <tr key={user.id} className="hover:bg-gray-50 border-b">
      <td className="py-3 px-4 text-gray-800">{user.nom} {user.prenom}</td>
      <td className="py-3 px-4 text-gray-800">
        {userFamille && userFamille.nom_enfant ? userFamille.nom_enfant : "-- -- --"}
      </td>
      <td className="py-3 px-4 text-gray-800">
        {userFamille && userFamille.acharge_enfant ? userFamille.acharge_enfant : "-- -- --"}
      </td>
      <td className="py-3 px-4 text-gray-800">
        {userFamille && userFamille.naissance_enfant ? userFamille.naissance_enfant : "-- -- --"}
      </td>
      <td className="py-3 px-4 text-gray-800">
        {userFamille && userFamille.genre_enfant ? userFamille.genre_enfant : "-- -- --"}
      </td>
      <td className="py-3 px-4 text-gray-800">
        {userFamille && userFamille.dece_enfant ? userFamille.dece_enfant : "-- -- --"}
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


// Nouveau composant pour la modal d'ajout d'utilisateur