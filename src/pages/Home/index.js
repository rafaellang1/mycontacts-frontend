/* eslint-disable react/jsx-one-expression-per-line */
import { Link } from 'react-router-dom';
import {
  useEffect, useState, useMemo, useCallback,
} from 'react';

import {
  Container,
  InputSearchContainer,
  Header,
  ListHeader,
  Card,
  ErrorContainer,
  EmptyListContainer,
  SearchNotFoundContainer,
} from './styles';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import sad from '../../assets/images/sad.svg';
import emptyBox from '../../assets/images/empty-box.svg';
import magnifierQuestion from '../../assets/images/magnifier-question.svg';

import Loader from '../../components/Loader';
import Button from '../../components/Button';
import Modal from '../../components/Modal';

import ContactsService from '../../services/ContactsService';
// import APIError from '../../errors/APIError';

export default function Home() {
  // Hooks
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  // comeca retornando string vazia para o includes retornar true.
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsloading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const filteredContacts = useMemo(() => contacts.filter((contact) => (
    // nome do contato, contenha o que o usuario digitou no campo de pesquisa = includes
    // se uma string existe dentro de outra string = includes
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    // o valor retornado aqui dentro é o valor que queremos memorizar

  )), [contacts, searchTerm]);

  const loadContacts = useCallback(async () => {
    // utilizamos o useCallback para tratar erros de loop infinito
    try {
      setIsloading(true);

      const contactsList = await ContactsService.listContacts(orderBy);
      // const contactsList = []; await ContactsService.listContacts(orderBy);

      setHasError(false);
      setContacts(contactsList);
    } catch {
      setHasError(true);
    } finally {
      setIsloading(false);
    }
  }, [orderBy]);

  useEffect(() => {
    loadContacts();

    // P/ usar uma funcao async await dentro de um useEffect, nao use async direto no hook
    // criar o hook e transfere o await para nova funcao dentro do hook useEffect
  }, [loadContacts]);

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

  function handleTryAgain() {
    loadContacts();
  }

  return (
    <Container>
      <Loader isLoading={isLoading} />

      <Modal
        danger
        title='Tem certeza que deseja remover o contato "Mateus Silva?"?'
        confirmLabel="Deletar"
        onCancel={() => alert('Cancelou')}
        onConfirm={() => alert('confirmou')}
      >
        <h2>testestes</h2>
        <strong>tetetetetste</strong>
        <p>osaijdoaisj</p>
      </Modal>

      {contacts.length > 0 && (
        // Verifica se o retorno de contatos da API tem algum contato cadastrado
        <InputSearchContainer>
          <input
            value={searchTerm}
            type="text"
            placeholder="Pesquise pelo nome..."
            onChange={handleChangeSearchTerm}
          />
        </InputSearchContainer>
      )}

      <Header
        // Error no console
        $justifyContent={
          // eslint-disable-next-line no-nested-ternary
          hasError
            ? 'flex-end'
            : (
              contacts.length > 0 ? 'space-between' : 'center'
            )

          }
      >
        {(!hasError && contacts.length > 0) && (
          // renderiza quando nao tiver erro e a lista tiver contatos cadastrados
          <strong>
            {filteredContacts.length}
            {filteredContacts.length === 1 ? ' contato' : ' contatos'}
          </strong>
        )}
        <Link to="/new">Novo contatos</Link>
      </Header>

      {hasError && (
        <ErrorContainer>
          <img src={sad} alt="Sad" />

          <div className="details">
            <strong>Ocorreu um erro ao obter os seus contatos!</strong>

            <Button type="button" onClick={handleTryAgain}>
              Tentar Novamente
            </Button>
          </div>
        </ErrorContainer>
      )}

      {!hasError && (
      <>
        {(contacts.length < 1 && !isLoading) && (
        <EmptyListContainer>
          <img src={emptyBox} alt="Empty Box" />

          <p>
            Você ainda não tem nenhum contato cadastrado!
            Clique no botão <strong>&quot;Novo Contato&quot;</strong> à cima
            para cadastrar o seu primeiro contato!
          </p>
        </EmptyListContainer>
        )}

        {(contacts.length > 0 && filteredContacts.length < 1) && (
          <SearchNotFoundContainer>
            <img src={magnifierQuestion} alt="Magnifier question" />

            <span>
              Nenhum resultado foi encontrado para <strong>&quot;{searchTerm}&quot;</strong>
            </span>
          </SearchNotFoundContainer>
        )}

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
      </>
      )}
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
