import { useState } from 'react';
import gitLogo from '../assets/github.png'
import {Container} from './styles';
import Input from '../components/Input';
import Button from '../components/Button';
import ItemRepo from '../components/ItemRepo';
import api from '../services/api';
function App() {
  const [currentRepo, setCurrentRepo ] = useState('');
  const [repos, setRepos] = useState([]);

  const handleSearchRepo = async () =>{
    const {data} = await api.get(`repos/${currentRepo}`)

    if (data.id){

      const isExist = repos.find(repo => repo.id === data.id)

      if (!isExist){
      setRepos(prev => [...prev, data]);
      setCurrentRepo("")
      return 
    }
    }
   alert('repository not found')
  }
const handleRemoveRepo = (id) =>{
  // Usa filter para criar uma nova array sem o repo com o id específico
  const updatedRepos = repos.filter((repo) => repo.id !== id);

  // Atualiza o estado com a nova array
  setRepos(updatedRepos);
}


  return (
    <Container>
      <img src={gitLogo} width={72} height={72} alt="github logo" />
      <Input value={currentRepo} onChange={(e) => setCurrentRepo(e.target.value)} />
      <Button onClick={handleSearchRepo} />
      {repos.map(repo => <ItemRepo handleRemoveRepo={() => handleRemoveRepo(repo.id)} repo={repo}/>)}
      <ItemRepo />
    </Container>
  );
}

export default App;
