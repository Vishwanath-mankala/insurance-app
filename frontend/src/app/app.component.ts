import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CustomButtonComponent } from "./components/custom-button/custom-button.component";
import { CardComponent } from "./components/card/card.component";
import { RegisterComponent } from "./pages/register/register.component";

@Component({
  selector: 'app-root',
  imports: [RegisterComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent { }
