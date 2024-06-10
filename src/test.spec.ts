// if imported from `@testing-library/user-event'
// we intercept it to use CDP under the hood instead
import { userEvent } from '@vitest/browser/context'
import { findByText } from '@testing-library/dom'

it('clicks correctly', async () => {
  await userEvent.click(await findByText('Click'))
})
