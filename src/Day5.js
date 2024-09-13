import { useState } from "react";
const SampleList = () => {
  const fruits = ["apple", "banana", "lychee", "durian", "avocado"];
  return (
    <div className="div">
      <h2>Fruit list:</h2>
      <ul>
        {fruits.map((fruit, index) => (
          <li key={index}>
            {index + 1}. {fruit}{" "}
          </li>
        ))}
      </ul>
    </div>
  );
};
const ASEANCountries = () => {
  const countries = [
    "Laos",
    "Thailand",
    "Cambodia",
    "Myanmar",
    "Vietnam",
    "Philippines",
    "Indonesia",
    "Singapore",
    "brunei",
    "Malaysia",
  ];
  return (
    <div className="div">
      <h2>ASEAN Countries</h2>
      <ul>
        {countries.map((countries, index) => (
          <li key={index}>
            {index + 1}. {countries}
          </li>
        ))}
      </ul>
    </div>
  );
};
const StudentList = () => {
  const students = [
    {
      name: "yok",
      class: "C1",
      gender: "woman",
    },
    {
      name: "Fone",
      class: "C1",
      gender: "man",
    },
    {
      name: "Nita",
      class: "C2",
      gender: "woman",
    },
    {
      name: "Jason",
      class: "C2",
      gender: "man",
    },
  ];
  return (
    <div className="div">
      <h2>Student lists:</h2>
      <ul>
        {students
          .filter(
            (student) => student.class === "C1" && student.gender === "man"
          )
          .map((student, index) => (
            <li key={index}>
              {index + 1}. {student.name}. class: {student.class}.{" "}
              {student.gender}
            </li>
          ))}

        {/* {students.map((students, index) => 
        students.gender == "woman" && students.class == "C2" ? 
        (
            <li key ={index}>
                {index+1}. {students.name}. class: {students.class}. {students.gender}
            </li> */}
        {/* ) : (<div></div>))} */}
      </ul>
    </div>
  );
};
const TodoList = () => {
  const [toDo, setToDo] = useState([
    {
      text: "study react",
      completed: false,
    },
    {
      text: "create To-do app",
      completed: false,
    },
    {
      text: "practice Lists & false",
      completed: false,
    },
  ]);
  const onToggleTodo = (index) => {
    const newTodos = [...toDo];
    newTodos[index].completed = !newTodos[index].completed;
    setToDo(newTodos);
  };
  const [newToDo, setNewTodo] = useState("");
  const addTodo = (e) => {
    e.preventDefault();
    setToDo([...toDo, { text: newToDo, completed: false }]);
    setNewTodo("");
  };
  return (
    <div>
      <h2>Lists we have to do</h2>
      <form onSubmit={addTodo}>
        <input
          onChange={(event) => setNewTodo(event.target.value)}
          value={newToDo}
          type="text"
          placeholder="add"
        ></input>
        <button type="submit" onClick={addTodo}>
          add
        </button>
      </form>
      <ul>
        {toDo.map((todo, index) => (
          <li
            key={index}
            style={{ textDecoration: todo.completed ? "Line-through" : "none" }}
            onClick={() => onToggleTodo(index)}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
};
const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };
  return (
    <div className="carousel">
      <button className="carousel-button prev" onClick={prevSlide}>
        &#10094;
      </button>
      {images.map((image, index) => (
        <img
          src={image}
          key={index}
          alt={`Slide ${index + 1}`}
          className={`carousel-image ${index === currentIndex ? "active" : ""}`}
        ></img>
      ))}
      <button className="carousel-button next" onClick={nextSlide}>
        &#10095;
      </button>
    </div>
  );
};
const Day5 = () => {
    const carouselImages =[
        "https://tse3.mm.bing.net/th?id=OIP.nbjdjq3Mp5AR2YKhHr8yvQHaHH&pid=Api&P=0&h=220",
        "https://tse1.mm.bing.net/th?id=OIP.Hw4jPBA06HdM_n0t3X2uMQAAAA&pid=Api&P=0&h=220",
        "https://www.ieltscareerzone.in/wp-content/uploads/2021/07/dfdsaghgfhfghsds-copy.jpg"
    ];
    
    return(
    <div className="container">
        <p>TECHING OF LIST AND KEYS</p>
        <hr></hr>
        <SampleList></SampleList>
        <hr></hr>
        <ASEANCountries></ASEANCountries>
        <hr></hr>
        <StudentList></StudentList>
        <hr></hr>
        <TodoList></TodoList>
        <hr></hr>
        <ImageCarousel images={carouselImages}></ImageCarousel>
        <style jsx>{`
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: start;
          min-height: 100vh;
          background-color: white;
          text-align: start;
        }
        ul {
          list-style-type: none;
          padding: 0;
        }
        li {
          margin-bottom: 10px;
          padding: 10px;
          background-color: #f0f0f0;
          border-radius: 5px;
        }
        button {
          margin-left: 10px;
          cursor: pointer;
          padding: 5px 10px;
          background-color: #ff4444;
          color: white;
          border: none;
          border-radius: 3px;
        }
        hr {
          color: black;
          width: 100%;
        }
        .carousel {
          position: relative;
          width: 100%
          max-width: 600px;
          margin: 0 auto;
        }
        .carousel-image {
          width: 100%;
          height: auto;
          display: none;
        }
        .carousel-image.active {
          display: block;
        }
        .carousel-button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background-color: rgba(0, 0, 0, 0.5);
          color: white;
          border: none;
          padding: 10px 15px;
          cursor: pointer;
          font-size: 18px;
        }
        .prev {
          left: 10px;
        }
        .next {
          right: 10px;
        }
      `}</style>
    </div>
  );
};
export default Day5;
