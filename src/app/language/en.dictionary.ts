import { Injectable } from '@angular/core';

@Injectable()
export class EnglishDictionary {
    public dictionary = {
        "searchFor": "Search for...",
        "firstName": "First name",
        "lastName": "Last name",
        "emailAddress": "Email address",
        "dateOfBirth": "Date of birth",
        "firstNameInput": "Enter your first name",
        "lastNameInput": "Enter your last name",
        "emailAddressInput": "Enter your email address",
        "dateOfBirthInput": "Enter your date of birth",
        "addNewUser": "Add new user",
        "editUser": "Update user",
        "deleteBtn": "Delete user",
        "error": "Problem occurred",
        "offlineMode": "There is a problem with your connection to the server. Offline mode activated.",
        "success": "The problem with your connection is fixed.",
        "onlineMode": "Active online connection.",
        "offlineUpdate": "In the moment there is no connection to the server. Your change will be sended when the connection is estabilished",
        "onlineUpdate": "Your change of user {{firstName}} was sended to the server.",
        "userChange": "Your change of user {{firstName}} was successful.",
        "changeWasSccessful": "Your change was successful.",
    }
}