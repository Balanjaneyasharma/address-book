// import { v4 as uuidv4 } from 'uuid';
export class Address{
  readonly id !: string;
  name : string;
  email : string;
  phoneNumber : number;
  landline : number;
  website : string;
  address: string;

  constructor(name : string , email : string , phoneNumber:number , landline: number , website : string , address: string){
    // this.id = uuidv4();
    this.name = name;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.landline = landline;
    this.website = website;
    this.address = address;
  } 
}