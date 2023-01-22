// To parse this JSON data, do
//
//     final welcome = welcomeFromJson(jsonString);

import 'dart:convert';

Welcome welcomeFromJson(Map<String, dynamic> json) => Welcome.fromJson(json);

String welcomeToJson(Welcome data) => json.encode(data.toJson());

class Welcome {
    Welcome({
        this.data,
    });

    Data? data;

    factory Welcome.fromJson(Map<String, dynamic> json) => Welcome(
        data: json["data"] == null ? null : Data.fromJson(json["data"]),
    );

    Map<String, dynamic> toJson() => {
        "data": data?.toJson(),
    };
}

class Data {
    Data({
        this.allOrgs,
    });

    List<AllOrg>? allOrgs;

    factory Data.fromJson(Map<String, dynamic> json) => Data(
        allOrgs: json["allOrgs"] == null ? [] : List<AllOrg>.from(json["allOrgs"]!.map((x) => AllOrg.fromJson(x))),
    );

    Map<String, dynamic> toJson() => {
        "allOrgs": allOrgs == null ? [] : List<dynamic>.from(allOrgs!.map((x) => x.toJson())),
    };
}

class AllOrg {
    AllOrg({
        this.pk,
        this.orgName,
        this.email,
        this.website,
        this.address,
        this.ownerPk,
    });

    String? pk;
    String? orgName;
    String? email;
    String? website;
    String? address;
    OwnerPk? ownerPk;

    factory AllOrg.fromJson(Map<String, dynamic> json) => AllOrg(
        pk: json["pk"],
        orgName: json["orgName"],
        email: json["email"],
        website: json["website"],
        address: json["address"],
        ownerPk: json["ownerPk"] == null ? null : OwnerPk.fromJson(json["ownerPk"]),
    );

    Map<String, dynamic> toJson() => {
        "pk": pk,
        "orgName": orgName,
        "email": email,
        "website": website,
        "address": address,
        "ownerPk": ownerPk?.toJson(),
    };
}

class OwnerPk {
    OwnerPk({
        this.pk,
        this.name,
        this.email,
        this.isAdmin,
    });

    String? pk;
    String? name;
    String? email;
    bool? isAdmin;

    factory OwnerPk.fromJson(Map<String, dynamic> json) => OwnerPk(
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
