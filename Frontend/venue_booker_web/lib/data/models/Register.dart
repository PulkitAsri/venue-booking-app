// To parse this JSON RegisterData, do
//
//     final registerData = registerDataFromJson(jsonString);

import 'dart:convert';

RegisterData registerDataFromJson(Map<String, dynamic> json) => RegisterData.fromJson(json);

String registerDataToJson(RegisterData registerData) => json.encode(registerData.toJson());


class RegisterData {
    RegisterData({
        this.register,
    });

    Register? register;

    factory RegisterData.fromJson(Map<String, dynamic> json) => RegisterData(
        register: json["register"] == null ? null : Register.fromJson(json["register"]),
    );

    Map<String, dynamic> toJson() => {
        "register": register?.toJson(),
    };
}

class Register {
    Register({
        this.user,
        this.token,
    });

    User? user;
    String? token;

    factory Register.fromJson(Map<String, dynamic> json) => Register(
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
        this.pk,
        this.name,
        this.email,
        this.isAdmin,
    });

    String? pk;
    String? name;
    String? email;
    bool? isAdmin;

    factory User.fromJson(Map<String, dynamic> json) => User(
        pk: json["pk"],
        name: json["name"],
        email: json["email"],
        isAdmin: json["isAdmin"],
    );

    Map<String, dynamic> toJson() => {
        "pk": pk,
        "name": name,
        "email": email,
        "isAdmin": isAdmin,
    };
}
