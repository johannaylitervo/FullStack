import React from 'react'
import { render,  waitForElement, fireEvent } from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  test('if user isnt logged, blogs are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('login')
    )
    /** Checking that when login button is clicked, login form appears */
    const login = component.getByText('login')
    fireEvent.click(login)

    await waitForElement(
      () => component.getByText('Login to application')
    )

    const div = component.container.querySelector('.loginForm')
    expect(div).toBeDefined()

    /** When user isn't logged in, any blogs aren't shown */
    const blogs = await component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(0)

  })

  test('if user is logged in, blogs are shown', async () => {
    /**Test user logged in */
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    }

    localStorage.setItem('loggedBloglistUser', JSON.stringify(user))

    const component = render(
      <App />
    )
    component.rerender(<App />)
    /** Fetching all blogs */
    await waitForElement(
      () => component.container.querySelector('.blog')
    )
    //component.debug()
    const blogs = await component.container.querySelectorAll('.blog')

    expect(blogs.length).toBe(3)

  })

})