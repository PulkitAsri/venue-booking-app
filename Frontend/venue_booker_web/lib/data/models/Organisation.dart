// To parse this JSON data, do
//
//     final Organisation = OrganisationFromJson(jsonString);

import 'dart:convert';

List<Organisation> OrganisationFromJson(String str) => List<Organisation>.from(json.decode(str).map((x) => Organisation.fromJson(x)));

String OrganisationToJson(List<Organisation> data) => json.encode(List<dynamic>.from(data.map((x) => x.toJson())));

class Organisation {
    Organisation({
        required this.pk,
        required this.orgName,
        required this.email,
        required this.website,
        required this.address,
        required this.ownerPk,
    });

    String pk;
    String orgName;
    String email;
    String website;
    String address;
    String ownerPk;

    factory Organisation.fromJson(Map<String, dynamic> json) => Organisation(
        pk: json["pk"],
        orgName: json["orgName"],
        email: json["email"],
        website: json["website"],
        address: json["address"],
        ownerPk: json["ownerPk"],
    );

    Map<String, dynamic> toJson() => {
        "pk": pk,
        "orgName": orgName,
        "email": email,
        "website": website,
        "address": address,
        "ownerPk": ownerPk,
    };
}
