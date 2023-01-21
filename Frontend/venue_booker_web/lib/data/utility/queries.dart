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

  String fetchOrgData() {
    return r'''
    query Query {
      org {
        pk
        orgName
        email
        website
        address
        ownerPk {
          pk
          name
          email
          isAdmin
        }
      }
    }   
    ''';
  }

  String fetchAllOrgs() {
    return r'''
    query Query {
      allOrgs {
        pk
        orgName
        email
        website
        address
        ownerPk {
          pk
          name
          email
          isAdmin
        }
      }
    }
    ''';
  }

  String createOrg() {
    return r'''
    mutation Mutation($orgName: String!, $email: String!, $website: String, $address: String, $ownerPk: String) {
      createOrg(orgName: $orgName, email: $email, website: $website, address: $address, ownerPk: $ownerPk) {
        pk
        orgName
        email
        website
        address
        ownerPk {
          pk
          name
          email
          isAdmin
        }
      }
    }
    ''';
  }

  String updateOrg() {
    return r'''
    mutation UpdateOrg($orgPk: String!, $orgName: String, $email: String, $website: String, $address: String) {
      updateOrg(orgPk: $orgPk, orgName: $orgName, email: $email, website: $website, address: $address) {
        pk
        orgName
        email
        website
        address
        ownerPk {
          pk
          name
          email
          isAdmin
        }
      }
    }
    ''';
  }
}
