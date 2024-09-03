import { useState } from "react";
import { FiMail, FiLock, FiUser} from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

import { api } from "../../services/api";

import { Button } from '../../components/button';
import { Input } from '../../components/input';

import { Container, Form, Background } from "./styles";

export function SignUp(){
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function handleSignUp() {
    if (!name || !email || !password) {
      return alert("All fields must be filled in");
    }

    api.post("/users", {name, email, password})
    .then(() => {
      alert("Successfully registered user!");
      navigate("/");
    })
    .catch(error => {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Unable to register user")
      }
    });
  }

  return (
    <Container>
      <Background/>
      <Form>
        <h1>Rocket Notes</h1>
        <p>Application to save and manage your links</p>

        <h2>Create your account</h2>

        <Input
          placeholder="Name"
          type="text"
          icon={FiUser}
          onChange={e => setName(e.target.value)}
          />
        <Input
          placeholder="Mail"
          type="text"
          icon={FiMail}
          onChange={e => setEmail(e.target.value)}
          />
        <Input
          placeholder="Password"
          type="password"
          icon={FiLock}
          onChange={e => setPassword(e.target.value)}
          />
        <Button name="Register" onClick={handleSignUp} />
        
        <Link to="/">
          Back to Log In 
        </Link>
      </Form>
    </Container>
  );
}