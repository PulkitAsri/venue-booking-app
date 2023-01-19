// To parse this JSON data, do
//
//     final Booking = BookingFromJson(jsonString);

import 'dart:convert';

List<Booking> BookingFromJson(String str) => List<Booking>.from(json.decode(str).map((x) => Booking.fromJson(x)));

String BookingToJson(List<Booking> data) => json.encode(List<dynamic>.from(data.map((x) => x.toJson())));

class Booking {
    Booking({
        required this.bookingPk,
        required this.timeSlotStart,
        required this.timeSlotEnd,
        required this.venuePk,
        required this.bookedAt,
        required this.description,
        required this.bookedByPk,
        required this.approvedStatus,
    });

    String bookingPk;
    DateTime timeSlotStart;
    DateTime timeSlotEnd;
    int venuePk;
    DateTime bookedAt;
    String description;
    String bookedByPk;
    String approvedStatus;

    factory Booking.fromJson(Map<String, dynamic> json) => Booking(
        bookingPk: json["bookingPk"],
        timeSlotStart: DateTime.parse(json["timeSlotStart"]),
        timeSlotEnd: DateTime.parse(json["timeSlotEnd"]),
        venuePk: json["venuePk"],
        bookedAt: DateTime.parse(json["bookedAt"]),
        description: json["description"],
        bookedByPk: json["bookedByPk"],
        approvedStatus: json["approvedStatus"],
    );

    Map<String, dynamic> toJson() => {
        "bookingPk": bookingPk,
        "timeSlotStart": timeSlotStart.toIso8601String(),
        "timeSlotEnd": timeSlotEnd.toIso8601String(),
        "venuePk": venuePk,
        "bookedAt": bookedAt.toIso8601String(),
        "description": description,
        "bookedByPk": bookedByPk,
        "approvedStatus": approvedStatus,
    };
}
