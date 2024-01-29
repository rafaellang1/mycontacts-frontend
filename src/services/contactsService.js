import delay from '../utils/delay';

class ContactsService {
  async listContacts(orderBy = 'asc') {
    const response = await fetch(
      `http://localhost:3001/contacts?orderBy=${orderBy}`,
    );

    await delay(500);

    return response.json(); // fazendo o parse do body
  }
}

export default new ContactsService();
