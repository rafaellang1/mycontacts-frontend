import ContactForm from '../../components/ContacForm';
import PageHeader from '../../components/PageHeader';

export default function EditContact() {
  return (
    <>
      <PageHeader
        title="Editar Mateus Silva"
      />

      <ContactForm
        buttonLabel="Salvar alterações"
      />
    </>
  );
}
