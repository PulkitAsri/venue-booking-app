// To parse this JSON data, do
//
//     final User = getUserData(jsonString);

import 'dart:convert';

List<User> getUserData(String str) => List<User>.from(json.decode(str).map((x) => User.fromJson(x)));

String users(List<User> data) => json.encode(List<dynamic>.from(data.map((x) => x.toJson())));

class User {
    User({
        required this.pk,
        required this.name,
        required this.email,
        required this.password,
        required this.isAdmin,
    });

    String pk;
    String name;
    String email;
    String password;
    bool isAdmin;

    factory User.fromJson(Map<String, dynamic> json) => User(
        pk: json["pk"],
        name: json["name"],
        email: json["email"],
        password: json["password"],
        isAdmin: json["isAdmin"],
    );

    Map<String, dynamic> toJson() => {
        "pk": pk,
        "name": name,
        "email": email,
        "password": password,
        "isAdmin": isAdmin,
    };
}
