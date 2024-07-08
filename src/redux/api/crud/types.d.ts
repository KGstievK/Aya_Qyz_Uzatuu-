namespace TODO {
  interface ProductType {
    _id?: number,
    name: string,
    dev: string,
    partner: string,
    comment: string,
  }
  type GetResponse = ProductType[]
  type GetRequest = void
  
  type PostResponse = ProductType[]
  type PostRequest = ProductType
}
