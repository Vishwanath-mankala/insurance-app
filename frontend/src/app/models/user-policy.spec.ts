import { UserPolicy } from './user-policy';
import { Policy } from './policy';

describe('UserPolicy', () => {
  it('should create an instance', () => {
    const policy = new Policy('p1', new Date(), 'd', 'C', 'T', 100, 12, 1000);
    const up = new UserPolicy('1', 'u1', policy, '2024-01-01', '2024-12-31', 100, 'active');
    expect(up).toBeTruthy();
  });
});
