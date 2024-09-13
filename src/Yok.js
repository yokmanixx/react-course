import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://sample-api-fwbm.onrender.com/api/v1";

const BlogPost = (props) => {
  const [user, setUser] = useState(null);
  const [name] = useState(0);
  useEffect(() => {
    console.log("Fetch post!");
    fetchMyUser();
  }, []);

  const fetchMyUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data.data.data);
    } catch (error) {
      localStorage.removeItem("token");
    }
  };
  return (
    <div>
      <br />
      <h1>{props.subject}</h1>
      <p>
        I'm Yok, and I LOVE traveling aboard, seeking more to experience in diverse cultures, places, food and meeting new people. Therfore, I always find myself as a country representative sharing culture by joining Exchange Programs in Japan(2022-2023) and China (2023-2024). This experience not only strengthened my language skills but also expanded my interest in technology. Therefore, I was inspired to pursue a major in Software engineering.
      </p>
      <h2>
        {user?.first_name} {user?.surname}!
      </h2>

      <img
        className="profile-pic"
        width={350}
        height={500}
        src="/img1.jpg"
      ></img>
      <p>summary</p>
    </div>
  );
};

// add link while also add years
const ProductComp = (props) => {
  const pa = () => {
    if (props.apply) {
      return (
        <a href={props.link}>
          <h2>Know more about Me!</h2>
        </a>
      );
    } else {
      return <></>;
    }
  };
  return (
    <div className="product-card">
      <h1>{props.title}</h1>
      <div className="contain">
        <p>
          {props.subject}
          <h2>{props.time}</h2>
        </p>
        <img width={240} height={130} src={props.picture}></img>
      </div>
      {pa()}
    </div>
  );
};
const YearSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder]=useState("asc");
  const [priceFilter, setPriceFilter] = useState({min:"",max:""});
  const [currentPage,setCurrentPage]= useState(1);
  const itemPerPage = 2;
  
  // • 3rd Place - Knowledge Competition on the 60th Anniversary of the Establishment of Diplomatic Relations between China and
  // Laos（中老建交60周年知识竞）2021.
  // • - Won the silver medal at the 12th math Olympiad (2020)
  // : Won the sier medal the Main Ompa (20))
  // Neerada High-School
const products = [
  {
    id: 1,
    name: "3rd Place - Knowledge Competition on the 60th Anniversary of the Establishment of Diplomatic Relations between China and",
    price: 5,
  },
  {
    id: 2,
    name: "laptop",
    price: 7,
  },
  {
    id: 3,
    name: "ipad",
    price: 6,
  },
  {
    id: 4,
    name: "earpod",
    price: 1,
  },
  {
    id: 5,
    name: "camera",
    price: 10,
  },
  
];



const [results, setResults] = useState([...products]);

useEffect((e)=> {
  handleSearch();
}, [sortOrder,priceFilter,currentPage]);

const handleSearch = () => {
  let filterProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // filter by price
  if (priceFilter.min !== "") {
      filterProducts = filterProducts.filter (
          (product) => product.price >= parseInt (priceFilter.min)
      );
  }
  filterProducts.sort ((a,b)=> {
      // make up
      return sortOrder == "asc"? a.price-b.price : b.price- a.price;
  });
  setResults(filterProducts);
  
  
  if (priceFilter.max !== "") {
      filterProducts = filterProducts.filter (
          (product) => product.price <= parseInt (priceFilter.max)
      );
  }
  setResults(filterProducts);
};

const handlePriceFilteerChange = (e) => {
  setPriceFilter({...priceFilter,[e.target.name]:[e.target.value]});
}
const handleSortChange = (e) => {
  setSortOrder(e.target.value);
}
  const indexOfLastItem = currentPage*itemPerPage;
  const indexOfFirstItem = indexOfLastItem-itemPerPage;
  const currentItems= results.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(results.length/itemPerPage)
