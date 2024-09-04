import axios from 'axios'
import { ListData } from './typing'
import { useListStore } from '../state'

export async function getLists() {
  const data = await axios.post('/apis/v1/lists/all')
  const listsData: ListData[] = data.data
  useListStore().list = []
  listsData.forEach((d) => {
    useListStore().list.push(d.name)
  })
}
