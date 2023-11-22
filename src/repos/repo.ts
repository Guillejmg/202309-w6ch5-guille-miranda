export interface Repository <x extends {id:unknown}> {
  getAll():Promise<x[]>;
  getById(_id: x['id']):Promise<x>;
  create(_newItem:Omit<x,'id'>):Promise<x>;
  update(_id:x['id'], _updatedItem: Partial<x>):Promise<x>;
  delete(_id:x['id']): Promise<void>
}
