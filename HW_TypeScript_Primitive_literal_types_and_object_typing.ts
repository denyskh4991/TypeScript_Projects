class School {
  _areas = [];
  _lecturers = [];

  addArea(area) {
    this._areas.push(area);
  }

  removeArea(areaName) {
    this._areas = this._areas.filter(area => area.name !== areaName);
  }

  addLecturer({ name, surname, position, company, experience, courses, contacts }) {
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

  removeLecturer(lecturerName) {
    this._lecturers = this._lecturers.filter(
        lecturer => lecturer.fullName !== lecturerName
    );
  }

  get areas() {
    return this._areas;
  }

  get lecturers() {
    return this._lecturers;
  }
}

class Area {
  _levels = [];
  _name;

  constructor(name) {
    this._name = name;
  }
}

class Level {

  _groups;
  _name;
  _description;

  constructor(name, description) {
    this._name = name;
    this._description = description;
  }

  addGroup(group) {
    this._groups.push(group);
  }

  removeGroup(groupName) {
    this._groups = this._groups.filter(group => group.directionName !== groupName);
  }
}

class Group {

  _area;
  _status;
  _students = []; // Modify the array so that it has a valid toSorted method*
  _directionName;
  _levelName;

  static STATUS_ACTIVE = 'active';
  static STATUS_INACTIVE = 'inactive';

  constructor(directionName, levelName) {
    this._directionName = directionName;
    this._levelName = levelName;
  }

  addStudent(student) {
    this._students.push(student);
  }

  removeStudent(studentName) {
    this._students = this._students.filter(student => student.fullName !== studentName);
  }

  setStatus(status) {
    if (status === Group.STATUS_ACTIVE || status === Group.STATUS_INACTIVE) {
      this._status = status;
    } else {
      throw new Error('Invalid status');
    }
  }

  showPerformance() {
    return [...this._students].sort((a, b) => b.getPerformanceRating() - a.getPerformanceRating());
  }

  get directionName() {
    return this._directionName;
  }

  get levelName() {
    return this._levelName;
  }

  get status() {
    return this._status;
  }

  get students() {
    return this._students;
  }

  set area(area) {
    this._area = area;
  }

  get area() {
    return this._area;
  }
}

class Student {

  _firstName;
  _lastName;
  _birthYear;
  _grades = [];
  _visits = [];

  constructor(firstName, lastName, birthYear) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._birthYear = birthYear;
  }

  get fullName() {
    return `${this._lastName} ${this._firstName}`;
  }

  set fullName(value) {
    [this._lastName, this._firstName] = value.split(' ');
  }

  get age() {
    return new Date().getFullYear() - this._birthYear;
  }

  getPerformanceRating() {
    const gradeValues = Object.values(this._grades);

    if (!gradeValues.length) return 0;

    const averageGrade = gradeValues.reduce((sum, grade) => sum + grade, 0) / gradeValues.length;
    const attendancePercentage = (this._visits.filter(present => present).length / this._visits.length) * 100;

    return (averageGrade + attendancePercentage) / 2;
  }

  setGrade(workName, mark) {
    if (mark < 0 || mark > 100) {
      throw new Error('The mark should be in the range from 0 to 100');
    }
    this._grades[workName] = mark;
  }

  setVisit(lesson, present) {
    this._visits[lesson] = present;
  }
}