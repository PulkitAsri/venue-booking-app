import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:gql/language.dart';
import 'package:untitled/presentation/query_documents_provider.dart';

import '../widgets/LoginFormBody.dart';

class VenuePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final args = ModalRoute.of(context)!.settings.arguments as VenueArguments;
    return Scaffold(
       backgroundColor: const Color(0xFFf5f5f5),
       body: Query(
        options: QueryOptions(
          document: parseString(
            context.queries.fetchVenuesForOrg(),
          ),
          ),
          builder:(result, {fetchMore, refetch}) {
            
          },
         child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            
          ]
          ),
       ),
      );
  }
}

class VenueArguments {
  var result;
  var orgPk;
  VenueArguments(this.result, this.orgPk);
}
