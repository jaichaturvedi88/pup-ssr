import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { User } from './user.model';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[];

  constructor(private usersService: UsersService) { }

  ngOnInit() { 
    this.getAllUsers();
  }

  initializeUsers() {
    try {
      this.usersService.initializeUsers();
    } catch (error) {
      console.error('error', error);
    }
  }

  getAllUsers() {
    this.usersService.getAllUsers()
      .subscribe(users => {
        this.users = users;
        console.log(users)
      })
  }

}
