import 'dart:html';

import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:untitled/presentation/views/login_page.dart';
import 'dart:async';
import '../../presentation/widgets/LoginFormBody.dart';

class Home extends StatelessWidget {
  // const LoginFunctionality(email, password);
  @override
  Widget build(BuildContext context) {
    final HttpLink httpLink = HttpLink("http://localhost:4000/graphql");

    final ValueNotifier<GraphQLClient> client = ValueNotifier(
      GraphQLClient(
        link: httpLink,
        cache: GraphQLCache(),
      ),
    );
    return GraphQLProvider(
      child: const LoginPage(),
      client: client,
    );
  }
}

// class Test extends StatelessWidget {
//   // Test(var email, var password);

//   TextEditingController usernameController = TextEditingController();
//   TextEditingController passwordController = TextEditingController();

//   final String mutationQuery = r"""
//       mutation Mutation($email: String!, $password: String!) {
//         login(email: $email, password: $password) {
//           token
//         }
//       }
//       """;

//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       appBar: AppBar(title: const Text("GraphQL Test")),
//       body: Mutation(
//         options: MutationOptions(document: gql(mutationQuery), onCompleted: (data) => 
//           print("OnComplete called"),
//           onError: (error) => print("onError Error: $error"),
//         ),
//         builder: (RunMutation runMutation, QueryResult? result) {
//           return Column(
//             children: [
//               TextField(
//                 decoration: const InputDecoration(hintText: "Username"),
//                 controller: usernameController,
//               ),
//               TextField(
//                 decoration: const InputDecoration(hintText: "Password"),
//                 controller: passwordController,
//               ),
//               ElevatedButton(
//                 onPressed: () {
//                   runMutation(<String, dynamic> { 
//                     "email": usernameController.text,
//                     "password": passwordController.text,
//                   });
//                 },
//                 child: const Text("Login"),
//               ),

//               Text("Result : \n  ${result!.data?.toString()}"),
//             ],
//           );
//         },
        
//       ),
//     );
//   }
// }
