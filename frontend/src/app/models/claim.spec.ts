import { Claim } from './claim';

describe('Claim', () => {
  it('should create an instance', () => {
    const c = new Claim('1', 'u1', { policyProductId: 'p1' }, '2024-01-01', 'desc', 100, 'PENDING');
    expect(c).toBeTruthy();
  });
});
