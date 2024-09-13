import React, {useEffect, useState} from "react"; 



const BlogPost = (props) => {
 const [like,setLike] = useState(0);
 return (
  <div>
      <br />
      <h1>{props.subject}</h1>
      <p>
      IELTS stands for the International English Language Testing System – an English Language proficiency test. Globally, there are more than 4 million test takers a year, making IELTS the world’s most popular English language proficiency test for higher education and global migration.
      </p>
      <h1>IELTS test format</h1>
      
      <p>
      Listening	-This section assesses how well you understand ideas, recognise opinions and follow the development of an argument.
      </p>
      <br />
      <p>
      Writing	-This section evaluates how well and how accurately you organise your ideas and write a response, along with your ability to use wide-ranging vocabulary and grammar.
      </p>
      <br />
      <p>
       Reading -This section assesses how well you read for general sense, main ideas and details, and whether you understand the author's inferences and opinions.
      </p>
      <br />
      <p>
      Speaking	-This section assesses how well you can communicate opinions and information on everyday topics and common experiences, as well as how you express and justify your opinions.      
      </p>
      <img
          width={500}
          height={350}
          src="https://i.ytimg.com/vi/CjjLAdrQTqA/maxresdefault.jpg"></img>
      
      <button 
      className="like2"
      onClick={()=> {
          setLike(like +1);
      }}>
          <img
              className="like2"
              width={80}
              height={80}
              src="https://webstockreview.net/images/hearts-vector-png-7.png"></img>
      </button>

      <h2>{like}</h2>
    
    
    </div>
 )}

// functional Counter Component 
const FunctionalCounter = () => {
  const [count, setCount] = useState(0);


  useEffect(()=> {
    document.title = `Func update ${count}`
  })
  return (
    <div className = "counter">
     <h2>This is Functional Counter</h2>
     <p>quantity: {count}</p>
     <button className="add-bt"
      onClick={() => {
        setCount(count + 1);
      }}
    >
      Add
    </button>
    <button className="minus-bt" 
      onClick={() => {
        setCount(count - 1);
      }}
    >
      minus
    </button>
    </div>

  );
  
};
// Product component
  const ProductComp = (props)=>{
    const pa = () => {
      if (props.apply){
        return <a href={props.link}><h2>Apply Now!</h2></a>
      } else {
        return <></>
      }
    }
    return (
      <div className="product-card">
        <h1>{props.title}</h1>
        <div className="contain">
          <p>{props.subject}<h2>{props.price}</h2></p>
          <img
          width = {240}
          height = {130} 
          src={props.picture}></img>
        </div>
        {pa()}
        <p>Product component</p>
      </div>
    )
  }
// class component
class ClassCounter extends React.Component{
  constructor (props) {
    super (props);
    this.state = { count: 5 };
  }
  componentDidUpdate(){
    document.title = `quantity ${this.state.count}`;
  }
  render () {
    return (
    <div className = "counter">
      <h2>This is Functional Counter</h2>
      <p>quantity: {this.state.count}</p>
      <button className="add-bt" onClick={() => {
         this.setState({
           count: this.state.count +1,
          });
        }}>add</button>
      <button className="minus-bt" onClick={() => {
         this.setState({
            count: this.state.count -1,
           });
         }}>minus</button>

    </div>
  );}
}
// mian component
const Day2 = ()=> { 
  const title = "What is IELTS"
  const price="50$/unit"
  const productDetail = [
    {
      title: "IELTS 3 months course",
      subject: "Advance your career/Access new opportunities/Work internationally",
      picture: "https://focuseducationcentre.com/wp-content/uploads/2020/09/ielts-preparation.jpg",
      price: "Price: $250"
    },
    {
      title: "IELTS BOOKS",
      subject: "The British Council – The UK's international organisation for educational opportunity",
      picture: "https://tse3.mm.bing.net/th?id=OIP.0v5SY6hOgFNYMVZzwkwoRAHaHa&pid=Api&P=0&h=220",
      price: "Price: $50/unit"
    },
    {
      title: "MOCK TEST",
      subject: "For more information about IELTS, download our IELTS Quickstart Guide. It shares key information to help you to understand and then prepare for the test. It also includes all the insights shared here, presented in an easy-to-read format. Get your free copy by clicking the button below.",
      picture: "https://bivent.org/wp-content/uploads/2021/03/ielts-mock-test.jpg",
      link: 'https://ieltsnews.britishcouncil.org/ielts-quick-facts',
      apply: true
    },
    
  ]
 return (
  <div className="app">
  <FunctionalCounter></FunctionalCounter>
  <ClassCounter></ClassCounter>
  <BlogPost subject = {title}/>
  <hr></hr>
  {/* <ProductComp title="IELTS 3 months course" subject="Advance your career/Access new opportunities/Work internationally"picture="https://focuseducationcentre.com/wp-content/uploads/2020/09/ielts-preparation.jpg" price="250$"/>
  <ProductComp title="IELTS BOOKS" subject="The British Council – The UK's international organisation for educational opportunity"picture="https://tse3.mm.bing.net/th?id=OIP.0v5SY6hOgFNYMVZzwkwoRAHaHa&pid=Api&P=0&h=220" price={price}/> */}
  {productDetail.map((element, index) => (
    <ProductComp title = {element.title} subject = {element.subject} picture = {element.picture} price = {element.price} link = {element.link} apply ={element.apply}/>
  ))}
  <style jsx>
    {`
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
      padding: 10px 20px;
      font-size: 16px;
      margin: 16px;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s;
      }
    .add-bt{
      background-color: #4caf50;
    }
    .minus-bt{
      background-color: #c30f08;
    }
    .like2{
      border-radius: 100%;
    }
    h1{
    color: #c30f08;
    }
    .product-card{
      margin: 20px 0;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
      background-color: #f9f9f9;
    }
    .contain{
    display:flex;
    text-align: center;
    }
      `}
  </style>
  </div>
 );
};

export default Day2;