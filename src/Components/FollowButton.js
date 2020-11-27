import React, { useState } from "react";
import PropTypes from "prop-types";
import { gql } from "apollo-boost";
import { useMutation } from "react-apollo-hooks";
import Button from "./Button";

const FOLLOW = gql`
  mutation follow($id: String!) {
    follow(id: $id)
  }
`;

const UNFOLLOW = gql`
  mutation unfollow($id: String!) {
    unfollow(id: $id)
  }
`;

const FollowButton = ({ isFollowing, id }) => {
  const [isFollowingS, setIsFollowing] = useState(isFollowing);
  const followMutation = useMutation(FOLLOW, { variables: { id } });
  const unfollowMutation = useMutation(UNFOLLOW, { variables: { id } });

  const onClick = () => {
    if (isFollowingS === true) {
      setIsFollowing(false);
      unfollowMutation();
    } else {
      setIsFollowing(true);
      followMutation();
    }
  };
  return <Button text={isFollowing ? "Unfollow" : "Follow"} onClick={onClick} />;
};

FollowButton.propTypes = {
  isFollowing: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
};

export default FollowButton;
