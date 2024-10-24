import { DocumentData, Timestamp } from "@angular/fire/firestore";
import RecordModel from "./RecordModel";

export default class DiaryModel {
    Id?: string;
    UserId?: string;
    Date?: Timestamp;
    Day?: string;
    Month?: string;
    Year?: string;
    Records: RecordModel[] = [];


    constructor(obj: any) {
        this.Id = obj["Id"];
        this.UserId = obj["UserId"];
        this.Date = new Timestamp(obj["Date"].seconds, obj["Date"].nanoseconds);
        this.Day = obj["Day"];
        this.Month = obj["Month"];
        this.Year = obj["Year"];
        this.Records = obj["Records"];
    }
}