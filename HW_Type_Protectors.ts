type EmployeeStatus = 'active' | 'inactive' | 'unpaid_leave';

interface PreHiredEmployee {
    firstName: string;
    lastName: string;
    salary: number;
    bankAccount: string;
}

interface Employee extends PreHiredEmployee {
    paymentInfo: string;
    status: EmployeeStatus;
    department: Department;
}

interface Budget {
    debit: number;
    credit: number;
}

interface Department {
    name: string;
    domain: string;
    employees: Employee[];
    budget: Budget;

    calculateBalance(): number;
    addEmployee(employee: Employee): void;
    removeEmployee(employee: Employee): void;
    promoteToEmployee(preHired: PreHiredEmployee): Employee;
}

class Company {
    name: string;
    departments: Department[];
    preHiredEmployees: PreHiredEmployee[];
    allEmployees: (Employee | PreHiredEmployee)[];

    constructor(name: string, departments: Department[], preHiredEmployees: PreHiredEmployee[]) {
        this.name = name;
        this.departments = departments;
        this.preHiredEmployees = preHiredEmployees;
        this.allEmployees = [].concat(...departments.map(d => d.employees), preHiredEmployees);
    }
}

class Accounting implements Department {
    name: string;
    domain: string;
    employees: Employee[];
    budget: Budget;
    balance: number;

    constructor(name: string, domain: string, budget: Budget) {
        this.name = name;
        this.domain = domain;
        this.employees = [];
        this.budget = budget;
        this.balance = this.calculateBalance();
    }

    calculateBalance(): number {
        return this.budget.credit - this.budget.debit;
    }

    addEmployee(employee: Employee): void {
        this.employees.push(employee);
        this.updateBalanceForEmployee(employee);
    }

    removeEmployee(employee: Employee): void {
        this.employees = this.employees.filter(emp => emp !== employee);
    }

    promoteToEmployee(preHired: PreHiredEmployee): Employee {
        const newEmployee: Employee = {
            ...preHired,
            paymentInfo: 'internal',
            status: 'active',
            department: this,
        };
        this.addEmployee(newEmployee);
        return newEmployee;
    }

    updateBalanceForEmployee(employee: Employee): void {
        if (employee.status === 'active') {
            this.budget.debit += employee.salary;
        }
    }

    paySalaries(): void {
        this.employees
            .filter(employee => employee.status === 'active')
            .forEach(employee => {
                this.budget.debit += employee.salary;
            });
    }
}