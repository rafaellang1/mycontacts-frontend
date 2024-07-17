import { useParams, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';

import ContactForm from '../../components/ContacForm';
import PageHeader from '../../components/PageHeader';
import ContactsService from '../../services/ContactsService';
import Loader from '../../components/Loader';
import toast from '../../utils/toast';

export default function EditContact() {
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function loadContact() {
      try {
        const contactData = await ContactsService.getContactById(
          id,
        );

        console.log({ contactData });
        setIsLoading(false);
      } catch {
        // caso nao encontrar contato, redirect para home com history push
        history.push('/');
        toast({
          type: 'danger',
          text: 'Contato não encontrado',
        });
      }
    }

    loadContact();
  }, [id, history]);

  function handleSubmit() {
    //
  }
  return (
    <>
      <Loader isLoading={isLoading} />

      <PageHeader
        title="Editar Mateus Silva"
      />

      <ContactForm
        buttonLabel="Salvar alterações"
        onSubmit={handleSubmit}
      />
    </>
  );
}
