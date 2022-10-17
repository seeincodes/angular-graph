import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  deposits: any[] = [];
  loading = true;
  error: any;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: gql`
          {
            deposits(
              orderDirection: desc
              orderBy: timestamp
            ) # where: {timestamp_gt: $timestamp_gt}
            {
              id
              from
              amountUSD
              timestamp
            }
          }
        `,
      })
      .valueChanges.subscribe((result: any) => {
        this.deposits = result.data?.deposits;
        this.loading = result.loading;
        this.error = result.error;
      });
  }
  title = 'angular-graph';
}
