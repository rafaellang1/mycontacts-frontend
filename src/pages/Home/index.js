import { Link } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';

import {
  Container, InputSearchContainer, Header, ListHeader, Card,
} from './styles';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';

import Loader from '../../components/Loader';

import delay from '../../utils/delay';

export default function Home() {
  // Hooks
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  // comeca retornando string vazia para o includes retornar true.
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsloading] = useState(true);

  const filteredContacts = useMemo(() => contacts.filter((contact) => (
    // nome do contato, contenha o que o usuario digitou no campo de pesquisa = includes
    // se uma string existe dentro de outra string = includes
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    // o valor retornado aqui dentro é o valor que queremos memorizar

  )), [contacts, searchTerm]);

  useEffect(() => {
    setIsloading(true);

    fetch(`http://localhost:3001/contacts?orderBy=${orderBy}`)
      .then(async (response) => {
        await delay(500);

        const json = await response.json(); // fazendo o parse do body
        setContacts(json);
      })
      .catch((error) => {
        console.log('erro', error);
      })
      .finally(() => {
        setIsloading(false);
      });
  }, [orderBy]);

  // Functions

  function handleToggleOrderBy() {
    setOrderBy(
      // para alterar valor de um state que depende do valor anterior
      // não acessar o valor diretamente, acessar por meio do prevState
      (prevState) => (prevState === 'asc' ? 'desc' : 'asc'),

      // passar o queryParam para o backend com o valor armazenado no estado orderBy
    );
  }

  // Se dentro do contact.name houver o item pesquisado, o includes retorna true
  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  return (
    <Container>
      <Loader isLoading={isLoading} />

      <InputSearchContainer>
        <input
          value={searchTerm}
          type="text"
          placeholder="Pesquise pelo nome..."
          onChange={handleChangeSearchTerm}
        />
      </InputSearchContainer>

      <Header>
        <strong>
          {filteredContacts.length}
          {filteredContacts.length === 1 ? ' contato' : ' contatos'}
        </strong>
        <Link to="/new">Novo contatos</Link>
      </Header>

      {filteredContacts.length > 0 && (
        <ListHeader order={orderBy}>
          <button type="button" onClick={handleToggleOrderBy}>
            <span>Nome</span>
            <img src={arrow} alt="Arrow" />
          </button>
        </ListHeader>
      )}

      {filteredContacts.map((contact) => (
        <Card key={contact.id}>
          <div className="info">
            <div className="contact-name">
              {/* só renderiza se existir dados */}
              <strong>{contact.name}</strong>
              {contact.category_name && (<small>{contact.category_name}</small>)}
            </div>
            <span>{contact.email}</span>
            <span>{contact.phone}</span>
          </div>

          <div className="actions">
            <Link to={`/edit/${contact.id}`}>
              <img src={edit} alt="Edit" />
            </Link>
            <button type="button">
              <img src={trash} alt="Delete" />
            </button>
          </div>
        </Card>
      ))}
    </Container>
  );
}

// SOP -> same Origin Policy -> Política de mesma origem
// CORS -> Cross-Origin Resource Sharing -> Compartilhamento de recursos entre origens cruzadas
// Origem: protocolo://dominio:porta

// Saída: http://localhost:3000
// Destino: http://localhost:3001

// Preflight -> Pré-voô
// Ao ferir a politica de mesma origem: saida === origem, ela passa a ser uma CORS
