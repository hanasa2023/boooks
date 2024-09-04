<template>
  <div :class="relativeBg">
    <v-container class="d-flex justify-center align-center h-100">
      <v-row>
        <v-col>
          <v-btn color="blue" @click="onUploadBook()">Upload book</v-btn>
        </v-col>
        <v-col>
          <v-btn color="red" @click="onDeleteBook()">Delete book</v-btn>
        </v-col>
        <v-col>
          <v-btn color="yellow" @click="onCreateList()">Create new list</v-btn>
        </v-col>
        <v-col>
          <v-btn color="green" @click="onDeleteAllBooksInList()"
            >Delete all books in list(include list)</v-btn
          >
        </v-col>
      </v-row>
      <v-overlay
        v-model="overlay"
        class="justify-center align-center"
        contained
      >
        <v-sheet class="mx-auto px-2 py-2" width="300" rounded="lg">
          <v-form v-if="overlayState == ManageButton.UploadBook">
            <v-file-input
              v-model="files"
              label="books"
              placeholder="Add books whatever u want to upload"
              prepend-icon="mdi-paperclip"
              :rules="bookRule"
              multiple
            ></v-file-input>
            <v-file-input
              v-model="imgs"
              label="book imgs"
              placeholder="Add book imgs for the books"
              prepend-icon="mdi-check"
              :rules="imgRule"
              multiple
            ></v-file-input>
            <v-select
              v-model="selectList"
              label="Lists"
              :items="useListStore().list"
            ></v-select>
            <v-btn color="blue" block @click="onUploadBookSubmit()"
              >Submit</v-btn
            >
          </v-form>
          <v-form v-else-if="overlayState == ManageButton.DeleteBook">
            <v-text-field
              v-model="bookName"
              label="book name"
              required
            ></v-text-field>
            <v-btn color="red" block @click="onDeleteBookSubmit()"
              >Submit</v-btn
            >
          </v-form>
          <v-form v-else-if="overlayState == ManageButton.CreateNewList">
            <v-text-field
              v-model="listName"
              label="new list name"
              required
            ></v-text-field>
            <v-btn color="yellow" block @click="onCreateListSubmit()"
              >Submit</v-btn
            >
          </v-form>
          <v-form v-else-if="overlayState == ManageButton.DeleteAllBooksInList">
            <v-text-field
              v-model="listName"
              label="list name"
              required
            ></v-text-field>
            <v-btn color="green" block @click="onDeleteAllBooksInListSubmit()"
              >Submit</v-btn
            >
          </v-form>
        </v-sheet>
      </v-overlay>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { computed, ref, watch } from 'vue'
import { ManageButton } from '../utils/typing'
import { getLists } from '../utils/common'
import { useListStore } from '../state'
import { useDisplay } from 'vuetify'

const { name } = useDisplay()

const relativeBg = computed<string>(() => {
  switch (name.value) {
    case 'xs':
      return 'bg-mobile bg'
    case 'sm':
      return 'bg-desktop bg'
    case 'md':
      return 'bg-desktop bg'
    case 'lg':
      return 'bg-desktop bg'
    case 'xl':
      return 'bg-desktop bg'
    case 'xxl':
      return 'bg-desktop bg'
  }
})

const overlay = ref<boolean>(false)
const overlayState = ref<ManageButton>(ManageButton.Null)
const bookName = ref<string>('')
const listName = ref<string>('')
const selectList = ref<string>('')
const files = ref<File[]>([])
const imgs = ref<File[]>([])

const imgRule = [
  (value: File[]) => {
    if (files.value.length != imgs.value.length)
      return 'The length of book img should be the same as book'
    const imgsName: string[] = []
    const booksName: string[] = []
    let flag: boolean = true
    value.forEach((img) => {
      imgsName.push(img.name.substring(0, img.name.lastIndexOf('.')))
    })
    files.value.forEach((file) => {
      booksName.push(file.name.substring(0, file.name.lastIndexOf('.')))
    })
    booksName.forEach((fileName) => {
      if (!imgsName.includes(fileName)) flag = false
    })
    return flag || 'The length of book img should be the same as book'
  },
]

const bookRule = [
  (value: File[]) => {
    return value.length != 0 || 'Should add at least a book'
  },
]

function onUploadBook() {
  overlayState.value = ManageButton.UploadBook
  overlay.value = true
}

async function onUploadBookSubmit() {
  const formData = new FormData()
  files.value.forEach((file) => {
    formData.append('books', file)
  })
  const imgFormData = new FormData()
  imgs.value.forEach((img) => {
    imgFormData.append('imgs', img)
  })
  const result = await axios.postForm('/apis/v1/books/create', formData, {
    headers: {
      'List-Name': selectList.value,
    },
  })

  const resultImg = await axios.postForm(
    '/apis/v1/books/uploadImg',
    imgFormData,
    {
      headers: {
        'List-Name': selectList.value,
      },
    }
  )

  if (result.status === 200 && resultImg.status === 200) {
    files.value = []
    imgs.value = []
    selectList.value = ''
    alert(`${result.data.msg}\n${resultImg.data.msg}`)
  }
}

function onDeleteBook() {
  overlayState.value = ManageButton.DeleteBook
  overlay.value = true
}

async function onDeleteBookSubmit() {
  const result = await axios.post('/apis/v1/books/delete', {
    bookName: bookName.value,
  })
  if (result.status === 200) {
    bookName.value = ''
    alert(result.data.msg)
  }
}

function onCreateList() {
  overlayState.value = ManageButton.CreateNewList
  overlay.value = true
}

async function onCreateListSubmit() {
  const result = await axios.post('/apis/v1/lists/create', {
    listName: listName.value,
  })
  if (result.status === 200) {
    await getLists()
    listName.value = ''
    alert(result.data.msg)
  }
}

function onDeleteAllBooksInList() {
  overlayState.value = ManageButton.DeleteAllBooksInList
  overlay.value = true
}

async function onDeleteAllBooksInListSubmit() {
  const result = await axios.post('/apis/v1/lists/delete', {
    listName: listName.value,
  })
  if (result.status === 200) {
    await getLists()
    listName.value = ''
    alert(result.data.msg)
  }
}

watch(overlayState, () => {
  bookName.value = ''
  listName.value = ''
  selectList.value = ''
  files.value = []
})
</script>

<style scoped>
.bg {
  display: flex;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}
.bg-desktop {
  background-image: url('../assets/mzk-1.png');
  background-size: cover;
}

.bg-mobile {
  background-image: url('../assets/arona.png');
  background-size: cover;
}
</style>
