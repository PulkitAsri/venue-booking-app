import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:untitled/presentation/views/venue_page.dart';

import '../../core/constants.dart';

class OrganisationCard extends StatelessWidget {
  var result;
  var index;
  var orgData;
  OrganisationCard(this.result, this.index, this.orgData);

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        final orgPk = orgData['pk'];
        Navigator.of(context).pushNamed(venuePage, arguments: VenueArguments(result, orgPk));
      },
      child: Card(
        margin: const EdgeInsets.all(50),
        color: Colors.purple.shade100,
        elevation: 15,
        shadowColor: Colors.grey,
        shape: const RoundedRectangleBorder(
          borderRadius: BorderRadius.all(Radius.circular(15)),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Text(
              "${result.data!['allOrgs'][index]['orgName']}",
              style: const TextStyle(
                color: Colors.black,
                fontWeight: FontWeight.bold,
                fontSize: 32,
              ),
            ),
            const Divider(),
            Center(
                child:
                    Text('Email: ${result.data!['allOrgs'][index]['email']}')),
            Center(
                child: Text(
                    'Address: ${result.data!['allOrgs'][index]['address']}')),
            Center(
                child: Text(
                    'Owner Name: ${result.data!['allOrgs'][index]['ownerPk']['name']}')),
            Center(
                child: Text(
                    'Owner Email: ${result.data!['allOrgs'][index]['email']}')),
          ],
        ),
      ),
    );
  }
}
