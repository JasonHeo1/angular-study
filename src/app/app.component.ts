import { ButtonModule } from 'primeng/button';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-first-app';
  helloMsg = 'Hello world';
  inputVal = '';

  handleClick(event, inputVal){
    window.alert('您点击了 ： ' + event.target + ', 您输入的内容是：  ' + inputVal);
  }
}
