// Inheritance

class Man {
  constructor(name) {
    this.name = name;
  }
  walk() {
    return this.name + " - walk";
  }
  eat() {
    return this.name + " - eat";
  }
  drink() {
    return this.name + " - drink";
  }
}

class Soldier extends Man {
  constructor(name, rank) {
    super(name);
    this.rank = rank;
  }
  shoot() {
    return `${this.rank} ${this.name} - shot`;
  }
}

class Doctor extends Man {
  constructor(name, position) {
    super(name);
    this.position = position;
  }
  cure() {
    return `${this.position} ${this.name} - cure`;
  }
}

const soldier1 = new Soldier("John", "major sergeant");
const soldier2 = new Soldier("Bet", "captain");

document.write(soldier1.shoot() + "<br\><hr\>");
document.write(soldier2.eat() + "<br><hr>");

// Polimorphism

class Dentist extends Doctor {
  constructor(name, position) {
    super(name, position);
}
  cure() {
    return `${this.position} ${this.name} - treat teeth`;
  }
}

const doctor1 = new Doctor("Paul", "therapist");

class Surgeon extends Doctor {
  constructor(name, position) {
    super(name, position);
  }
  cure() {
    return `${this.position} ${this.name}  - perform operations`;
  }
}

const doctor2 = new Dentist("Sam", "orthodontist");
const doctor3 = new Surgeon("Sue", "traumatologist");

document.write(doctor1.cure() + "<br><hr>");
document.write(doctor2.cure() + "<br><hr>");
document.write(doctor3.cure() + "<br><hr>");