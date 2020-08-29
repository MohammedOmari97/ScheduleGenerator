const { generateTimes } = require("./generateTimes");

function deepClone(obj) {
  if (obj === null || typeof obj !== "object") return obj;
  var props = Object.getOwnPropertyDescriptors(obj);
  for (var prop in props) {
    props[prop].value = deepClone(props[prop].value);
  }
  return Object.create(Object.getPrototypeOf(obj), props);
}

export class Subject {
  constructor(name, teacher, hpw, level) {
    this.name = name;
    this.teacher = teacher;
    this.hpw = hpw;
    this.level = level;
    // this.subClasses = subClasses;
    let { days, startTime, endTime } = generateTimes(this.hpw);
    this.startTime = startTime;
    this.endTime = endTime;
    this.days = [...days];
  }

  overlap(subject) {
    // time overlap and days overlap
    let timeOverlap =
      Math.max(
        times.indexOf(this.startTime),
        times.indexOf(subject.startTime)
      ) <
        Math.min(times.indexOf(this.endTime), times.indexOf(subject.endTime)) &&
      this.days.filter((day) => subject.days.includes(day)).length != 0;

    let teacherOverlap = this.teacher === subject.teacher;

    let levelOverlap = this.level === subject.level;

    return (timeOverlap && teacherOverlap) || (timeOverlap && levelOverlap);
  }
}

class Timetable {
  constructor() {
    this.subjects = [];
    this.fitness = 0;
  }

  pushSubject(subject) {
    this.subjects.push(subject);
  }

  clear() {
    this.subjects = [];
  }

  evaluate() {
    for (let i = 0; i < this.subjects.length; i++) {
      for (let j = 0; j < i; j++) {
        if (this.subjects[i].overlap(this.subjects[j])) this.fitness++;
      }
    }
  }

  crossover(parent) {
    const random = Math.floor(Math.random() * this.subjects.length);
    const firstHalf = this.subjects.slice(0, random);
    const secondHalf = parent.subjects.slice(random);
    const childSubjects = firstHalf.concat(secondHalf);
    const childTimetable = new Timetable();
    childTimetable.subjects = childSubjects;
    return childTimetable;
  }

  mutation() {
    let randomSubject = this.subjects[
      Math.floor(Math.random() * this.subjects.length)
    ];
    let { days, startTime, endTime } = generateTimes(randomSubject.hpw);
    randomSubject.days = [...days];
    randomSubject.startTime = startTime;
    randomSubject.endTime = endTime;
  }
}

export class Population {
  constructor(subjects = [], popSize) {
    this.population = [];
    this.matingpool = [];
    this.found = false;
    this.result = null;

    let subjectsTemp = deepClone(subjects);
    for (let j = 0; j < popSize; j++) {
      let timetable = new Timetable();
      subjectsTemp = deepClone(subjects);

      for (let i = 0; i < subjectsTemp.length; i++) {
        let { days, startTime, endTime } = generateTimes(subjectsTemp[i].hpw);
        subjectsTemp[i].days = [...days];
        subjectsTemp[i].startTime = startTime;
        subjectsTemp[i].endTime = endTime;
        timetable.pushSubject(subjectsTemp[i]);
      }
      this.population.push(timetable);
    }
    let i = 0;
    while (true) {
      console.log(i++);
      let maxFit = Infinity;
      for (let i = 0; i < this.population.length; i++) {
        this.population[i].evaluate();
        if (this.population[i].fitness === 0) {
          this.found = true;
          this.result = this.population[i];
          // console.log(this.population[i]);
          // console.log(JSON.stringify(this.population[i], null, 2));
        }

        if (this.population[i].fitness < maxFit) {
          maxFit = this.population[i].fitness;
        }
      }

      // console.log(JSON.stringify(this.population[0], null, 2));

      if (this.found) break;

      for (let i = 0; i < this.population.length; i++) {
        this.population[i].fitness = maxFit / this.population[i].fitness;
      }

      for (let i = 0; i < this.population.length; i++) {
        let n = Math.floor(this.population[i].fitness * 10);
        for (let j = 0; j < n; j++) {
          this.matingpool.push(this.population[i]);
        }
      }

      let newPop = [];

      for (let i = 0; i < popSize; i++) {
        let child = this.selection();
        if (child.fitness === 0) {
          this.found = true;
          this.result = child;
          // console.log(JSON.stringify(child, null, 2));
        } else {
          newPop.push(child);
        }
      }

      if (this.found) break;
      // console.log(JSON.stringify(child, null, 2));
      this.population = [];
      this.population = deepClone(newPop);
      this.matingpool = [];
    }
  }

  selection() {
    let parentA = this.matingpool[
      Math.floor(Math.random() * this.matingpool.length)
    ];
    let parentB = this.matingpool[
      Math.floor(Math.random() * this.matingpool.length)
    ];
    let child = parentA.crossover(parentB);
    child.mutation();
    child.evaluate();
    return child;
  }
}

// let subject1 = new Subject("web", "hammad", 3, 2);
// let subject6 = new Subject("web-1", "TA1", 1, 2);

// let subject2 = new Subject("OS", "hammad", 3, 2);
// let subject7 = new Subject("OS-1", "TA1", 1, 2);

// let subject3 = new Subject("DB", "hammad", 3, 2);
// let subject8 = new Subject("DB-1", "TA2", 1, 2);

// let subject4 = new Subject("DS", "hammad", 3, 2);
// let subject9 = new Subject("DS-1", "TA2", 1, 2);

// let subject5 = new Subject("Java", "hammad", 3, 2);
// let subject10 = new Subject("Java-1", "TA3", 1, 2);

const times = [8, 9, 9.5, 10, 11, 12, 12.5, 1, 2, 3, 4, 5, 6, 7];

// const pop = new Population(
//   [
//     subject1,
//     subject2,
//     subject3,
//     subject4,
//     subject5,
//     subject6,
//     subject7,
//     subject8,
//     subject9,
//     subject10,
//   ],
//   5
// );

// pop.result.subjects.map((subject) => {
//   subject.days = Array.from(subject.days);
//   return subject;
// });

// console.log(JSON.stringify(pop.result, null, 2));
