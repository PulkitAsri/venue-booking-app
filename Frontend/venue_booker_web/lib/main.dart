import 'package:flutter/material.dart';
import 'package:untitled/presentation/widgets/TimeSlotsCard.dart';
import 'presentation/widgets/Calendar.dart';
import 'package:untitled/data/utility/home.dart';
import 'package:untitled/presentation/views/login_page.dart';
import 'core/constants.dart';
import 'package:intl/date_symbol_data_local.dart';

void main() {
  initializeDateFormatting("en_EN", null).then((_) => runApp(const MyApp()));
  // runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      // home: LoginFunctionality(),
      initialRoute: home,
      routes: {
        home: (context) => Home(),
        loginPage: (context) => const LoginPage(),
        calendar: (context) => const Calendar(),
        timeSlots: (context) => const TimeSlotsCard(),
      },
      debugShowCheckedModeBanner: false,
    );
  }
}
