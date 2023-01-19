import 'dart:math';

import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';
import '../../data/models/Error.dart';
import 'error_widget.dart';

class QueryWrapper<T> extends StatelessWidget {

  const QueryWrapper({
    Key? key,
    required this.queryString,
    required this.contentBuilder,
    required this.dataParser,
    this.variables,
  }) : super(key: key);

  /// Query parameters meant to be passed alongside the query
  final Map<String, dynamic>? variables;

  /// The query string document to request from the GraphQL endpoint
  final String queryString;

  /// This callback method is responsible for building our UI and passing the data
  final Widget Function(T data) contentBuilder;

  /// This callback receives the JSON data in the form of a map and then
  /// parses the data to our model class
  final T Function(Map<String, dynamic> data) dataParser;

  @override
  Widget build(BuildContext context) {
    return Query(
      options: QueryOptions(
        fetchPolicy: FetchPolicy.cacheAndNetwork,
        document: gql(queryString),
        variables: variables ?? const {},
        parserFn: dataParser,
      ),
      builder: (QueryResult result,
          {VoidCallback? refetch, FetchMore? fetchMore}) {
        if (result.isLoading) {
          return const CircularProgressIndicator();
        }

        if (result.hasException) {
          return AppErrorWidget(
            error: ErrorModel.fromString(
              result.exception.toString(),
            ),
          );
        }

        return contentBuilder(result.parserFn(result.data ?? {}) as T);
      },
    );
  }
}