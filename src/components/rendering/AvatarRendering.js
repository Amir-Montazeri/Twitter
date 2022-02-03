import React from 'react';
import Avatar from 'react-avatar';

const AvatarRendering = ({ avatar, onClicked, size }) => (
  <Avatar
    style={{ cursor: 'pointer' }}
    round={true}
    onClick={() => onClicked(avatar)}
    title={`title: ${avatar.name}`}
    name={avatar.username.replaceAll('_', ' ')}
    alt={`${avatar.username} profile`}
    src={avatar.profileUrl}
    maxInitials={2}
    size={size}
  />
);

export default AvatarRendering;