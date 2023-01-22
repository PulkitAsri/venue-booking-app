// import 'dart:convert';
// import 'package:flutter/services.dart';
// import 'package:flutter_appauth/flutter_appauth.dart';
// import 'package:flutter_secure_storage/flutter_secure_storage.dart';
// import 'package:bugsnag_flutter/bugsnag_flutter.dart';

// import '../models/Login.dart';

// class AuthService {
//   static final AuthService instance = AuthService._internal();
//   factory AuthService() => instance;
//   AuthService._internal();

//   final FlutterAppAuth appAuth = const FlutterAppAuth();
//   final FlutterSecureStorage secureStorage = const FlutterSecureStorage();

//   Login? login;
//   String? authAccessToken;

//   Future<bool> init() async {
//     final storedRefreshToken = await secureStorage.read(key: REFRESH_TOKEN_KEY);

//     if (storedRefreshToken == null) {
//       return false;
//     }

//     try {
//       final TokenResponse? result = await appAuth.token(
//         TokenRequest(
//           AUTH_CLIENT_ID,
//           AUTH_REDIRECT_URI,
//           issuer: AUTH_ISSUER,
//           refreshToken: storedRefreshToken,
//         ),
//       );
//       final String setResult = await _setLocalVariables(result);
//       return setResult == 'Success';
//     } catch (e) {
//       return false;
//     }
//   }

//   Future<String> login() async {
//     try {
//       final authorizationTokenRequest = AuthorizationTokenRequest(
//           AUTH_CLIENT_ID, AUTH_REDIRECT_URI,
//           issuer: AUTH_ISSUER, scopes: ['openid', 'profile', 'write']);
//       final AuthorizationTokenResponse? result =
//           await appAuth.authorizeAndExchangeCode(
//         authorizationTokenRequest,
//       );

//       return await _setLocalVariables(result);
//     } on PlatformException catch (e) {
//       await bugsnag.notify(e, null);
//       return 'User has cancelled or no internet!';
//     } catch (e) {
//       await bugsnag.notify(e, null);
//       return 'Unkown Error!';
//     }
//   }

//   AuthIdToken parseIdToken(String idToken) {
//     final parts = idToken.split(r'.');
//     assert(parts.length == 3);
//     final Map<String, dynamic> json = jsonDecode(
//       utf8.decode(
//         base64Url.decode(
//           base64Url.normalize(parts[1]),
//         ),
//       ),
//     );
//     return AuthIdToken.fromJson(json);
//   }

//   Future<String> _setLocalVariables(result) async {
//     final bool isValidResult =
//         result != null && result.accessToken != null && result.idToken != null;
//     if (isValidResult) {
//       authAccessToken = result.accessToken;
//       idToken = parseIdToken(result.idToken!);
//       await secureStorage.write(
//         key: ACCESS_TOKEN_KEY,
//         value: result.accessToken,
//       );
//       if (result.refreshToken != null) {
//         await secureStorage.write(
//           key: REFRESH_TOKEN_KEY,
//           value: result.refreshToken,
//         );
//       }
//       return 'Success';
//     } else {
//       return 'Something is Wrong!';
//     }
//   }
// }
