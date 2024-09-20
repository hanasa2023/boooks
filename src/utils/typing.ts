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
  sign: string
  listName: string
}

// {
//   "code": 200,
//   "message": "success",
//   "data": {
//     "content": [
//       {
//         "name": "hxy",
//         "size": 0,
//         "is_dir": true,
//         "modified": "2024-09-20T19:09:36.912920863+08:00",
//         "created": "2024-09-20T19:08:25.942139983+08:00",
//         "sign": "",
//         "thumb": "",
//         "type": 1,
//         "hashinfo": "null",
//         "hash_info": null
//       }
//     ],
//     "total": 1,
//     "readme": "",
//     "header": "",
//     "write": false,
//     "provider": "Local"
//   }
// }

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
