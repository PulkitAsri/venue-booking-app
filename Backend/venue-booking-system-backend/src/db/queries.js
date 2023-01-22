const LOGIN = gql`
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
    `;

const REGISTER = gql`
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
    `;


const ME = gql`
    query Query {
        me {
        pk
        name
        email
        isAdmin
        }
    }  
    `;

 const USER = gql`
    query Query($pk: String!) {
        user(pk: $pk) {
        pk
        name
        email
        isAdmin
        }
    }
    `;


const ORG_DATA = gql`
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
    `;


const ALL_ORGS = gql`
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
    `;


const CREATE_ORG = gql`
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
    `;

const UPDATE_ORG = gql`
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
    `;

const ALL_VENUES = gql`
    query Query {
        allVenues {
        pk
        venueName
        openingTime
        closingTime
        address
        description
        images
        }
    }
    `;


const VENUE_FOR_ORG = gql`
    query Query($orgPk: String!) {
        allVenuesForOrg(orgPk: $orgPk) {
        venueName
        pk
        openingTime
        closingTime
        images
        description
        address
        }
    }
    `;
  

const APPROVED_BOOKING_ON_DATE = gql`
    query Query($date: String) {
        getApprovedBookingsOnDate(date: $date) {
        timeSlotStart
        timeSlotEnd
        pk
        description
        bookedBy {
            pk
            name
            email
            isAdmin
        }
        bookedAt
        approvedStatus
        }
    }
    `;

