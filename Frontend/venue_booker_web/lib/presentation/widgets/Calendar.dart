import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:syncfusion_flutter_calendar/calendar.dart';
import 'package:untitled/core/constants.dart';

final List<String> availableTimeSlots = [];
class Calendar extends StatefulWidget {
  const Calendar({Key? key}) : super(key: key);

  @override
  State<Calendar> createState() => _CalendarState();
}

class _CalendarState extends State<Calendar> {
  @override
  void initState() {
    // TODO: implement initState
    createTimeSlots();
  }

  @override
  Widget build(BuildContext context) {
    
    return Scaffold(
      body: SfCalendar(
        view: CalendarView.week,
        dataSource: MeetingsDataSource(getAppointment()),
        onTap: (calendarTapDetails) => {
          Navigator.of(context)
              .pushNamed(timeSlots, arguments: availableTimeSlots),
        },
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

  createTimeSlots();

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

class BidSlot {
  late String startTime;
  late String endTime;
  BidSlot(this.startTime, this.endTime);
}

void createTimeSlots() {
  DateTime now = DateTime.now();
  DateTime startTime = DateTime(now.year, now.month, now.day, 11, 0, 0);
  DateTime endTime = DateTime(now.year, now.month, now.day, 17, 0, 0);
  Duration step = const Duration(hours: 1);

  List<BidSlot> timeSlots = [];

  while (startTime.isBefore(endTime)) {
    DateTime timeIncrement = startTime.add(step);
    timeSlots.add(
      BidSlot(
        DateFormat.jm("en_EN").format(startTime),
        DateFormat.jm("en_EN").format(timeIncrement),
      ),
    );

    startTime = timeIncrement;
  }
  // print('timeslots ------------- timeSlots');

  for (var e in timeSlots) {
    print('${e.startTime} -- ${e.endTime}');
    availableTimeSlots.add("${e.startTime} - ${e.endTime}");
  }
}
