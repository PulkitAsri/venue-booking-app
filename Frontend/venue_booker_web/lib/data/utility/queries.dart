class VenueBookerQueries {
  String login() {
    return r'''
      mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          user {
            name
            pk
            email
            isAdmin
          }
          token
        }
      }
      ''';
  }

  String register() {
    return r'''
    mutation Mutation($name: String!, $email: String!, $password: String!, $isAdmin: Boolean!) {
      register(name: $name, email: $email, password: $password, isAdmin: $isAdmin) {
        user {
          pk
          name
          email
          isAdmin
        }
        token
      }
    }
    ''';
  }

  String fetchMeDetails() {
    return r'''
    query Query {
      me {
        pk
        name
        email
        isAdmin
      }
    }   
    ''';
  }

  String fetchUserDetails() {
    return r'''
    query Query($pk: String!) {
      user(pk: $pk) {
        pk
        name
        email
        isAdmin
      }
    }
    ''';
  }
}
