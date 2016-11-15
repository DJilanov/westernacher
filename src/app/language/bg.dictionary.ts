import { Injectable } from '@angular/core';

@Injectable()
export class BulgarianDictionary {
    public dictionary = {
        "searchFor": "Потърси...",
        "firstName": "Име",
        "lastName": "Фамилия",
        "emailAddress": "Емайл адрес",
        "dateOfBirth": "Дата на раждане",
        "firstNameInput": "Въведете първото име",
        "lastNameInput": "Въведете фамилията",
        "emailAddressInput": "Въведете емайл адреса",
        "dateOfBirthInput": "Въведете датата на раждане",
        "addNewUser": "Добавяне на нов потребител",
        "editUser": "Промянa на потребителя",
        "deleteBtn": "Изтриване на потребителя",
        "error": "Възникна проблем",
        "offlineMode": "Възникна проблем с връзката ви към сървъра. Активиран локален режим.",
        "success": "Проблема с конекцията е решен.",
        "onlineMode": "Влизате в активен режим.",
        "offlineUpdate": "В момента няма връзка със сървъра. Вашата промяна ще бъде изпратена при валидна връзка.",
        "onlineUpdate": "Вашата промяна на юзър {{firstName}} беше изпратена към сървъра.",
        "userChange": "Вашата промяна на юзър {{firstName}} беше успешна.",
        "changeWasSccessful": "Вашата промяна беше успешна.",
    }
}