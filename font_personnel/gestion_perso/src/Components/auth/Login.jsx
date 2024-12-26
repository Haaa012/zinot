import { FaFacebook } from "react-icons/fa"; // Font Awesome Facebook icon
import { FaGoogle } from "react-icons/fa"; // Font Awesome Google icon
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useState ,useEffect} from "react";
import { FaUnlock } from "react-icons/fa";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Loader/Loader";
import { toast } from "react-toastify";

function Login({ onLogin }) {
  const [inputvalue, setInputvalue] = useState("");
  const [valuepass, setValuepass] = useState("");
  const navigate = useNavigate()
  const [showpass, setShowpass] = useState(false);
  const [borderemail, setBorderemail] = useState({})
  const [errorEmail, setErrorEmail] = useState("");
  const [isloading, setIsloading] = useState(false)
  const handlevaluepass = (e) => {
    setValuepass(e.target.value);
  };
  const handleinputchange = (e) => {
    setInputvalue(e.target.value);
    //event + value dans l'input
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!e.target.value)
    {
      setErrorEmail("");
      setBorderemail({
        border : "2px solid grey"
      })
    } else if (!emailRegex.test(e.target.value)) {
      setErrorEmail("Email invalid");
      setBorderemail({
        border : "2px solid red"
      })

    } 
    else 
    {
      setErrorEmail("");
      setBorderemail({
        border : "2px solid green"
      })

    }
  };

  const handleshowpass = () => {
    setShowpass(!showpass);
  };



  const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
};


 // Charger le cookie CSRF lors du chargement de la page
 useEffect(() => {
  const getCSRFToken = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/seconnecter/', {
        withCredentials: true,  // Indispensable pour gérer les cookies CSRF
      });
      console.log("CSRF Token:", response.headers['x-csrftoken']);
    } catch (error) {
      console.error("Erreur lors de la récupération du cookie CSRF", error);
    }
  };
  getCSRFToken();
}, []);


const handleSubmit = async (event) => {
  event.preventDefault();
  setIsloading(true);
  
  const informations = {
      Email: inputvalue,
      Password: valuepass,
  };

  // Afficher les informations envoyées dans la console pour vérification
  console.log("Informations envoyées:", informations);
  console.log("CSRF Token:", getCookie('csrftoken'));

  try {
      const response = await axios.post(
          "http://localhost:8000/api/seconnecter/",
          informations,
          {
              headers: {
                  'X-CSRFToken': getCookie('csrftoken'),
              },
              withCredentials: true,  // Assurez-vous que les cookies sont envoyés
          }
      );

      if (response.status === 200) {
          console.log("Reussi");
          onLogin(response.data.token);
          navigate("/");
          setIsloading(false);
      }
  } 
  catch (error) {
      console.error("Échec", error.response ? error.response.data : error);
      setIsloading(false);
      if(error.response.status === 400){
        toast.error(error.response.data.message);
      }
  }
};

return (
    <>
    {isloading ? (
      <Loader /> ) : (
        
<div className="relative flex w-full h-screen bg-slate-900 justify-center flex-col items-center overflow-hidden">
  {/* Boules en arrière-plan */}
  {Array.from({ length: 30 }).map((_, i) => (
    <div
      key={i}
      className={`absolute w-1 h-1 bg-white rounded-full opacity-0 animate-float`}
      style={{
        bottom: `-${Math.random() * 100}px`,
        left: `${Math.random() * 100}%`,
        animationDuration: `${(Math.random() * 5 + 5).toFixed(1)}s`,
        animationDelay: `${(Math.random() * 1).toFixed(1)}s`,
      }}
    ></div>
  ))}

  {/* Formulaire de connexion */}
  <div className="flex flex-col gap-10 shadow-xl w-96 h-max bg-white/10 backdrop-filter-xl px-8 py-10 relative z-10">
    <div>
      <h1 className="text-left text-3xl font-semibold text-white">Se connecter</h1>
      <p className="text-gray-400 text-sm">
        N'avez-vous pas encore un compte?{" "}
        <Link to={'/Register'} className="font-semibold cursor-pointer text-primary underline">
          S'inscrire
        </Link>
      </p>
    </div>
    <div className="flex flex-col gap-3">
      <form method="POST" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3">
          <div className="flex relative gap-1 flex-col">
            <label htmlFor="email" className="pl-1 text-sm text-gray-400 font-semibold">
              Adresse email *
            </label>
            <input
              type="text"
              style={borderemail}
              value={inputvalue}
              onChange={handleinputchange}
              className={`border-2 ${errorEmail == "" ? 'border-primary/30' : 'border-third'} text-sm outline-none border-primary/50 shadow-xl cursor-pointer pl-2 pr-8 py-2.5`}
              id="email"
              placeholder="you@example.com"
            />
            <FaEnvelope
              size={18}
              color={inputvalue ? "black" : "gray"}
              className="text-gray-500 opacity-70 absolute right-3 top-9"
            />
            {errorEmail && <p className="text-red-500">{errorEmail}</p>}
          </div>
          <div className="flex gap-1 relative flex-col">
            <label htmlFor="password" className="pl-1 text-sm font-semibold text-gray-400">
              Mot de passe *
            </label>
            <input
              type={!showpass ? "password" : "text"}
              onChange={handlevaluepass}
              className="border-2 text-sm outline-none border-primary/50 shadow-xl cursor-pointer pl-2 pr-8 py-2.5"
              id="password"
              placeholder="Votre mot de passe"
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
                color={valuepass ? "black" : "gray"}
                size={18}
                onClick={handleshowpass}
                className="text-gray-500 opacity-70 absolute right-3 top-9"
              />
            )}
          </div>
          <div className="flex flow-row gap-1 items-center">
            <input type="checkbox" className="" />
            <p className="text-sm pb-1 text-gray-200">Remember me</p>
          </div>
          <div>
            <button type="submit" className="bg-primary w-full py-2.5 text-white font-semibold hover:bg-orange-400 transition-all">
              Envoyer
            </button>
          </div>
        </div>
      </form>
      <div className="flex items-center gap-1 justify-center">
        <p className="h-1 w-[28%] bg-gradient-to-r from-slate-200 to-primary rounded-2xl"></p>
        <p className="text-gray-400 text-[10px]">Merci de votre confiance</p>
        <p className="h-1 w-[28%] bg-gradient-to-l from-slate-200 to-primary rounded-2xl"></p>
      </div>
    </div>
  </div>
</div>
      )}
    </>
  );
}

export default Login;
