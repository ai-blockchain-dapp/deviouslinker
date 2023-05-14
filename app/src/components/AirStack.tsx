import { useQuery } from "@airstack/airstack-react";
import React from "react";

const query = `
  query SocialUser {
    Socials(input: {filter: {userAssociatedAddresses: {_eq: 0xBcb81F16053143fF2cE19C59a6eFa1B6C29EEFF0}}, blockchain: ethereum}) {
      Social {
        dappName
        userId
        userAddress
        userAssociatedAddresses
        userCreatedAtBlockTimestamp
        userCreatedAtBlockNumber
        userLastUpdatedAtBlockTimestamp
        userLastUpdatedAtBlockNumber
        userHomeURL
        userRecoveryAddress
        profileName
        profileTokenId
        profileTokenAddress
        profileCreatedAtBlockTimestamp
        profileCreatedAtBlockNumber
        profileLastUpdatedAtBlockTimestamp
        profileLastUpdatedAtBlockNumber
        profileTokenUri
        isDefault
        identity
      }
    }
  }
`;

const AirStack = ({address}) => {
//console.log(`address=${address}`)
  const variables = `{"address": "0xBcb81F16053143fF2cE19C59a6eFa1B6C29EEFF0"}`;
  const { data, loading, error } = useQuery(query, variables, { cache: false });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return <div>This address has social account on {data}</div>;
};

export default AirStack;

