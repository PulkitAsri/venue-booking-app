// To parse this JSON data, do
//
//     final welcome = welcomeFromJson(jsonString);

import 'dart:convert';

Data dataFromJson(Map<String, dynamic> json) => Data.fromJson(json);

String dataToJson(Data data) => json.encode(data.toJson());


class Data {
    Data({
        this.login,
    });

    Login? login;

    factory Data.fromJson(Map<String, dynamic> json) => Data(
        login: json["login"] == null ? null : Login.fromJson(json["login"]),
    );

    Map<String, dynamic> toJson() => {
        "login": login?.toJson(),
    };
}

class Login {
    Login({
        this.user,
        this.token,
    });

    User? user;
    String? token;

    factory Login.fromJson(Map<String, dynamic> json) => Login(
        user: json["user"] == null ? null : User.fromJson(json["user"]),
        token: json["token"],
    );

    Map<String, dynamic> toJson() => {
        "user": user?.toJson(),
        "token": token,
    };
}

class User {
    User({
        this.name,
        this.pk,
        this.email,
        this.isAdmin,
    });

    String? name;
    String? pk;
    String? email;
    bool? isAdmin;

    factory User.fromJson(Map<String, dynamic> json) => User(
        name: json["name"],
        pk: json["pk"],
        email: json["email"],
        isAdmin: json["isAdmin"],
    );

    Map<String, dynamic> toJson() => {
        "name": name,
        "pk": pk,
        "email": email,
        "isAdmin": isAdmin,
    };
}
