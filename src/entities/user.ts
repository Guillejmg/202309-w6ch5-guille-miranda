export type LoginUser = {

  userName:string, // Este puede ser el email 
  passwd:string
}

export type User = LoginUser & {
  
  id: string,
  name:string, // El nombre real
  surname:string, // String lo cambiamos por User y asi establecemos la relacion con el squema
  age:number,
  notes: Notes[], // Esto lo he implementado cuando ya he decidico que los usuarios tendran notes de la coleccion notes y que sera una relacion n
}
