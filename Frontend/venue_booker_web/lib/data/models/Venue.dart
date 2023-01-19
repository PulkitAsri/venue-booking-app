// To parse this JSON data, do
//
//     final Venue = VenueFromJson(jsonString);

import 'dart:convert';

List<Venue> VenueFromJson(String str) => List<Venue>.from(json.decode(str).map((x) => Venue.fromJson(x)));

String VenueToJson(List<Venue> data) => json.encode(List<dynamic>.from(data.map((x) => x.toJson())));

class Venue {
    Venue({
        required this.pk,
        required this.venueName,
        required this.venueOpensAt,
        required this.venueClosesAt,
        required this.address,
        required this.description,
        required this.images,
        required this.orgPk,
    });

    String pk;
    String venueName;
    String venueOpensAt;
    String venueClosesAt;
    String address;
    String description;
    List<String> images;
    String orgPk;

    factory Venue.fromJson(Map<String, dynamic> json) => Venue(
        pk: json["pk"],
        venueName: json["venueName"],
        venueOpensAt: json["venueOpensAt"],
        venueClosesAt: json["venueClosesAt"],
        address: json["address"],
        description: json["description"],
        images: List<String>.from(json["images"].map((x) => x)),
        orgPk: json["orgPk"],
    );

    Map<String, dynamic> toJson() => {
        "pk": pk,
        "venueName": venueName,
        "venueOpensAt": venueOpensAt,
        "venueClosesAt": venueClosesAt,
        "address": address,
        "description": description,
        "images": List<dynamic>.from(images.map((x) => x)),
        "orgPk": orgPk,
    };
}
