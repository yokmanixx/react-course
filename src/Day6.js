import { useEffect, useState } from "react";

function BasicForm() {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`SentInformation:${name}`);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={name}
          type="text"
          placeholder="Please ente your full name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></input>
        <button type="submit">send</button>
      </form>
    </div>
  );
}
const MultipleInputForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`sentInfomation ${JSON.stringify(formData)}`);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="firstName"
          placeholder="First Name"
          onChange={handleChange}
          value={formData.firstName}
        ></input>
        <input
          name="lastName"
          placeholder="Last Name"
          onChange={handleChange}
          value={formData.lastName}
        ></input>
        <input
          name="email"
          placeholder="email"
          onChange={handleChange}
          value={formData.email}
        ></input>
        <button type="submit">send</button>
      </form>
    </div>
  );
};
const SelectAndRadio = () => {
  const [selectFruit, setSelectFruit] = useState("apple");
  const [gender, setGender] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <select
          value={selectFruit}
          onChange={(e) => setSelectFruit(e.target.value)}
        >
          <option value="">choosing fruits</option>
          <option value="apple">apple</option>
          <option value="banana">banana</option>
          <option value="lychee">lychee</option>
        </select>
        {selectFruit && <h4>Your fruit choice is: {selectFruit}</h4>}
        <div>
          <input
            onChange={(e) => setGender(e.target.value)}
            type="radio"
            id="male"
            name="gender"
            value="male"
          ></input>
          <label>male</label>
          <input
            onChange={(e) => setGender(e.target.value)}
            type="radio"
            id="female"
            name="gender"
            value="female"
          ></input>
          <label>female</label>
          {gender && <h4>Your sex is: {gender}</h4>}
        </div>
        <button>submit</button>
      </form>
    </div>
  );
};
const ProductSearch = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder]=useState("asc");
    const [priceFilter, setPriceFilter] = useState({min:"",max:""});
    const [currentPage,setCurrentPage]= useState(1);
    const itemPerPage = 2;

  const products = [
    {
      id: 1,
      name: "phone",
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
            List by quantity <select onChange={handleSortChange}>
                <option value='asc'>low to high price</option>
                <option value='desc'>high to low price </option>
            </select>
        </label>
      </div>
      <div>
        <label>
          The cheapest:{" "}
          <input
            type="number"
            name="min"
            value={priceFilter.min}
            onChange={handlePriceFilteerChange}
          ></input>
        </label>
        <label>
          The most expensive:{" "}
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
        {/* <span>Page {currentPage} by {totalPages}</span> */}
      </div>
    </div>
  );
};
function Day6() {
  return (
    <div className="container">
      <h1>Day 6: Forms and controlled Components</h1>
      <h2>Form basis</h2>
      <br></br>
      <BasicForm></BasicForm>
      <h2>Multiple Input Form</h2>
      <MultipleInputForm></MultipleInputForm>
      <h2>Radio and Dropdown Choice</h2>
      <SelectAndRadio></SelectAndRadio>
      <h2>Product Search</h2>
      <ProductSearch></ProductSearch>
      <style jsx>
        {`
          .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            }
            form {
              margin-bottom: 20px;
            }
            h1 {
              color: red;
            }
            input,
            select {
              margin: 5px 0;
              padding: 5px;
            }
            button {
              margin-top: 10px;
              padding: 5px 10px;
              background-color: #4caf50;
              color: white;
              border: none;
              cursor: pointer;
            }
              .error {
              color: red;
              front-size: 20px;
              }
              ul {
              list-style-type: none;
              padding: 0; 
              }
              li {
              margin: 5px 0;
              padding: 5px;
              backgroud-color: #f0f0f0;
              border-radius: 3px;
              }
          }
        `}
      </style>
    </div>
  );
}
export default Day6;