return (
  <div>
      <form onSubmit={(e)=> {
          e.preventDefault();
          handleSearch();
      }}
      >-
      </form>
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    ></input>
    <form onSubmit={handleSearch}>
      <button type="submit">search</button>
    </form>
    <div>
      <label>
          List by year <select onChange={handleSortChange}>
              <option value='asc'>low to high </option>
              <option value='desc'>high to low </option>
          </select>
      </label>
    </div>
    <div>
      <label>
        The oldest:{" "}
        <input
          type="number"
          name="min"
          value={priceFilter.min}
          onChange={handlePriceFilteerChange}
        ></input>
      </label>
      <label>
        The oldest:{" "}
        <input
          type="number"
          name="max"
          value={priceFilter.max}
          onChange={handlePriceFilteerChange}
        ></input>
      </label>
    </div>
    <ul>
      {currentItems.map((product, index) => (
        <li key={product.id}>
          {index + 1}. {product.name}, price: {product.price} LAK
        </li>
      ))}
    </ul>
    <div>
      <button onClick={()=> setCurrentPage((prev) => Math.max(prev-1, 1))} disabled={currentPage === 1}>Before</button>
      <span>Page {currentPage} by {totalPages}</span>
      <button onClick={()=> setCurrentPage((prev) => Math.min(prev+1, totalPages))} disabled={currentPage === totalPages}>Next</button>
    </div>
  </div>
);
};
// mian component
const Yok = () => {
  const title = "EVERYTHING ABOUT ME";
  const carouselImages =[
    "https://tse3.mm.bing.net/th?id=OIP.nbjdjq3Mp5AR2YKhHr8yvQHaHH&pid=Api&P=0&h=220",
    "https://tse1.mm.bing.net/th?id=OIP.Hw4jPBA06HdM_n0t3X2uMQAAAA&pid=Api&P=0&h=220",
    "https://www.ieltscareerzone.in/wp-content/uploads/2021/07/dfdsaghgfhfghsds-copy.jpg"
];
  const productDetail = [
    {
      title: "Web Developing",
      subject: "IT Professionals Training by Boomer Olay teacher. Visualize using API, practice coding and problem solving in React.",
      picture: "img3.jpg",
      time: "SEP 2024",
    },
    {
      title: "Exchange student in Japan",
      subject:
        "Lao Representative building strong relationships with locals for 10 months in Japan. Learned to be a Social impact citizen while sharing culture.",
      picture: "img2.jpg",
      time: "2023-2024",
    },
    {
      title: "CONTACT ME",
      subject:
        "For more information about ME, You can click the link down below. It shares information about me and my social media. Feel free to add and chat together:3",
      picture:
        "https://scontent.fvte2-1.fna.fbcdn.net/v/t39.30808-1/321653306_1628131004295921_5772509585620351597_n.jpg?stp=dst-jpg_s200x200&_nc_cat=111&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeGgruR8wmj84fHkyiD4frd3L3p8beDY3cIvenxt4NjdwiHbqhiba1ZGRsFdJoEPR8Qol2MEMDH12aj4mPP7J5Q0&_nc_ohc=rKnUmfXNpZwQ7kNvgHTgx_v&_nc_ht=scontent.fvte2-1.fna&oh=00_AYAJwrGMEO1dNSOUVOR4IV9r07TZ2t9V8nuFpBdtLOGpdQ&oe=66E8965D",
      link: "https://www.instagram.com/yok.manixx?igsh=MWh4ZmljN2N4dGR0eg%3D%3D&utm_source=qr",
      apply: true,
    },
  ];
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
  return (
    <div className="app">
      <BlogPost subject={title} />
      <hr></hr>

      {productDetail.map((element, index) => (
        <ProductComp
        title={element.title}
        subject={element.subject}
        picture={element.picture}
        time={element.time}
        link={element.link}
        apply={element.apply}
        />
      ))}
      <YearSearch></YearSearch>
      <ImageCarousel images={carouselImages}></ImageCarousel>
      <style jsx>
        {`
          .profile-pic {
            border-radius: 100%;
          }
          .app {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            text-align: center;
          }
          .counter {
            margin: 20px 0;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
            background-color: #f4ebc5;
          }
          button {
              margin-top: 10px;
              padding: 5px 10px;
              background-color: #c30f08;
              color: white;
              border: none;
              cursor: pointer;
          }
          h1 {
            color: #c30f08;
          }
          h2 {
            color: #c94c4c;
          }
          .product-card {
            margin: 20px 0;
            padding: 20px;
            border: 1px;
            solid: #ddd;
            border-radius: 8px;
            background-color: #fff6f4;
          }
          .contain {
            display: flex;
            text-align: center;
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
        `}
      </style>
    </div>
  );
};

export default Yok;
