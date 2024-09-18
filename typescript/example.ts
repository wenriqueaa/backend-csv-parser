let isAviable: boolean = true;
const quantity: number = 10;
const productName: string = "Laptop"

let notInicialized : undefined;
let nothing: null;

// definiendo en un arreglo
let notes: number[] = [4.5, 3.2, 3.8];

//definiendo tuplas
let product: [string, number, number] = ["apple", 2.99, 4]

//definiendo funciones
const multiply = (a : number, b : number): number => {
    return a * b
}

//llamando la funcion
const variablenumber : number = multiply(2, 4.5)

//comodin
let myVariable: any = "valor inicial";


//funcion que no usa return
const noReturn = (): void => {
    console.log("no vale Hola")
}

//funcion que devuelva el promedio de dos numeros
const promedio = (a : number, b: number): number => {
    return (a + b) /2
}

//interfaces
interface User {
    email: string, 
    password: string
}

let myUser: User = {
    email: "maria.m.florez@gmail.com",
    password: "contraseña"
}