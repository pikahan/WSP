import { myFilter  } from '../helper'

test('should fetch users', () => {
  expect(myFilter()).toBe(1)

  // or you could use the following depending on your use case:
  // axios.get.mockImplementation(() => Promise.resolve(resp))

});
