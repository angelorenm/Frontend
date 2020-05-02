export class User{
    constructor(
        public _id: string,
        public nombre: string, 
        public email: string, 
        public password: string, 
        public imagen: string, 
        public telefono: string, 
        public bio: string, 
        public facebook: string, 
        public twitter: string, 
        public estado: boolean,
    ){

    }
}