import { UserPolicyAdmin } from './user-policy-admin';

describe('UserPolicyAdmin', () => {
  it('should create an instance', () => {
    const u = new UserPolicyAdmin('1', 'p1', 'active', 100, 'u1', '2024-01-01', '2024-12-31', { name: 'N', relation: 'Self' }, '2024-01-01');
    expect(u).toBeTruthy();
  });
});
