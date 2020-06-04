import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [
    repositories,
    setRepositories
  ] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => setRepositories(response.data));
  }, []);

  async function handleAddRepository() {
    try {
      const repository = {
        title: `Novo title ${Date.now()}`,
        url: `Nova url ${Date.now()}`,
        techs: [
          `Nova tech ${Date.now()}`
        ]
      };

      const response = await api.post('repositories', repository);

      setRepositories([ ...repositories, response.data ]);
    } catch (e) {
      console.log('Erro ao adicionar repositorio');
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`);

      const index = repositories.findIndex(r => r.id === id);

      repositories.splice(index, 1);

      setRepositories([ ...repositories ]);
    } catch (e) {
      console.log('Erro ao deletar repositorio');
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repository => (
            <li key={repository.id}>
              {repository.title}

              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          ))
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
