import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
// import { AuthenticationService } from '../../service/authentication.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule,RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
   title = 'product-hive-consumer';
  username :string='';
  isUserLoggedIn:boolean=false; 
  


  // constructor(public authService: AuthenticationService) {  }
   constructor(private router: Router) {  }

  
  // ngOnInit() {
  //   // Subscribe to userName$ observable to get updates dynamically
  //   this.authService.userName$.subscribe((email: string) => {
  //     this.username = email;
  //     this.isUserLoggedIn = this.authService.isLoggedIn();
  //   });
  // }

  // handleLogout(){
  //   this.authService.logout();
  // }
}