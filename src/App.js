import './App.css';
import sum from "./math";
import { useState, useEffect } from "react";

const getUser = () => {
  return Promise.resolve({ id: '1', name: 'Daniel' });
};

function App() {
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState('');
  const title = "Hello Earthlings 🛸"

  useEffect(() => {
    const loadUser = async () => {
      const user = await getUser();
      setUser(user);
    };

    loadUser();
  }, [])
  

  function handleChange(event) {
    setSearch(event.target.value);
  }


  return (
    <div className="App">
        <div className="app-contents">
          <div className="sum">
            <a
              className="App-link"
              href="https://github.com/DanielYankiver"
              target="_blank"
              rel="noopener noreferrer"
            >
              Sum Function Output: {sum(5, 4)}
            </a>
          </div>
          <div>{title}</div>
        </div>
        <div className="search">
          {user ? <p>Signed in as {user.name}</p> : null}
          <Search value={search} onChange={handleChange}>
            Search:
          </Search>
          <div>Searches for {search ? search : '...'}</div>
        </div>
    </div>
  );
}

function Search({ value, onChange, children }) {
  return (
    <div>
      <label htmlFor="search">{children}</label>
      <input
        id="search"
        type="text"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default App;
