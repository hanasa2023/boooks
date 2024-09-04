export interface BookData {
  id: number
  name: string
  listName: string
  fullName: string
}

export interface ListData {
  id: number
  name: string
}

export enum ManageButton {
  Null = 0,
  UploadBook = 1,
  DeleteBook = 2,
  CreateNewList = 3,
  DeleteAllBooksInList = 4,
}
