const { login } = require('./authenticate');

describe('AuthenticateService', () => {
  describe('#login', () => {
    it('should return null when authentication fails', () => {
      expect(login('userName', 'password')).toBeNull();
    });

    it('should return jwt token when authentication is successful', () => {
      const response = login('admin', 'admin');
      expect(response.token).toBeDefined();
      expect(response.email).toBe('email5');
    });
  });
});
