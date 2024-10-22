export default class UserModel {
    Id?: number;
    Email?: string;
    Name?: string;
    CalorieTarget?: number;
    Height?: string;
    Weight?: string;


    constructor(obj: any) {
        this.Id = obj.Id;
        this.Email = obj.Email;
        this.Name = obj.Name;
        this.CalorieTarget = obj.CalorieTarget;
        this.Height = obj.Height;
        this.Weight = obj.Weight;
    }
}