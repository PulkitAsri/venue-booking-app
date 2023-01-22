import 'dart:convert';
import 'dart:html';
import 'dart:js_util';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:untitled/data/models/AllOrgs.dart';
import 'package:untitled/data/models/Login.dart';
import 'package:gql/language.dart';
import 'package:untitled/data/models/Organisation.dart';
import 'package:untitled/data/utility/queries.dart';
import 'package:untitled/presentation/query_documents_provider.dart';
import 'package:untitled/presentation/widgets/query_wrapper.dart';

import '../../core/constants.dart';

final queries = VenueBookerQueries();
bool _isUserLoggedIn = false;

class CreateOrgFormBody extends StatelessWidget {
  var ownerPk;
  CreateOrgFormBody({Key? key, required this.ownerPk}) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return Mutation(
      options: MutationOptions(
        document: parseString(context.queries.createOrg()),
        onCompleted: (resultData) {
          if (resultData == null) {
            print("Error: No result data obtained.");
          } else {
            //resultData is already in JSON format, decoding to model class Data
            print("login data: ${resultData.toString()}");
            try {
              final organisationData = Organisation.fromJson(resultData);
              var orgPk = organisationData.pk;
              print("Organisation Pk : $orgPk");
            } catch (error) {
              print("error parsing login data : $error");
            }
          }
        },
        onError: (error) => print("onError Error: $error"),
      ),
      builder: (runMutation, QueryResult? result) {
        return Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            // Image.asset(
            //   'images/illustration-1.png',
            //   width: 300,
            // ),
            MediaQuery.of(context).size.width >= 1300
                ? Image.asset(
                    'images/illustration-1.png',
                    width: 300,
                  )
                : SizedBox(),
            Padding(
              padding: EdgeInsets.symmetric(
                  vertical: MediaQuery.of(context).size.height / 6),
              child: Container(
                width: 320,
                child: _formCreateOrg(runMutation, context, ownerPk),
              ),
            )
          ],
        );
      },
    );
  }

  Widget _formCreateOrg(RunMutation runMutation, BuildContext context, String ownerPk) {
    TextEditingController orgNameController = TextEditingController();
    TextEditingController orgEmailController = TextEditingController();
    TextEditingController orgWebsiteController = TextEditingController();
    TextEditingController orgAddressController = TextEditingController();

    return Column(
      children: [
        TextField(
          decoration: InputDecoration(
            hintText: 'Organisation Name',
            filled: true,
            fillColor: Colors.blueGrey[50],
            labelStyle: TextStyle(fontSize: 12),
            contentPadding: EdgeInsets.only(left: 30),
            enabledBorder: OutlineInputBorder(
              borderSide: BorderSide(color: Colors.blueGrey.shade50),
              borderRadius: BorderRadius.circular(15),
            ),
            focusedBorder: OutlineInputBorder(
              borderSide: BorderSide(color: Colors.blueGrey.shade50),
              borderRadius: BorderRadius.circular(15),
            ),
          ),
          controller: orgNameController,
        ),
        SizedBox(height: 30),
        TextField(
          decoration: InputDecoration(
            hintText: 'Organisation Email',
            filled: true,
            fillColor: Colors.blueGrey[50],
            labelStyle: const TextStyle(fontSize: 12),
            contentPadding: const EdgeInsets.only(left: 30),
            enabledBorder: OutlineInputBorder(
              borderSide: BorderSide(color: Colors.blueGrey.shade50),
              borderRadius: BorderRadius.circular(15),
            ),
            focusedBorder: OutlineInputBorder(
              borderSide: BorderSide(color: Colors.blueGrey.shade50),
              borderRadius: BorderRadius.circular(15),
            ),
          ),
          obscureText: true,
          controller: orgEmailController,
        ),
        SizedBox(height: 30),
        TextField(
          decoration: InputDecoration(
            hintText: 'Organisation Website',
            filled: true,
            fillColor: Colors.blueGrey[50],
            labelStyle: const TextStyle(fontSize: 12),
            contentPadding: const EdgeInsets.only(left: 30),
            enabledBorder: OutlineInputBorder(
              borderSide: BorderSide(color: Colors.blueGrey.shade50),
              borderRadius: BorderRadius.circular(15),
            ),
            focusedBorder: OutlineInputBorder(
              borderSide: BorderSide(color: Colors.blueGrey.shade50),
              borderRadius: BorderRadius.circular(15),
            ),
          ),
          obscureText: true,
          controller: orgWebsiteController,
        ),
        SizedBox(height: 30),
        TextField(
          decoration: InputDecoration(
            hintText: 'Organisation Address',
            filled: true,
            fillColor: Colors.blueGrey[50],
            labelStyle: const TextStyle(fontSize: 12),
            contentPadding: const EdgeInsets.only(left: 30),
            enabledBorder: OutlineInputBorder(
              borderSide: BorderSide(color: Colors.blueGrey.shade50),
              borderRadius: BorderRadius.circular(15),
            ),
            focusedBorder: OutlineInputBorder(
              borderSide: BorderSide(color: Colors.blueGrey.shade50),
              borderRadius: BorderRadius.circular(15),
            ),
          ),
          obscureText: true,
          controller: orgAddressController,
        ),
        const SizedBox(height: 40),
        Container(
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.circular(30),
            boxShadow: [
              BoxShadow(
                color: Colors.deepPurple.shade100,
                spreadRadius: 10,
                blurRadius: 20,
              ),
            ],
          ),
          child: ElevatedButton(
            child: Container(
                width: double.infinity,
                height: 50,
                child: Center(child: Text("Create Organisation"))),
            onPressed: () async {
              await runMutation(<String, dynamic>{
                "orgName": orgNameController.text,
                "email": orgEmailController.text,
                "website": orgWebsiteController.text,
                "address": orgAddressController.text,
                "ownerPk": ownerPk,
              });

              //once mutation is completed, we need to run query fetchMeDetails()

              //Navigate to next screen only if the user is logged in
              // if (_isUserLoggedIn) {
              //   Navigator.of(context).pushNamed(calendar);
              // }
              Navigator.of(context).pushNamed(userHomePage);
            },
            style: ElevatedButton.styleFrom(
              primary: Colors.deepPurple,
              onPrimary: Colors.white,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(15),
              ),
            ),
          ),
        ),
        const SizedBox(height: 40),
        Row(children: [
          Expanded(
            child: Divider(
              color: Colors.grey[300],
              height: 50,
            ),
          ),
          const Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20),
            child: Text("Or continue with"),
          ),
          Expanded(
            child: Divider(
              color: Colors.grey[400],
              height: 50,
            ),
          ),
        ]),
        SizedBox(height: 40),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            _loginWithButton(image: 'images/google.png'),
          ],
        ),
      ],
    );
  }

  Widget _loginWithButton({required String image, bool isActive = false}) {
    return Container(
      width: 90,
      height: 70,
      decoration: isActive
          ? BoxDecoration(
              color: Colors.white,
              boxShadow: [
                BoxShadow(
                  color: Colors.grey.shade300,
                  spreadRadius: 10,
                  blurRadius: 30,
                )
              ],
              borderRadius: BorderRadius.circular(15),
            )
          : BoxDecoration(
              borderRadius: BorderRadius.circular(15),
              border: Border.all(color: Colors.grey.shade400),
            ),
      child: Center(
          child: Container(
        decoration: isActive
            ? BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(35),
                boxShadow: [
                  BoxShadow(
                    color: Colors.grey.shade400,
                    spreadRadius: 2,
                    blurRadius: 15,
                  )
                ],
              )
            : const BoxDecoration(),
        child: Image.asset(
          image,
          width: 35,
        ),
      )),
    );
  }
}
