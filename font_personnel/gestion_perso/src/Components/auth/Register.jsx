import { useState } from "react";
import { FaEnvelope, FaLock , FaUser } from "react-icons/fa";
import { FaUnlock } from "react-icons/fa";
import axios from "axios";
import '../../App.css'
import Loader from "../Loader/Loader";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
function Register() {
  const [showpass, setShowpass] = useState(false);
  const [showcpass, setShowcpass] = useState(false);
  const [inputvalue, setInputvalue] = useState("");
  const [valuepass, setValuepass] = useState("");
  const [erroremail, setErroremail] = useState("");
  const [errorpass, setErrorpass] = useState("");
  const [errorcpass, setErrorcpass] = useState("");
  const [confvalue, setConfvalue] = useState("");
  const [bordererror, setBordererror] = useState({});
  const [borderpass, setBorderpass] = useState({});
  const [bordercpass, setBordercpass] = useState({});
  const [valuenom , setValuenom] = useState("")
  const [bordernom , setBordernom] = useState({})
  const [errornom , setErrornom] = useState("")
  const [isMonted, setIsMonted] = useState(false);

  const handlevaluenom = (e) => {
    setValuenom(e.target.value)
    if(!e.target.value){
      setErrornom("")
      setBordernom({
        border : "2px solid grey"
      })

    }
    else if(e.target.value.length  < 3 ){
      setErrornom("3 caractère au minimum")
      setBordernom({
        border : "2px solid red"
      })
    }

    else{
      setErrornom("")
      setBordernom({
        border : "2px solid green"
      })

    }
  }

  const handleinputchange = (e) => {
    setInputvalue(e.target.value); //event + value dans l'input
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!e.target.value) {
      setErroremail("");
      setBordererror({
        border: "1px solid grey",
      });
    } else if (!emailRegex.test(e.target.value)) {
      setErroremail("Email invalide");
      setBordererror({
        border: "3px solid red",
      });
    } else {
      setErroremail("");
      setBordererror({
        border: "3px solid green",
      });
    }
  };

  const handlepass = (e) => {
    setValuepass(e.target.value);
    if (!e.target.value) {
      setErrorpass("");
      setBorderpass({
        border: "1px solid grey",
      });
    } else if (valuepass.length < 6) {
      setErrorpass("Mot de passe trop court");
      setBorderpass({
        border: "3px solid red",
      });
    } else {
      setErrorpass("");
      setBorderpass({
        border: "3px solid green",
      });
    }
  };
  const handleconfpass = (e) => {
    setConfvalue(e.target.value);
    if (!e.target.value) {
      setErrorcpass("");
      setBordercpass({
        border: "1px solid grey",
      });
    } else if (valuepass !== e.target.value) {
      setErrorcpass("Mot de passe invalid");
      setBordercpass({
        border: "2px solid red",
      });
    } else {
      setErrorcpass("");
      setBordercpass({
        border: "2px solid green",
      });
    }
  };

  const handleshowpass = () => {
    setShowpass(!showpass);
    console.log("nirina", showpass);
  };

  const handleshowcpass = () => {
    setShowcpass(!showcpass);
    console.log("faly", showcpass);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Appelle cette fonction en premier

    // Vérifie si tous les champs sont vides
    if (
      inputvalue === "" &&
      valuepass === "" &&
      confvalue === "" &&
      valuenom === ""
    ) {
      setBordercpass({ border: "2px solid red" });
      setBordernom({ border: "2px solid red" })
      setErroremail("Veuillez remplir ce champ");
      setErrorpass("Veuillez remplir ce champ");
      setErrornom("Veuillez remplir ce champ");
      setErrorcpass("Veuillez remplir ce champ");
      setBorderpass({ border: "2px solid red" });
      setBordererror({ border: "2px solid red" });
      return; // Arrête l'exécution si les champs sont vides
    }

    // Vérifie si les erreurs sont toutes vides avant de soumettre
    if (
      erroremail === "" &&
      errorpass === "" &&
      errorcpass === "" &&
      errornom === ""
    ) {
      const informations = {
        Nom  : valuenom,
        Email: inputvalue,
        Password: valuepass,
      };
      console.log(informations.Nom)

      try {
        setIsMonted(true);
        const response = await axios.post(
          "http://localhost:8000/api/enregistrer/",
          informations
        );
        console.log(response.data);
        toast.success(response.data.message);
        setInputvalue("");
        setConfvalue("");
        setValuepass("");
      } catch (error) {
        console.error(error.response.data); // Utilise error.response pour obtenir les détails de l'erreur
        toast.error(error.response.data.message);
      } finally {
        setIsMonted(false);
      }
    }
  };
  return (
    <>
{isMonted ? (
  <Loader />
) : (
<div className="relative flex w-full h-screen bg-slate-900 justify-center flex-col items-center overflow-hidden">
  {/* Arc-en-ciel centré */}
  <div className="absolute inset-0 bg-rainbow opacity-50 z-0"></div>
    {/* Boules en arrière-plan */}
    {Array.from({ length: 30 }).map((_, i) => (
      <div
        key={i}
        className={`absolute w-1 h-1 bg-white rounded-full opacity-0 animate-float`}
        style={{
          bottom: `-${Math.random() * 100}px`,
          left: `${Math.random() * 100}%`,
          animationDuration: `${(Math.random() * 5 + 5).toFixed(1)}s`,
          animationDelay: `${(Math.random() * 3).toFixed(1)}s`,
        }}
      ></div>
    ))}

    {/* Conteneur du formulaire */}
    <div className="flex flex-col  shadow-xl w-96 h-max bg-white/10 backdrop-filter-lg px-8 py-4 relative z-10">
      <div className="pb-4">
        <h1 className="text-left text-3xl font-semibold text-white">
          S'inscrire
        </h1>
        <p className="text-gray-400 text-sm">
          Avez-vous déjà un compte?{" "}
          <Link
            to={"/Login"}
            className="font-semibold cursor-pointer text-primary underline"
          >
            Se connecter
          </Link>
        </p>
      </div>
      <form method="POST" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <div className="flex relative gap-1 flex-col">
            <label
              htmlFor="nom"
              className="pl-1 text-sm text-gray-400 font-semibold"
            >
              Nom *
            </label>
            <input
              type="text"
              value={valuenom}
              style={bordernom}
              onChange={handlevaluenom}
              className="border-1 text-sm outline-none border-primary/50 shadow-xl cursor-pointer pl-2 pr-8 py-2.5"
              id="nom"
              placeholder="you@name"
            />
            <FaUser
              color={valuenom ? "black" : "gray"}
              size={18}
              className="text-gray-500 hover:text-black opacity-70 absolute right-3 top-9"
            />
            {errornom && <p className="text-third text-sm">{errornom}</p>}
          </div>

          <div className="flex relative gap-1 flex-col">
            <label
              htmlFor="email"
              className="pl-1 text-sm text-gray-400 font-semibold"
            >
              Adresse email *
            </label>
            <input
              type="text"
              value={inputvalue}
              style={bordererror}
              onChange={handleinputchange}
              className="border-1 text-sm outline-none border-primary/50 shadow-xl cursor-pointer pl-2 pr-8 py-2.5"
              id="email"
              placeholder="you@example.com"
            />
            <FaEnvelope
              color={inputvalue ? "black" : "gray"}
              size={18}
              className="text-gray-500 hover:text-black opacity-70 absolute right-3 top-9"
            />
            {erroremail && <p className="text-third text-sm">{erroremail}</p>}
          </div>

          <div className="flex gap-1 relative flex-col">
            <label
              htmlFor="password"
              className="pl-1 text-sm font-semibold text-gray-400"
            >
              Mot de passe *
            </label>
            <input
              value={valuepass}
              type={!showpass ? "password" : "text"}
              onChange={handlepass}
              style={borderpass}
              className="border-2 text-sm outline-none border-primary/50 shadow-xl cursor-pointer pl-2 pr-8 py-2.5"
              id="password"
              placeholder="@votremotdepasse"
            />
            {!showpass ? (
              <FaLock
                color={valuepass ? "black" : "gray"}
                onClick={handleshowpass}
                size={18}
                className="text-gray-500 opacity-70 absolute right-3 top-9"
              />
            ) : (
              <FaUnlock
                size={18}
                color={valuepass ? "black" : "gray"}
                onClick={handleshowpass}
                className="text-gray-500 opacity-70 absolute right-3 top-9"
              />
            )}
            {errorpass && <p className="text-third text-sm">{errorpass}</p>}
          </div>

          <div className="flex gap-1 relative flex-col">
            <label
              htmlFor="confirmPassword"
              className="pl-1 text-sm font-semibold text-gray-400"
            >
              Confirmer mot de passe *
            </label>
            <input
              value={confvalue}
              style={bordercpass}
              onChange={handleconfpass}
              type={!showcpass ? "password" : "text"}
              className="border-2 text-sm outline-none border-primary/50 shadow-xl cursor-pointer pl-2 pr-8 py-2.5"
              id="confirmPassword"
              placeholder="@votremotdepasse"
            />
            {!showcpass ? (
              <FaLock
                color={confvalue ? "black" : "gray"}
                onClick={handleshowcpass}
                size={18}
                className="text-gray-500 opacity-70 absolute right-3 top-9"
              />
            ) : (
              <FaUnlock
                color={confvalue ? "black" : "gray"}
                size={18}
                onClick={handleshowcpass}
                className="text-gray-500 opacity-70 absolute right-3 top-9"
              />
            )}
            {errorcpass && <p className="text-third">{errorcpass}</p>}
          </div>

          <div>
            <button
              type="submit"
              className="bg-primary w-full py-2.5 text-white font-semibold hover:bg-orange-400 transition-all"
            >
              Envoyer
            </button>
          </div>

          <div className="flex items-center gap-1 justify-center">
            <p className="h-1 w-[40%] bg-gradient-to-r from-slate-200 to-primary rounded-2xl"></p>
            <p className="text-gray-400 underline">Bienvenue</p>
            <p className="h-1 w-[40%] bg-gradient-to-l from-slate-200 to-primary rounded-2xl"></p>
          </div>
        </div>
      </form>
    </div>
  </div>
)}
    </>
  );
}

export default Register;
