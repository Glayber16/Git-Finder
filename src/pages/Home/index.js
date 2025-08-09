import { useState } from "react";
import { Header } from "../../components/Header";
import background from "../../assets/background.png";
import "./styles.css";
import ItemList from "../../components/ItemList";

function App() {
  const [user, setUser] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [repos, setRepos] = useState([]);

  const handleGetData = async () => {

    const userData = await fetch(`https://api.github.com/users/${user}`);
    const newUser = await userData.json();

    if (newUser.name) {
      const { avatar_url, name, bio, login } = newUser;
      setCurrentUser({ avatar_url, name, bio, login });

      const reposData = await fetch(`https://api.github.com/users/${user}/repos`);
      const newRepos = await reposData.json();

      if (Array.isArray(newRepos) && newRepos.length) {
        setRepos(newRepos);
      } else {
        setRepos([]);
      }
    } else {
      setCurrentUser(null);
      setRepos([]);
    }
  };

  return (
    <div className="App">
      <Header />
      <div className="conteudo">
        <img src={background} alt="logo do github ao fundo" className="background" />
        <div className="info">
          <div>
            <input
              name="usuario"
              value={user}
              placeholder="@usuario"
              onChange={(event) => setUser(event.target.value)}
            />
            <button onClick={handleGetData}>Buscar</button>
          </div>

          {currentUser && (
            <div className="perfil">
              <img
                src={currentUser.avatar_url}
                alt="imagem do usuario buscado"
                className="profile"
              />
              <div>
                <h3>{currentUser.name}</h3>
                <span>{currentUser.login}</span>
                <p>{currentUser.bio}</p>
              </div>
            </div>
          )}

          <hr />

          {repos.length > 0 && (
            <div>
              <h4 className="repositorio">Repositórios</h4>
              {repos.map((repo) => (
                <ItemList
                  key={repo.id}
                  title={repo.name}
                  description={repo.description || "Sem descrição"}
                  link={repo.html_url}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
