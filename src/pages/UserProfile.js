import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { AsidePostsInfo } from "../components/AsidePostsInfo/AsidePostsInfo";
import { Navbar } from "../components/navbar/Navbar";
import { Profile } from "../components/userProfile/Profile";
import { useAuthorization } from "../hooks/useAuthorization";

export const UserProfile = () => {
  const userId = useLocation().pathname.split("/")[2];
  const { userProfile } = useAuthorization();

  console.log(userId);

  const mostRecentPosts =
    "search?searchBy=date&direction=desc&order=date&limit=5";
  const mostLikedPosts =
    "search?searchBy=titles&direction=desc&order=likes&limit=5";
  const mostAnsweredPosts =
    "search?searchBy=numAnswers&order=numAnswers&numAnswers=0";
  const mostViewedPosts = "search?&searchBy=content&orderBy=views";
  const myPosts = `users/${userProfile?.userData?.id}/posts?page=1&limit=5`;

  return (
      <ContentWrapper className="animate__animated animate__fadeIn">
        <StyledNavbar />
        <AsideWrapper>
          <AsidePostsInfo url={mostRecentPosts}>Recent posts</AsidePostsInfo>
          <AsidePostsInfo url={mostLikedPosts}>Top rated posts</AsidePostsInfo>
        </AsideWrapper>
        <Profile userId={userId} />
        <AsideWrapper>
          <AsidePostsInfo url={mostAnsweredPosts}>
            Most answered posts
          </AsidePostsInfo>
          <AsidePostsInfo url={mostViewedPosts}>
            Most viewed posts
          </AsidePostsInfo>
          { userProfile?.userData?.id && 
            <AsidePostsInfo url={myPosts}>My posts</AsidePostsInfo>
          }
        </AsideWrapper>
      </ContentWrapper>
  );
};

const AsideWrapper = styled.div`
  display: none;
  position: sticky;
  top: 0;

  @media (min-width: 768px) {
    flex: 0 1 20%;
    display: flex;
    flex-flow: row wrap;
    align-items: flex-start;
    justify-content: center;
    height: 30vh;

    & > *:not(:first-child) {
      margin-top: -0.85em;
    }
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  flex-flow: wrap;
  max-width: 1620px;
  margin: 0 auto;
`;

const StyledNavbar = styled(Navbar)`
  flex: 0 0 100%;
`;