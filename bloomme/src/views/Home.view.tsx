import { useEffect, useState } from 'react';
import { Menu } from '../components/Menu.component';
import { Assistant } from '../components/Assistant.component';
import rabitt from '../assets/rabbit.png';
// import day from '../assets/phrases.svg';
import quiz from '../assets/quiz.svg';
import '../styles/Home.style.css';
import { Link } from 'react-router-dom';
import { useRewardConnection } from '../services/Reward.service';
import { useQuizConnection } from '../services/Quiz.service';
const quotesImages = import.meta.glob('../assets/BloommeQuotes/*.png', { eager: true });

export const Home = () => {
  const [category, setCategory] = useState<{name: string, quiz_id: number}[]>([]);
  const {quizApi} = useQuizConnection();
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [background, setBackground] = useState([]);
  const [randomImage, setRandomImage] = useState("");
  const {rewardApi} = useRewardConnection();
  // Establece una imagen por defecto y recupera la selección guardada en localStorage
  const [selectedColor, setSelectedColor] = useState({
    color: 'background',
    backgroundColor: localStorage.getItem('background') || 'pink)', // Ruta de la imagen por defecto
  });
  const handleImageSelect = (imageUrl) => {
    const selectedBackground = {
      color: 'background',
      backgroundColor: `url(${imageUrl})`,
    };
    setSelectedColor(selectedBackground);
    localStorage.setItem('background  ', `${imageUrl}`); // Guarda la selección en localStorage
  };

  useEffect(() => {
    const handleQuiz = async() =>{
      const response = await quizApi();
      console.log("🚀 ~ handleQuiz ~ response:", response);
      setCategory(response);
    };
    handleQuiz();
  },[])
  // useEffect(() => {
  //   const handleReward = async() =>{
  //     const response = await rewardApiBackground();
  //     console.log("🚀 ~ handleReward ~ response:", response);
  //     setBackground(response);
  //   };
  //   handleReward();
  // },[]);
  useEffect(() => {
    const handleBackground = async() => {
      try {
        const response = await rewardApi("background");
        console.log("🚀 ~ handleBackground ~ response:", response.rewards[0].image)
        setBackground(response.rewards);
      } catch (error) {
        console.log("🚀 ~ handleBackground ~ error:", error)
      }
    }
    handleBackground();

  },[]);
  useEffect(()=>{
    const name = localStorage.getItem('username');
    const avatar = localStorage.getItem('avatar');
    // const background = localStorage.getItem('background');
    setName(name || '');
    setAvatar(avatar || '');
    // setBackground(background || '');
  }, []);
  useEffect(() => {
    document.body.style.backgroundImage = "";
    document.body.style.backgroundColor = "white"; // color de fondo por defecto
  }, []);
  useEffect(() => {
    // Obtener todas las rutas de las imágenes
    const imagePaths = Object.values(quotesImages).map((module) => module.default);
    // Seleccionar una imagen aleatoria
    const randomIndex = Math.floor(Math.random() * imagePaths.length);
    setRandomImage(imagePaths[randomIndex]);
  }, []); // Esto se ejecutará solo una vez al cargar la página
  return (
    <>
      <div className='container-home'>
        <div className="container-home-menu">
          <Menu/>
        </div>
        <div className="container-home-sections">
          <div className="container-home-welcome">
            <div className="container-home-sections-welcome">
              <p className='home-text'>Welcome, {name}! Ready to start learning and growing?</p>
            </div>
            <div className="container-home-subsections">
              <div className="home-sections-profile">
                <div className="home-avatar-card" style={{ backgroundColor: selectedColor?.backgroundColor }}>
                  <img src={avatar} alt="Avatar" className="home-avatar"/>
                  <p className="home-name">{name}</p>
                </div>
                <div className="background-selector">
                  <p>Background</p>
                  <div className="home-colors">
                    {background.map((bg, index) => (
                      <span
                        key={index}
                        onClick={() => handleImageSelect(bg.image)}
                        style={{
                          backgroundImage: `url(${bg.image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                        className={`home-color ${selectedColor.backgroundColor === `url(${bg.image})` ? 'selected' : ''}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="home-sections-module">
                <p className="home-title">Continue in the module where you left off</p>
                <div className="home-modules">
                  <div className="home-module">
                    <div className="home-circle">
                      <img src={quiz} alt="Know yourself"/>
                    </div>
                    <Link to='/paths'><button className="home-continue-button">Continue</button></Link>
                  </div>
                </div>
              </div>
              <div className="home-sections-day">
                <p>Phrase of the day</p>
                <div className='home-sections-day-back'>
                  {/* Mostrar la imagen aleatoria seleccionada */}
                  {randomImage && <img src={randomImage} alt="phrase of the day" className='home-phrases' />}
                </div>
              </div>
            </div>
          </div>
          <div className='container-home-quiz'>
            <div className="container-home-sections-quiz">
              <p className='home-quiz'> Recommended quizzes</p>
            </div>
            <div className="home-quiz-cards">
              {category.slice(0, 3).map((item)=>(
                <div key={item.name} className="home-quiz-card">
                  <img src={quiz} alt="quiz background" />
                  <p className="home-quiz-title">{item.name}</p>
                  <button className={`home-quiz-button`}>
                    <Link to={`/quizQuestion/${item.name}/${item.quiz_id}`} className="quiz-link"> Start Quiz </Link>
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="container-home-sections-assistent">
            <Assistant text='¿En que puedo ayudarte?' rabbitUrl={rabitt}/>
          </div>
        </div>
      </div>
    </>
  );
};










/*
import { useEffect } from 'react';
import { Menu } from '../components/Menu.component';
import { Assistant } from '../components/Assistant.component';
import avatar from '../assets/avatar.svg';
import rabitt from '../assets/rabbit.png';
import day from '../assets/phrases.svg';
import quiz from '../assets/quiz.svg';
import '../styles/Home.style.css';
import { Link } from 'react-router-dom';

export const Home = () => {
  useEffect(() => {
    document.body.style.backgroundImage = "";
    document.body.style.backgroundColor = "white"; // color de fondo por defecto
  }, []);
  return (
    <>
      <div className='container-home'>
        <div className="container-home-menu">
          <Menu title="Ana Maria" avatarUrl={avatar} />
        </div>
        <div className="container-home-sections">
          <div className="container-home-welcome">
            <div className="container-home-sections-welcome">
              <p className='home-text'>Welcome, Gabriela! Ready to start learning and growing?</p>
            </div>
            <div className="container-home-subsections">
              <div className="home-sections-profile">
                <div className="home-avatar-card">
                  <img src={avatar} alt="Avatar" className="home-avatar"/>
                  <p className="home-name">Ana María</p>
                </div>
                <div className="background-selector">
                  <p>Background</p>
                  <div className="home-colors">
                    <span className="home-color white"></span>
                    <span className="home-color yellow home-selected"></span>
                    <span className="home-color blue"></span>
                    <span className="home-color purple"></span>
                    <span className="home-color green"></span>
                  </div>
                </div>
              </div>
              <div className="home-sections-module">
                <p className="home-title">Continue in the module where you left off</p>
                <div className="home-modules">
                  <div className="home-module">
                    <div className="home-circle homeOne">
                      <img src={quiz} alt="Know yourself"/>
                    </div>
                    <p className="home-module-name"> Taking Care of My Body</p>
                  </div>
                  <div className="home-arrow">&gt;</div>
                  <div className="home-module">
                    <div className="home-circle">
                      <img src={quiz} alt="Know yourself"/>
                    </div>
                    <p className="home-module-name">Knowing My Boundaries</p>
                    <Link to='/paths'><button className="home-continue-button">Continue</button></Link>
                  </div>
                </div>
              </div>
              <div className="home-sections-day">
                <p>Phrase of the day</p>
                <div className='home-sections-day-back'>
                  <img src={day} alt="phrases of day" className='home-phrases'/>
                </div>
              </div>
            </div>
          </div>
          <div className='container-home-quiz'>
            <div className="container-home-sections-quiz">
              <p className='home-quiz'> Recommended quizzes</p>
            </div>
            <div className="home-quiz-cards">
              <div className="home-quiz-card">
                <img src={quiz} alt="Quiz Image"/>
                <p className="home-quiz-title">Know yourself</p>
                <button className="home-quiz-button">Start Quiz</button>
              </div>
              <div className="home-quiz-card">
                <img src={quiz} alt="Quiz Image"/>
                <p className="home-quiz-title">Mitos</p>
                <button className="home-quiz-button">Start Quiz</button>
              </div>
              <div className="home-quiz-card">
                <img src={quiz} alt="Quiz Image"/>
                <p className="home-quiz-title">Diversidad e Identidad</p>
                <button className="home-quiz-button">Start Quiz</button>
              </div>
            </div>
          </div>
          <div className="container-home-sections-assistent">
            <Assistant text='¿En que puedo ayudarte?' rabbitUrl={rabitt}/>
          </div>
        </div>
      </div>
    </>
  );
};


*/