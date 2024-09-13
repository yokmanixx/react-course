import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

const API_URL = "https://sample-api-fwbm.onrender.com/api/v1";

const Day8 = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [loginData, setLoginData] = useState({
    email: "bill1@gmail.com",
    password: "12345",
  });
  const [signupData, setSignupData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
  });
  const [activeTab, setActiveTab] = useState("login");
  const [isLoading, setIsLoading] = useState(false);
  const [isPostLoading, setIsPostLoading] = useState(false);

  useEffect(()=>{
    console.log('Fetch post!')
    fetchPosts()
    fetchMyUser();
  }, [])

  const fetchMyUser = async () => {
    try {
      const token=localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/users/me`, {
        headers: {Authorization:`Bearer ${token}`}
      })
      setUser(response.data.data.data)
    } catch (error) {
      localStorage.removeItem('token')
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/users/login`, loginData);
      if (response.data.status === "success") {
        const token = response.data.token;
        localStorage.setItem("token", token);
        setUser(response.data.data.user);
        fetchPosts();
        Swal.fire({
          icon: "success",
          title: "login succeeded",
          text: `welcome ${response.data.data.user.first_name} ${response.data.data.user.first_name}`,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "errror",
        title: "login failed",
        text: "PLease check and login again",
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/users/signup`, signupData);
      if (response.data.status === "success") {
        const token = response.data.token;
        localStorage.setItem("token", token);
        setUser(response.data.data.user);
        fetchPosts();
        Swal.fire({
          icon: "success",
          title: "sign up succeeded",
          text: `welcome ${response.data.data.user.first_name}`,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "errror",
        title: "sign up failed",
        text: "PLease check and sign up again",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPosts = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setPosts([]);
      return;
    }
    setIsPostLoading(true);
    try {
      const response = await axios.get(`${API_URL}/posts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(response.data.data.posts);
    } catch (error) {
      setPosts([]);
    } finally {
      setIsPostLoading(false);
    }
  };
  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "are you sure?",
      text: "sure to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: " #c30f08",
      confirmButtonText: "yes",
      cancelButtonText: "cancel",
    });
    if (result.isConfirmed) {
      localStorage.removeItem("token");
      await Swal.fire({
        icon: "success",
        title: "login success",
        text: "thx for visiting",
        timer: 1500,
      });
      navigate("/authentication");
    }
  };
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "please login first",
        text: "please login to perfprm this action!",
      });
      return;
    }
    setIsLoading(true);
  };
  const formatDateTime = (isoString) => {
    // create data object from ISO string
    const date = new Date(isoString);
    // change time to UTC +7
    date.setHours(date.getHours() + 7);
    // function for adding 0 in front
    const padZero = (num) => num.toString().padStart(2, "0");
    // Date (suggest to use library)
    const day = padZero(date.getUTCDate());
    const month = padZero(date.getUTCMonth() + 1);
    const year = padZero(date.getUTCFullYear());
    // Time
    let hours = date.getUTCHours();
    const minutes = padZero(date.getUTCMinutes());
    const ampm = hours >= 12 ? "PM" : "AM";
    // change time to 12 hours
    hours = hours % 12;
    hours = hours ? hours : 12; // if time is 0 change to 12
    hours = padZero(hours);
    // create string as results
    return `${day}-${month}-${year} ${hours}:${minutes} ${ampm}`;
  };
  const handleDelete = async (postId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        title: "please login first",
        icon: "warning",
        text: "please login to delete post",
      });
    }
    const result = await Swal.fire({
      title: "are you sure?",
      text: "you can't recover the deleted items",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4caf50",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, confirm",
      cancelButtonText: "cancel",
    });
    if (result.isConfirmed) {
      try {
        await axios.delete(`${API_URL}/posts/${postId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        Swal.fire("deleted!", "your post has been deleted", "success");
        fetchPosts();
      } catch (error) {
        Swal.fire(
          "error",
          error?.response?.data?.message ?? "can't delete, please try again",
          "error"
        );
      }
    }
  };
  const handleLike = async (postId) => {
    const token = localStorage.getItem("token");

    try {
        const response = await axios.post(
            `${API_URL}/posts/${postId}/like`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (response.data.status === "success") {
          fetchPosts();
          Swal.fire({
            title: "success",
            icon: "success",
            text: "successfully",
          });}

      } catch (error) {}
    }
  
  return (
    <div className="container">
      <h1>Day8: login and Post system, CRUD and Router</h1>
      {isLoading && <div className="loading">loading...</div>}
      <div>
          <h2>Hello, {user?.first_name}!</h2>
          <p>Email: {user?.email}</p>
          <p>Tel: {user?.phone_number}</p>
          <p>role: {user?.role}</p>
          <button onClick={handleLogout}> logout </button>

          <h2>post</h2>
          <button
            onClick={() => {
              fetchPosts();
            }}
          >
            Refresh posts
          </button>
          {isPostLoading ? (
            <div className="loading">posting...</div>
          ) : (
            <ul>
              {posts.map((post) => (
                <li key={post.id}>
                  <button
                    onClick={() => {
                      handleDelete(post._id);
                    }}
                  >
                    del
                  </button>
                  <p>time: {formatDateTime(post.createdAt)}</p>
                  <p>writer: {post.author.first_name}</p>
                  <p>{post.content}</p>
                  <p>like:{post.likes ? post.likes.length : 0}</p>
                  <button onClick={()=>{
                    handleLike(post._id)
                  }}>LIKE</button>
                  <Link to={`/edit/${post._id}`}>fix</Link>
                </li>
              ))}
            </ul>
          )}
          <form onSubmit={handlePostSubmit}>
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="create new posts
            "
            ></textarea>
            <button type="submit" disabled={isLoading}>
              creatw new posts
            </button>
          </form>
        </div>
      <style jsx>
        {`
          .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          .tabs {
            display: flex;
            margin-bottom: 20px;
          }
          .tabs button {
            flex: 1;
            padding: 10px;
            border: none;
            background-color: #f1f1f1;
            cursor: pointer;
          }
          .tabs button.active {
            background-color: #4caf50;
            color: white;
          }
          form {
            display: flex;
            flex-direction: column;
            margin-bottom: 20px;
          }
          input,
          textarea {
            margin-bottom: 10px;
            padding: 5px;
          }
          button {
            padding: 10px;
            background-color: #4caf50;
            color: white;
            border: none;
            cursor: pointer;
          }
          button:disabled {
            background-color: #cccccc;
            cursor: not-allowed;
          }
          ul {
            list-style-type: none;
            padding: 0;
          }
          li {
            background-color: #f1f1f1;
            margin-bottom: 10px;
            padding: 10px;
            border-radius: 5px;
          }
          .loading {
            text-align: center;
            padding: 20px;
            font-style: italic;
            color: #666;
          }
        `}
      </style>
    </div>
  );
};
export default Day8;
