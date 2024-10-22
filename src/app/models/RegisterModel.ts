export default class RegisterModel {
    Email?: string;
    Password?: string;
    Height?: string;
    CalorieTarget?: string;
    Name?: string;
    Weight?: string;


    constructor(obj: any) {
        this.Email = obj.Email;
        this.Name = obj.Name;
        this.CalorieTarget = obj.CalorieTarget;
        this.Height = obj.Height;
        this.Weight = obj.Weight;
        this.Password = obj.Password;
    }
}