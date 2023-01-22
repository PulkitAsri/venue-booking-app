import 'dart:convert';
import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:untitled/data/models/AllOrgs.dart';
import 'package:untitled/data/models/Login.dart';
import 'package:untitled/data/models/Organisation.dart';
import 'package:untitled/presentation/query_documents_provider.dart';
import 'package:untitled/presentation/widgets/query_wrapper.dart';
import 'package:gql/language.dart';
import 'package:easy_sidemenu/easy_sidemenu.dart';
import 'package:untitled/presentation/widgets/side_menu.dart';

import '../widgets/OrganisationCard.dart';

class UserHomePage extends StatefulWidget {
  const UserHomePage({Key? key}) : super(key: key);

  @override
  State<UserHomePage> createState() => _UserHomePageState();
}

class _UserHomePageState extends State<UserHomePage> {
  bool showMenuBar = false;
  bool isAdmin = true;

  @override
  Widget build(BuildContext context) {
    PageController page = PageController();
    return Query(
      options: QueryOptions(
        document: parseString(
          context.queries.fetchAllOrgs(),
        ),
      ),
      builder: (result, {fetchMore, refetch}) {
        if (result.isLoading) {
          return const CircularProgressIndicator();
        } else if (result.hasException) {
          return ErrorWidget(result.exception.toString());
        }

        final resultD = result.data;
        print(resultD);

        final allOrgs = resultD!['allOrgs'];
        print(allOrgs);

        return Scaffold(
          appBar: AppBar(
            centerTitle: true,
            title: Text("Dashboard"),
            leading: ElevatedButton(
              child: Icon(Icons.menu),
              onPressed: () {
                setState(() {
                  showMenuBar = !showMenuBar;
                });
              },
            ),
            actions: isAdmin
                ? [
                    ElevatedButton(
                      onPressed: () {},
                      child: Icon(Icons.person),
                    ),
                  ]
                : [],
          ),
          backgroundColor: const Color(0xFFf5f5f5),
          body: Row(
            mainAxisAlignment: MainAxisAlignment.start,
            children: [
              SideMenu(
                controller: page,
                items: sideMenuItems,
                title: const Text(
                  "VenBooker",
                  style: TextStyle(
                    color: Colors.white,
                  ),
                ),
                footer: const Text(
                  "VenBooker Copyright 2023",
                  style: TextStyle(
                    color: Colors.black,
                    fontSize: 12,
                    fontWeight: FontWeight.normal,
                  ),
                ),
                onDisplayModeChanged: (value) => print(value),
                style: SideMenuStyle(
                  displayMode: showMenuBar
                      ? SideMenuDisplayMode.open
                      : SideMenuDisplayMode.compact,
                  decoration: BoxDecoration(),
                  backgroundColor: Colors.deepPurple.shade900,
                  openSideMenuWidth: 250,
                  compactSideMenuWidth: 70,
                  hoverColor: Colors.purple.shade400,
                  selectedColor: Colors.green,
                  selectedIconColor: Colors.blue,
                  unselectedIconColor: Colors.white,
                  selectedTitleTextStyle: TextStyle(color: Colors.white),
                  unselectedTitleTextStyle: TextStyle(color: Colors.white60),
                  iconSize: 20,
                  itemBorderRadius: const BorderRadius.all(
                    Radius.circular(5.0),
                  ),
                  showTooltip: true,
                  itemHeight: 50.0,
                  itemInnerSpacing: 8.0,
                  itemOuterPadding: const EdgeInsets.symmetric(horizontal: 5.0),
                  toggleColor: Colors.black54,
                ),
              ),
              Expanded(
                child: PageView(
                  controller: page,
                  children: [
                    //All Organisations grid
                    MediaQuery.removePadding(
                      context: context,
                      removeTop: true,
                      child: GridView.builder(
                          gridDelegate:
                              const SliverGridDelegateWithFixedCrossAxisCount(
                            crossAxisCount: 3,
                          ),
                          itemCount: result.data!.length,
                          itemBuilder: (BuildContext context, int index) {
                            final orgData =
                                result.data!['allOrgs'][index];
                            return OrganisationCard(result, index, orgData);
                          }),
                    ),
                  ],
                ),
              ),
            ],
          ),
        );
      },
    );
  }
}

// import 'dart:convert';

// import 'package:flutter/cupertino.dart';
// import 'package:flutter/material.dart';
// import 'package:graphql_flutter/graphql_flutter.dart';
// import 'package:untitled/presentation/query_documents_provider.dart';
// import 'package:untitled/presentation/widgets/query_wrapper.dart';
// import 'package:gql/language.dart';
// import '../../data/models/Organisation.dart';

// class UserHomePage extends StatefulWidget {
//   const UserHomePage({Key? key}) : super(key: key);

//   @override
//   State<UserHomePage> createState() => _UserHomePageState();
// }

// class _UserHomePageState extends State<UserHomePage> {
//   @override
//   Widget build(BuildContext context) {
//     return QueryWrapper<List<Object?>>(
//       queryString: context.queries.fetchAllOrgs(),
//       dataParser: (json) {
//         return json['allOrgs'];
//       },
//       contentBuilder: (data) {
//         return MediaQuery.removePadding(
//           context: context,
//           removeTop: true,
//           child: GridView.builder(
//               gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
//                 crossAxisCount: 3,
//               ),
//               itemCount: data.length,
//               itemBuilder: (BuildContext context, int index) {
//                 return Card(
//                   color: Colors.amber,
//                   child: Center(child: Text("${data![index].runtimeType}")),
//                 );
//               }),
//         );
//       },
//     );
//   }
// }
