import { Timestamp } from "@angular/fire/firestore";
import RecordModel from "./RecordModel";

export default class DiaryModel {
    Id?: string;
    UserId?: string;
    Date?: Timestamp;
    Day?: string;
    Month?: string;
    Year?: string;
    Records: RecordModel[] = [];
}