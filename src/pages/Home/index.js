import { Link } from 'react-router-dom';

import { useEffect, useState } from 'react';
import {
  Container, InputSearchContainer, Header, ListHeader, Card,
} from './styles';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';

export default function Home() {
  // Hooks
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch(`http://localhost:3001/contacts?orderBy=${orderBy}`)
      .then(async (response) => {
        const json = await response.json(); // fazendo o parse do body
        setContacts(json);
      })
      .catch((error) => {
        console.log('erro', error);
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

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  console.log(orderBy);

  return (
    <Container>

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
          {contacts.length}
          {contacts.length === 1 ? ' contato' : ' contatos'}
        </strong>
        <Link to="/new">Novo contatos</Link>
      </Header>

      <ListHeader $orderBy={orderBy}>
        <button type="button" onClick={handleToggleOrderBy}>
          <span>Nome</span>
          <img src={arrow} alt="Arrow" />
        </button>
      </ListHeader>

      {contacts.map((contact) => (
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
