import 'dart:async';
import 'dart:convert';
import 'dart:html';
import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;
import 'package:untitled/data/models/User.dart';

Future<List<T>> fetchData<T>(http.Client client, String url) async {
  final response = await client.get(Uri.parse(url));

  // Use the compute function to run parsePhotos in a separate isolate.
  return compute(fetchData as ComputeCallback<String, List<T>>, response.body);
}

