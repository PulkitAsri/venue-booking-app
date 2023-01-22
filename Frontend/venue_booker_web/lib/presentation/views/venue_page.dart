import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:gql/language.dart';
import 'package:untitled/presentation/query_documents_provider.dart';

import '../widgets/LoginFormBody.dart';

class VenuePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final args = ModalRoute.of(context)!.settings.arguments as VenueArguments;

    final orgPk = args.orgPk;
    return Scaffold(
      backgroundColor: const Color(0xFFf5f5f5),
      body: Query(
        options: QueryOptions(
          document: parseString(
            context.queries.fetchVenuesForOrg("$orgPk"),
          ),
        ),
        builder: (result, {fetchMore, refetch}) {
          return Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [Text("Venue Page se data : ${result.data}")]);
        },
      ),
    );
  }
}

class VenueArguments {
  var result;
  var orgPk;
  VenueArguments(this.result, this.orgPk);
}
