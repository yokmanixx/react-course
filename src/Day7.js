import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

const API_URL = "https://sample-api-fwbm.onrender.com/api/v1";

const Day7 = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [loginData, setLoginData] = useState({
    email: "Bill20005gmail.com",
    password: "12345",
  });
  const [signupData, setSignupData] = useState({
    first_name: "",
    surname: "",
    email: "",
    phone_number: "",
    password: "",
  });
  const [activeTab, setActiveTab] = useState("login");
  const [isLoading, setIsLoading] = useState(false);
  const [isPostsLoading, setIsPostsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/users/login`, loginData);
      if (response.data.status === "success") {
        const token = response.data.token;
        localStorage.setItem("token", token);
        setUser(response.data.data.user);
        fetchPosts(token);
        Swal.fire({
          icon: "success",
          title: "successfully login",
          text: `hello ${response.data.data.user.first_name} ${response.data.data.user.surname}`,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "login failed",
        text: "please check your infomation and check again",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_URL}/users/signup`, signupData);
      if (response.data.status === "success") {
        const token = response.data.token;
        localStorage.setItem("token", token);
        setUser(response.data.data.user);
        fetchPosts(token);
        Swal.fire({
          icon: "success",
          title: "successfully login",
          text: `Hello ${response.data.data.user.first_name} ${response.data.data.user.surname}`,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "login failed",
        text: "please check youor information and login again",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPosts = async (token) => {
    if (!token) {
      setPosts([]);
      return;
    }
    setIsPostsLoading(true);
    try {
      const response = await axios.get(`${API_URL}/posts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(response.data.data.posts);
    } catch (error) {
      setPosts([]);
    } finally {
      setIsPostsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setPosts([]);
    Swal.fire({
      icon: "success",
      title: "Successfully log out",
      text: "Thank you fo visiting!",
    });
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        icon: "warning",
        title: "Please login first!",
        text: "Please login to perform this action!",
      });
      return;
    }
    setIsLoading(true);
    try {
      await axios.post(
        `${API_URL}/posts`,
        { content: newPost },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewPost('');
      fetchPosts(token)
      Swal.fire({
        icon: "success",
        title: "Create a new post successfully!",
        text: "You have already posted!"
      })
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Cannot create a new post!",
            text: "Something went wrong, please try again later!"
          })
    } finally {
        setIsLoading(false)
    }
  };

  return (
    <div className="container">
      <h1>Day7:login and Post system</h1>

      {isLoading && <div className="loading">loading...</div>}

      {!user ? (
        <div>
          <div className="tabs">
            <button
              className={activeTab === "login" ? "active" : ""}
              onClick={() => setActiveTab("login")}
            >
              login
            </button>
            <button
              className={activeTab === "signup" ? "active" : ""}
              onClick={() => setActiveTab("signup")}
            >
              Register
            </button>
          </div>
          {activeTab === "login" && (
            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
              ></input>
              <input
                type="password"
                placeholder="Password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
              ></input>
              <button type="submit" disabled={isLoading}>
                submit
              </button>
            </form>
          )}
          {activeTab === "signup" && (
            <div>
              <form onSubmit={handleSignup}>
                <input
                  type="text"
                  placeholder="First name"
                  value={signupData.first_name}
                  onChange={(e) =>
                    setSignupData({ ...signupData, first_name: e.target.value })
                  }
                ></input>
                <input
                  type="text"
                  placeholder="Surname"
                  value={signupData.surname}
                  onChange={(e) =>
                    setSignupData({ ...signupData, surname: e.target.value })
                  }
                ></input>
                <input
                  type="email"
                  placeholder="Email"
                  value={signupData.email}
                  onChange={(e) =>
                    setSignupData({ ...signupData, email: e.target.value })
                  }
                ></input>
                <input
                  type="tel"
                  placeholder="Phone number"
                  value={signupData.phone_number}
                  onChange={(e) =>
                    setSignupData({
                      ...signupData,
                      phone_number: e.target.value,
                    })
                  }
                ></input>
                <input
                  type="password"
                  placeholder="Password"
                  value={signupData.password}
                  onChange={(e) =>
                    setSignupData({ ...signupData, password: e.target.value })
                  }
                ></input>
                <button type="submit" disabled={isLoading}>
                  Register
                </button>
              </form>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h2>Welcome, {user.first_name}!</h2>
          <p>Email: {user.email}</p>
          <p>Tel: {user.phone_number}</p>
          <p>role: {user.role}</p>
          <button onClick={handleLogout}>Log out</button>

          <h2>ໂພສ</h2>
          {isPostsLoading ? (
            <div className="loading">Loading Post...</div>
          ) : (
            <ul>
              {posts.map((post) => (
                <li key={post._id}>
                  <p>author: {post.author.first_name}</p>
                  <p>{post.content}</p>
                  <p>ໄລ້: {post.likes ? post.likes.length : 0}</p>
                </li>
              ))}
            </ul>
          )}

          <form onSubmit={handlePostSubmit}>
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="create New post"
            ></textarea>
            <button type="submit" disabled={isLoading}>
              ສ້າງໂພສ
            </button>
          </form>
        </div>
      )}
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

export default Day7;
