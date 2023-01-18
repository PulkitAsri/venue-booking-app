import 'package:flutter/material.dart';
import 'package:untitled/calendar.dart';
import 'package:untitled/login_functionality.dart';
import 'package:untitled/login_page.dart';
import 'constants.dart';
import 'package:intl/date_symbol_data_local.dart';

void main() {
  initializeDateFormatting("en_EN", null).then((_) => runApp(const MyApp()));
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
        home: (context) => LoginFunctionality(),
        loginPage: (context) => const LoginPage(),
        calendar: (context) => const Calendar(),
      },
      debugShowCheckedModeBanner: false,
    );
  }
}
