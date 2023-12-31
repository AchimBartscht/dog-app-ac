import Image from "next/image";
import styled from "styled-components";
import genieLogo from "../public/genie-logo.png";
import lampIcon from "../public/lamp-icon.png";

export default function ImageTextModule({ children, $showImage, $makeGray }) {
  return (
    <StyledSection>
      {!$showImage && (
        <StyledIcon
          $makeGray={$makeGray}
          src={lampIcon}
          alt="Icon of a lamp"
          width={60}
          height={30}
          blurDataURL="data:..."
          placeholder="blur" // Optional blur-up while loading
        />
      )}
      {$showImage && (
        <StyledImage
          src={genieLogo}
          alt="Logo of a Genie with a Lamp"
          width={1004 / 2}
          height={1396 / 2}
          blurDataURL="data:..."
          placeholder="blur" // Optional blur-up while loading
        />
      )}
      <StyledP $showImage={$showImage}>{children}</StyledP>
    </StyledSection>
  );
}

const StyledSection = styled.div`
  position: relative;
  width: var(--mobilewidth);
  margin: auto;
  margin-top: var(--basicmargin);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2px solid var(--primary-color);
  border-radius: var(--borderradius-medium);
`;
const StyledImage = styled(Image)`
  width: 8rem;
  height: auto;
`;
const StyledP = styled.p`
  text-align: ${({ $showImage }) => ($showImage ? "left" : "center")};
  font-size: 1.1rem;
  line-height: 1.25;
  padding: ${({ $showImage }) => ($showImage ? "0" : "2rem 2.5rem")};
  padding-right: ${({ $showImage }) => ($showImage ? "1rem" : "2.5rem")};
`;
const StyledIcon = styled(Image)`
  position: absolute;
  bottom: -1rem;
  left: 42%;
  border-radius: 100%;
  background-color: ${({ $makeGray }) =>
    $makeGray ? "var(--soft-background)" : "var(--background-color)"};
`;
