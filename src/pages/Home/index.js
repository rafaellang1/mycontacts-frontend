import { Link } from 'react-router-dom';

import {
  Container, InputSearchContainer, Header, ListContainer, Card,
} from './styles';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';

export default function Home() {
  return (
    <Container>

      <InputSearchContainer>
        <input type="text" placeholder="Pesquise pelo nome..." />
      </InputSearchContainer>
      <Header>
        <strong>3 contatos</strong>
        <Link to="/new">Novo contatos</Link>
      </Header>

      <ListContainer>
        <header>
          <button type="button">
            <span>Nome</span>
            <img src={arrow} alt="Arrow" />
          </button>
        </header>

        <Card>
          <div className="info">
            <div className="contact-name">
              <strong>Mateus Silva</strong>
              <small>instagram</small>
            </div>
            <span>mateus@devacademy.com.br</span>
            <span>(41) 9.9999-9999</span>
          </div>

          <div className="actions">
            <Link to="/edit/123">
              <img src={edit} alt="Edit" />
            </Link>
            <button type="button">
              <img src={trash} alt="Delete" />
            </button>
          </div>
        </Card>

      </ListContainer>
    </Container>
  );
}

fetch('http://localhost:3001/contacts', {
  method: 'DELETE',
  headers: new Headers({
    'X-App-ID': '123',
  }),
})
  .then((response) => {
    console.log('response', response);
  })
  .catch((error) => {
    console.log('erro', error);
  });

// SOP -> same Origin Policy -> Política de mesma origem
// CORS -> Cross-Origin Resource Sharing -> Compartilhamento de recursos entre origens cruzadas
// Origem: protocolo://dominio:porta

// Saída: http://localhost:3000
// Destino: http://localhost:3001

// Preflight -> Pré-voô
// Ao ferir a politica de mesma origem: saida === origem, ela passa a ser uma CORS
