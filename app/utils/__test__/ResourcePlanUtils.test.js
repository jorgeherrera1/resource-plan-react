import {xyz} from '../ResourcePlanUtils';

test('just a simple test', () => {
  expect(xyz(new Date(), 5)).toBe(3);
});