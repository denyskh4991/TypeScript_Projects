class School {
  _areas: Area[] = [];
  _lecturers: {
    name: string;
    surname: string;
    position: string;
    company: string;
    experience: number;
    courses: string[];
    contacts: string[];
    fullName: string;
  }[] = [];

  addArea(area: Area): void {
    this._areas.push(area);
  }

  removeArea(areaName: string): void {
    this._areas = this._areas.filter(area => area.name !== areaName);
  }

  addLecturer({ name, surname, position, company, experience, courses, contacts }: {
    name: string,
    surname: string,
    position: string,
    company: string,
    experience: number,
    courses: string[],
    contacts: string[]
  }): void {
    const lecturer = {
      name,
      surname,
      position,
      company,
      experience,
      courses,
      contacts,
      fullName: `${surname} ${name}`
    };
    this._lecturers.push(lecturer);
  }

  get areas() {
    return this._areas;
  }

  get lecturers() {
    return this._lecturers;
  }
}

class Area {
  _levels: Level[] = [];
  _name: string;

  constructor(name: string) {
    this._name = name;
  }

  get name(): string {
    return this._name;
  }
}

class Level {

  _groups: Group[] = [];
  _name: string;
  _description: string;

  constructor(name: string, description: string) {
    this._name = name;
    this._description = description;
  }

  addGroup(group: Group): void {
    this._groups.push(group);
  }

  removeGroup(groupName: string): void {
    this._groups = this._groups.filter(group => group.directionName !== groupName);
  }
}

class Group {

  _area: Area | null = null;
  _status: string | null = null;
  _students: Student[] = [];
  _directionName: string;
  _levelName: string;

  static STATUS_ACTIVE: string = 'active';
  static STATUS_INACTIVE: string = 'inactive';

  constructor(directionName: string, levelName: string) {
    this._directionName = directionName;
    this._levelName = levelName;
  }

  addStudent(student: Student): void {
    this._students.push(student);
  }

  removeStudent(studentName: string): void {
    this._students = this._students.filter(student => student.fullName !== studentName);
  }

  setStatus(status: string): void {
    if (status === Group.STATUS_ACTIVE || status === Group.STATUS_INACTIVE) {
      this._status = status;
    } else {
      throw new Error('Invalid status');
    }
  }

  showPerformance(): Student[] {
    return [...this._students].sort((a, b) => b.getPerformanceRating() - a.getPerformanceRating());
  }

  get directionName(): string {
    return this._directionName;
  }

  get levelName(): string {
    return this._levelName;
  }

  get status(): string | null {
    return this._status;
  }

  get students(): Student[] {
    return this._students;
  }

  set area(area: Area | null) {
    this._area = area;
  }

  get area(): Area | null {
    return this._area;
  }
}

class Student {

  _firstName: string;
  _lastName: string;
  _birthYear: number;
  _grades: { workName: string; mark: number }[] = [];
  _visits: { lesson: string; present: boolean }[] = [];

  constructor(firstName, lastName, birthYear) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._birthYear = birthYear;
  }

  get fullName(): string {
    return `${this._lastName} ${this._firstName}`;
  }

  set fullName(value: string) {
    [this._lastName, this._firstName] = value.split(' ');
  }

  get age(): number {
    return new Date().getFullYear() - this._birthYear;
  }

  getPerformanceRating(): number {
    const gradeValues = Object.keys(this._grades).map(key => this._grades[key]);

    if (!gradeValues.length) return 0;

    const averageGrade = this._grades.reduce((sum: number, grade: { workName: string; mark: number }) => sum + grade.mark, 0) / this._grades.length;
    const attendancePercentage = (this._visits.filter(visit => visit.present === true).length / this._visits.length) * 100;

    return (averageGrade + attendancePercentage) / 2;
  }

  setGrade(workName: string, mark: number): void {
    if (mark < 0 || mark > 100) {
      throw new Error('The mark should be in the range from 0 to 100');
    }
    this._grades[workName] = mark;
  }

  setVisit(lesson: string, present: boolean): void {
    this._visits[lesson] = present;
  }
}