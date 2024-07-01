import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TestService } from 'src/app/test.service';
import { EmpType } from 'src/app/employee.interface';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {


  constructor(private store: TestService, private router: Router) { }
  dataSubsciption: Subscription[] = []
  listData: EmpType[] = [];
  dataSource: any;
  displayColumns = ["name", "mail", "gender", "language", "qualification", "skill", "delete", "edit"]
  ngOnInit(): void {
    this.dataSubsciption.push(this.store.getData().subscribe({
      next: (data) => {
        this.listData = data
        this.dataSource = new MatTableDataSource(this.listData)
      }
    })
    )
  }

  removeCart(id: string) {
    console.log(this.listData);
    this.dataSubsciption.push(this.store.deleteData(id).subscribe({
      next: (data) => {
        let deleteArray = this.listData.filter((val: EmpType) => { val?.id != id });
        this.dataSource = new MatTableDataSource(deleteArray)
      }
    }))
  }


  addData() {
    this.router.navigate(['/registration'])
  }

  ngOnDestroy(): void {
    //console.log("Unsubscribe is called",this.dataSubsciption);
    this.dataSubsciption.forEach((element) => { element.unsubscribe() })
  }

}
