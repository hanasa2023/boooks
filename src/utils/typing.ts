export interface TokenData {
  token: string
}

export interface TokenResponse {
  code: number
  message: string
  data: TokenData
}

export interface BookData {
  name: string
  listName: string
  sign: string
  thumbSign: string
}

export interface FSData {
  name: string
  size: number
  is_dir: boolean
  modified: string
  created: string
  sign: string
  thumb: string
  type: number
  hashinfo: string
  hash_info: string
}

export enum ManageButton {
  Null = 0,
  UploadBook = 1,
  DeleteBook = 2,
  CreateNewList = 3,
  DeleteAllBooksInList = 4,
}
