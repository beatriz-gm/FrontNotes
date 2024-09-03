import { useState } from 'react';
import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from 'react-icons/fi';
import { useAuth } from '../../hooks/auth';

import {api} from '../../services/api';

import avatarPlaceholder from '../../assets/avatar_placeholder.svg';
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Avatar } from "./styles";

export function Profile() {
  const {user, updateProfile } = useAuth();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState();
  const [newPasswrod, setNewPassword] = useState();

  const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder;

  const [avatar, setAvatar] = useState(avatarUrl);
  const [avatarFile, setAvatarFile] = useState(null);

  const navigate = useNavigate();

  function handleBack() {
    navigate(-1);
  }

  async function handleUpdate() {
    const updated = {
      name,
      email,
      password: newPasswrod,
      old_password: password,
    }

    const userUpdated = Object.assign(user, updated);

    await updateProfile({user:userUpdated, avatarFile});
  }

  function handleChangeAvatar(event) {
    const file = event.target.files[0];
    setAvatarFile(file);

    const imagePreview = URL.createObjectURL(file);
    setAvatar(imagePreview);
  }

  return(
    <Container>
      <header>
        <button type="button" onClick={handleBack} >
          <FiArrowLeft/>
        </button>
      </header>

      <Form>
        <Avatar>
          <img 
          src={avatar}
          alt="user photo" 
          />

          <label htmlFor="avatar">
            <FiCamera/>

            <input 
            id="avatar"
            type="file"
            onChange={handleChangeAvatar}
            />
          </label>
        </Avatar>
        <Input
          placeholder="Name"
          type="text"
          icon={FiUser}
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <Input
          placeholder="Mail"
          type="text"
          icon={FiMail}
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <Input
          placeholder="Current Password"
          type="password"
          icon={FiLock}
          onChange={e => setPassword(e.target.value)}
        />
        <Input
          placeholder="New Password"
          type="password"
          icon={FiLock}
          onChange={e => setNewPassword(e.target.value)}
        />

        <Button name="Save" onClick={handleUpdate} />
      </Form>
    </Container>
  );
}