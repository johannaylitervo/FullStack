const blogs = [
  {
    id: '5d7ba1ac56fcdf41673e12b6',
    title: 'Fletkumatojen ruokinta',
    author: 'Hagrid',
    url: 'tylypahka.com/fletkumadot',
    likes: 2,
    user: '5d6d2f06acb2da4e88f61066',
  },
  {
    id: '5d7ba1e356fcdf41673e12b7',
    title: 'Where to find them dragons',
    author: 'Hagrid',
    url: 'tylypahka.com/takingcare',
    likes: 8,
    user: '5d6d2f06acb2da4e88f61066',
  },
  {
    id: '5d89c55821c1335decce2e1a',
    title: 'Hiinokan hoito-ohje',
    author: 'Hagrid',
    url: 'www.tylypahka.com/hiinokanpaivakirja',
    likes: 0,
    user: '5d6d2f06acb2da4e88f61066',
  }
]

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}
const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll, setToken }