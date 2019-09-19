import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
  let component

  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Testy Test',
    likes: 0
  }

  /*
  beforeEach(() => {
    component = render(
      <SimpleBlog blog={blog} />
    )
  })
*/
  test('renders content', () => {
    component = render(
      <SimpleBlog blog={blog} />
    )
    const div = component.container.querySelector('.info')
    const likes = component.container.querySelector('.likeAmount')

    expect(div).toHaveTextContent(
      'Component testing is done with react-testing-library'
    )
    expect(likes).toHaveTextContent(
      'blog has 0 likes'
    )
  })

  test('calls eventhandler twice if button pressed twice', () => {
    const mockHandler = jest.fn()

    const { getByText } = render(
      <SimpleBlog blog={blog} onClick={mockHandler} />
    )
    const button = getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})