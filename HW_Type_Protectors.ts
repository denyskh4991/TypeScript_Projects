enum EmployeeStatus {
    Active = 'active',
    Inactive = 'inactive',
    UnpaidLeave = 'unpaid_leave',
}

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
    addEmployee(employee: Employee | PreHiredEmployee): void;
    removeEmployee(employee: Employee): void;
    promoteToEmployee(preHired: PreHiredEmployee): Employee;
}

class BaseDepartment implements Department {
    name: string;
    domain: string;
    employees: Employee[];
    budget: Budget;

    constructor(name: string, domain: string, budget: Budget) {
        this.name = name;
        this.domain = domain;
        this.employees = [];
        this.budget = budget;
    }

    calculateBalance(): number {
        return this.budget.credit - this.budget.debit;
    }

    addEmployee(employee: Employee | PreHiredEmployee): void {
        if ('status' in employee) {
            this.employees.push(employee);
            this.updateBalanceForEmployee(employee);
        } else {
            const newEmployee = this.promoteToEmployee(employee);
            this.employees.push(newEmployee);
            this.updateBalanceForEmployee(newEmployee);
        }
    }

    removeEmployee(employee: Employee): void {
        this.employees = this.employees.filter(emp => emp !== employee);
    }

    promoteToEmployee(preHired: PreHiredEmployee): Employee {
        const newEmployee: Employee = {
            ...preHired,
            paymentInfo: 'internal',
            status: EmployeeStatus.Active,
            department: this,
        };
        return newEmployee;
    }

    updateBalanceForEmployee(employee: Employee): void {
        if (employee.status === EmployeeStatus.Active) {
            this.budget.debit += employee.salary;
        }
    }
}

class AccountingDepartment extends BaseDepartment {
    balance: number;

    constructor(name: string, domain: string, budget: Budget) {
        super(name, domain, budget);
        this.balance = this.calculateBalance();
    }

    paySalaries(): void {
        this.employees
            .filter(employee => employee.status === EmployeeStatus.Active)
            .forEach(employee => {
                this.budget.debit += employee.salary;
            });
    }
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