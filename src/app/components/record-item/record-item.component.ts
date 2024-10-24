import { Component, inject, Input, OnInit } from '@angular/core';
import DiaryModel from 'src/app/models/DiaryModel';
import RecordModel from 'src/app/models/RecordModel';
import { DiaryService } from 'src/app/services/diary/diary.service';

@Component({
  selector: 'app-record-item',
  templateUrl: './record-item.component.html',
  styleUrls: ['./record-item.component.scss'],
})
export class RecordItemComponent  implements OnInit {

  @Input() record!: RecordModel;

  @Input() diary!: DiaryModel;

  diaryService = inject(DiaryService)

  constructor() { }

  ngOnInit() {}

  async deleteRecord() {
    this.diary.Records = this.diary.Records.filter(x => x.Id != this.record.Id);

    await this.diaryService.deleteRecord(this.diary);
  }

}
