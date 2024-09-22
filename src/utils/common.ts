import axios from 'axios'
import { FSData, TokenResponse } from './typing'
import { useListStore, useUserStore } from '../state'

export async function getToken(): Promise<void> {
  const res = await axios.post('/api/auth/login', {
    username: 'boooks',
    password: '2022151701',
  })

  const tokenResponse: TokenResponse = res.data
  useUserStore().token = tokenResponse.data.token
}

export async function getLists(): Promise<void> {
  const res = await axios.post('api/fs/list', {
    path: '/123/local/books',
  })
  const listsData: FSData[] = res.data.data.content
  useListStore().list = []
  listsData.forEach((d) => {
    if (d.is_dir) useListStore().list.push(d.name)
  })
}

export async function findFilesByList(listName: string): Promise<FSData[]> {
  const res = await axios.post('/api/fs/list', {
    path: listName,
    password: '',
  })
  const fileList: FSData[] = []
  const list: FSData[] = res.data.data.content
  list.forEach((d) => {
    if (!d.is_dir) fileList.push(d)
  })
  return fileList
}
