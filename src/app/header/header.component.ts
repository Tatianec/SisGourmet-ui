import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <div class="header">
      <h1>SISGOURMET</h1>
    </div>
  `,
  styles: [
    `
      .header {
        background-color: #007bff;
        color: #ffffff;
        padding: 20px;
        text-align: center;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
      }

      h1 {
        margin: 0;
        font-size: 24px;
      }
    `,
  ],
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
