import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
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
      <Blog blog={blog} />
    )

    component.debug()
    const div = component.container.querySelector('.blogname')

    expect(div).toHaveTextContent(
      'Component testing is done with react-testing-library'
    )

  })
  test('calls eventhandler twice if button pressed twice', () => {
    const mockHandler = jest.fn()

    const { getByText } = render(
      <Blog blog={blog} updateLikes={mockHandler} />
    )

    const button = getByText('like')

    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(2)
  })

  test('advanced blog shown when title is clicked', () => {
    component = render(
      <Blog blog={blog} />
    )
    const title = component.container.querySelector('.blogname')
    fireEvent.click(title)

    const div = component.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })
})