import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter<void>();
  isAuth : boolean = false;
  authSubscription : Subscription;
  constructor(private authService : AuthService) { }

  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe(subscriptionStatus => {
      this.isAuth = subscriptionStatus;
    })
  }
  
  onClose() {
    this.closeSidenav.emit();
  }
  onLogout(){
    this.authService.logout();
  }
  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.authSubscription.unsubscribe();
  }

}
