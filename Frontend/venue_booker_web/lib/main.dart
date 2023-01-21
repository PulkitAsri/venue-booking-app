import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:untitled/data/models/Register.dart';
import 'package:untitled/presentation/query_documents_provider.dart';
import 'package:untitled/presentation/views/registeration_page.dart';
import 'package:untitled/presentation/widgets/TimeSlotsCard.dart';
import 'data/utility/queries.dart';
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
    final HttpLink httpLink = HttpLink("http://localhost:4000/graphql");

    final ValueNotifier<GraphQLClient> client = ValueNotifier(
      GraphQLClient(
        link: httpLink,
        cache: GraphQLCache(),
      ),
    );

    final queries = VenueBookerQueries();

    return QueriesDocumentProvider(
      queries: queries,
      child: GraphQLProvider(
        client: client,
        child: MaterialApp(
          initialRoute: loginPage,
          routes: {
            // home: (context) => loginPage,
            loginPage: (context) => const LoginPage(),
            calendar: (context) => const Calendar(),
            timeSlots: (context) => const TimeSlotsCard(),
            registerPage: (context) => const RegisterPage(),
          },
          debugShowCheckedModeBanner: false,
        ),
      ),
    );
  }
}
