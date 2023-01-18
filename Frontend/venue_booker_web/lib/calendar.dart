import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_calendar/calendar.dart';
import 'package:intl/date_symbol_data_local.dart';

class Calendar extends StatefulWidget {
  const Calendar({Key? key}) : super(key: key);

  @override
  State<Calendar> createState() => _CalendarState();
}

class _CalendarState extends State<Calendar> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SfCalendar(
        view: CalendarView.month,
        dataSource: MeetingsDataSource(getAppointment()),
        // initialSelectedDate: DateTime.now(),
      ),
    );
  }
}

List<Appointment> getAppointment() {
  List<Appointment> meetings = <Appointment>[];
  final DateTime today = DateTime.now();
  final DateTime startTime =
      DateTime(today.year, today.month, today.day, 12, 0, 0);
  final DateTime endTime = startTime.add(const Duration(hours: 2));

  meetings.add(Appointment(
    startTime: startTime,
    endTime: endTime,
    subject: "Booking",
    color: Colors.blue,
  ));

  return meetings;
}

class MeetingsDataSource extends CalendarDataSource {
  MeetingsDataSource(List<Appointment> source) {
    appointments = source;
  }
}

void createTimeSlots() {
  DateTime now = DateTime.now();
  DateTime startTime = DateTime(now.year, now.month, now.day, 11, 0, 0);
  DateTime endTime = DateTime(now.year, now.month, now.day, 17, 0, 0);
  Duration step = Duration(hours: 1);

  List<BidSlot> timeSlots = [];

  while (startTime.isBefore(endTime)) {
    DateTime timeIncrement = startTime.add(step);
    timeSlots.add(BidSlot(
        startTime: DateFormat.jm().foramt(timeIncrement),
        endTime: DateFormat.Hm().format(timeIncrement.add(
          Duration(minutes: 1),
        ))));
    startTime = timeIncrement;
  }
  print('timeslots ------------- timeSlots');
  timeSlots.forEach((e) => print('${e.startTime} == ${e.endTime}'));
}

class BidSlot {
  late DateTime startTime;
  late DateTime endTime;
}
