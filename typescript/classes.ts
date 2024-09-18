class Person {
    name: string
    age: number

    constructor(name: string, age: number) {
        this.name = name
        this.age = age
    }

    saludar(): void {
        console.log(`hola!! mi nombres es:${this.name} y tengo ${this.age}`)
    }

}


const manuel = new Person("manuel Agudelo", 21)
const lina = new Person("Lina Peña", 18)
console.log(manuel)
console.log(lina)

manuel.saludar()
lina.saludar()

class Animals {
    name: string
    movibilidad: string
    alimentacion: string
    reproduccion: string

    constructor(name: string, movibilidad: string, alimentacion: string, reproduccion: string) {
        this.name = name
        this.movibilidad = movibilidad
        this.alimentacion = alimentacion
        this.reproduccion = reproduccion
    }

    DefineAnimals(): void {
        console.log(`hola!! ${this.name} y movibilidad es ${this.movibilidad}, con alimentacion ${this.alimentacion}`)
    }
}

//manejo de herencia clase Empleado hereda la clase Person
class Empleado extends Person {
    cargo: string
    salario: number

    constructor(name: string, age: number, cargo: string, salario:number){
        super(name , age)
        this.cargo = cargo
        this.salario = salario
    }
}

const Juliana = new Empleado("Juliana", 15, "Developer", 15674343)
console.log(Juliana)
Juliana.saludar()

//manejo herencia animal
class Mamifero extends Animals {
    habitat: string
    patas: number

    constructor(name: string, movibilidad: string, alimentacion: string, reproduccion: string, habitat: string, patas:number){
        super(name, movibilidad, alimentacion, reproduccion)
        this.habitat = habitat
        this.patas = patas
    }
}
