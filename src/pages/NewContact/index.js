import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContacForm';

export default function NewContact() {
  return (
    <>
      <PageHeader
        title="Novo contato"
      />
      <ContactForm
        buttonLabel="Cadastrar"
      />
    </>
  );
}
