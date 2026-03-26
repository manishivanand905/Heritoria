import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { requestJson } from "../../Services/api";
import {
  getAdminSession,
  saveAdminSession,
} from "../../Services/auth";
import {
  PageShell,
  LoginCard,
  BrandPanel,
  Eyebrow,
  BrandTitle,
  BrandText,
  CredentialBox,
  CredentialTitle,
  CredentialLine,
  LoginPanel,
  LoginForm,
  FormTitle,
  FormText,
  Field,
  FieldLabel,
  Input,
  Message,
  LoginButton,
  BackLink,
} from "./Login.styles";

const Login = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (getAdminSession()?.token) {
      history.replace("/admin");
    }
  }, [history]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await requestJson("/auth/login", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      saveAdminSession(response.data);
      setMessage({
        type: "success",
        text: "Login successful. Opening the admin dashboard...",
      });
      history.replace("/admin");
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageShell>
      <LoginCard>
        <BrandPanel>
          <Eyebrow>Private Admin Access</Eyebrow>
          <BrandTitle>Heritoria Control Lounge</BrandTitle>
          <BrandText>
            Temporary access is now available for your admin dashboard so you can
            review projects, investors, and buyer requests behind a login wall.
          </BrandText>

          <CredentialBox>
            <CredentialTitle>Temporary Credentials</CredentialTitle>
            <CredentialLine>
              <strong>Username:</strong> `admin`
            </CredentialLine>
            <CredentialLine>
              <strong>Password:</strong> `Heritoria@123`
            </CredentialLine>
            <CredentialLine>
              These are stored in your backend env for now and can be replaced
              with secure auth later.
            </CredentialLine>
          </CredentialBox>
        </BrandPanel>

        <LoginPanel>
          <LoginForm onSubmit={handleSubmit}>
            <div>
              <FormTitle>Admin Login</FormTitle>
              <FormText>
                Sign in to access the admin dashboard and manage the platform.
              </FormText>
            </div>

            {message ? (
              <Message $tone={message.type}>{message.text}</Message>
            ) : null}

            <Field>
              <FieldLabel>Username</FieldLabel>
              <Input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter username"
                required
              />
            </Field>

            <Field>
              <FieldLabel>Password</FieldLabel>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
              />
            </Field>

            <LoginButton type="submit">
              {isSubmitting ? "Signing In..." : "Enter Dashboard"}
            </LoginButton>

            <BackLink type="button" onClick={() => history.push("/")}>
              Back to website
            </BackLink>
          </LoginForm>
        </LoginPanel>
      </LoginCard>
    </PageShell>
  );
};

export default Login;
