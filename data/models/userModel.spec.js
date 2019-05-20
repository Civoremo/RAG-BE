//import the configurations and the table that should be used for tests
const db = require('../dbConfig');
const Users = require('./userModel');

//should be done in this order to optimize speed
//insert, get, update, delete
describe('User model', () => {
  //remove all the data in the table before starting and after finishing test
  beforeAll(async () => { await db('Users').truncate() })
  afterAll(async () => { await db('Users').truncate() });

  describe('insert()', () => {
      it('should insert provided title', async () => {
      let test1 = await Users.insert({ first:'john', last:'doe', phone:'225-555-5555', email:'test@me.com', password:'pass'})
      expect(test1.first).toBe('john')
      
      let test2 = await Users.insert({ first:'jane', last:'doe', phone:'555-555-5555', email:'test2@me.com', password:'passer'})
      expect(test2.first).toBe('jane')
    
      let test3= await Users.insert({ first:'joseph', last:'brim', phone:'554-555-5555', email:'take@me.com', password:'passed'})
      expect(test2.first).toBe('jane')
      
      const accounts = await db('Users');

      expect(accounts).toHaveLength(3);
    });
  });

  describe('get()', () => {
    it('provide user list', async () => {
      await Users.get();

      const accounts = await db('Users');

      expect(accounts).toHaveLength(3);
    });
  });

  describe('get by id', () => {
    it('provides a single user', async () => {
      let user = await Users.getById(3)
      expect(user.last).toBe('brim')
    })
  })

  describe('get by number', () => {
    it('provides a single user', async () => {
      let user = await Users.getByNumber('225-555-5555')
      expect(user.first).toBe('john')
    })
  })

  describe('get by name', () => {
    it('provides a single user', async () => {
      let user = await Users.getByName('jane')
      expect(user.email).toBe('test2@me.com')
    })
  })

  describe('update()', () => {
    it('should update the title', async () => {
      let update = await Users.update('2', {phone:'333-444-5656'});
      console.log(update)
      expect(update.phone).toBe('333-444-5656');
    })
  })

  describe('delete()', () => {
    it('should delete a title', async () => {
      await Users.remove(2);
      let accounts = await db('Users');

      expect(accounts).toHaveLength(2);
    })
  })
});