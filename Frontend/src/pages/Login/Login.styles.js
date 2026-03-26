import styled from "styled-components";

export const PageShell = styled.div`
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 32px 20px;
  background:
    radial-gradient(circle at top left, rgba(236, 171, 19, 0.16), transparent 28%),
    radial-gradient(circle at bottom right, rgba(25, 118, 99, 0.14), transparent 30%),
    linear-gradient(180deg, #f8f5ef 0%, #f3eee4 48%, #f7f4ed 100%);
  color: ${({ theme }) => theme.colors.textDark};
`;

export const LoginCard = styled.div`
  width: min(1120px, 100%);
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  border-radius: 32px;
  overflow: hidden;
  border: 1px solid rgba(25, 118, 99, 0.08);
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(248, 244, 236, 0.92));
  box-shadow: 0 24px 70px rgba(40, 53, 61, 0.08);

  ${({ theme }) => theme.media.lg} {
    grid-template-columns: 1fr;
  }
`;

export const BrandPanel = styled.div`
  padding: 42px;
  position: relative;
  background:
    radial-gradient(circle at top left, rgba(236, 171, 19, 0.12), transparent 34%),
    linear-gradient(160deg, rgba(25, 118, 99, 0.08), rgba(255, 255, 255, 0.4));
`;

export const Eyebrow = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 8px 14px;
  border-radius: 999px;
  background: rgba(236, 171, 19, 0.12);
  color: ${({ theme }) => theme.colors.primaryDark};
  font-size: 0.76rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-weight: 600;
`;

export const BrandTitle = styled.h1`
  margin: 24px 0 18px;
  font-family: "Playfair Display", serif;
  font-size: clamp(2.4rem, 4vw, 4.5rem);
  line-height: 0.96;
  color: ${({ theme }) => theme.colors.textDark};
`;

export const BrandText = styled.p`
  margin: 0;
  max-width: 48ch;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.9;
`;

export const CredentialBox = styled.div`
  margin-top: 34px;
  padding: 20px;
  border-radius: 22px;
  border: 1px solid rgba(25, 118, 99, 0.08);
  background: rgba(255, 255, 255, 0.76);
`;

export const CredentialTitle = styled.h3`
  margin: 0 0 14px;
  color: ${({ theme }) => theme.colors.primaryDark};
  font-size: 1rem;
`;

export const CredentialLine = styled.p`
  margin: 0 0 8px;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.7;

  strong {
    color: ${({ theme }) => theme.colors.textDark};
  }
`;

export const LoginPanel = styled.div`
  padding: 42px;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ theme }) => theme.media.md} {
    padding: 28px 22px;
  }
`;

export const LoginForm = styled.form`
  width: 100%;
  max-width: 440px;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const FormTitle = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.textDark};
  font-size: 2rem;
`;

export const FormText = styled.p`
  margin: 0 0 6px;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.7;
`;

export const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const FieldLabel = styled.span`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textDark};
`;

export const Input = styled.input`
  border-radius: 18px;
  border: 1px solid rgba(25, 118, 99, 0.14);
  background: rgba(255, 255, 255, 0.9);
  color: ${({ theme }) => theme.colors.textDark};
  padding: 15px 16px;
  outline: none;

  &::placeholder {
    color: rgba(103, 119, 126, 0.72);
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 4px rgba(25, 118, 99, 0.08);
  }
`;

export const Message = styled.div`
  padding: 14px 16px;
  border-radius: 16px;
  border: 1px solid
    ${({ $tone, theme }) =>
      $tone === "error"
        ? "rgba(231, 76, 60, 0.22)"
        : "rgba(25, 118, 99, 0.18)"};
  background: ${({ $tone, theme }) =>
    $tone === "error"
      ? "rgba(231, 76, 60, 0.08)"
      : "rgba(25, 118, 99, 0.08)"};
  color: ${({ $tone, theme }) =>
    $tone === "error" ? theme.colors.error : theme.colors.primaryDark};
`;

export const LoginButton = styled.button`
  border: none;
  border-radius: 999px;
  padding: 15px 22px;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary} 0%,
    ${({ theme }) => theme.colors.primaryDark} 100%
  );
  color: ${({ theme }) => theme.colors.white};
  font-size: 0.98rem;
  font-weight: 700;
  cursor: pointer;
  transition: transform 180ms ease, box-shadow 180ms ease;
  box-shadow: 0 16px 34px rgba(25, 118, 99, 0.2);

  &:hover {
    transform: translateY(-2px);
  }
`;

export const BackLink = styled.button`
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  padding: 0;
  text-align: left;
  cursor: pointer;
`;
