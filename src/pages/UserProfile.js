import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { AsideAnswersInfo } from "../components/AsideAnswersInfo/AsideAnswersInfo";
import { AsidePostsInfo } from "../components/AsidePostsInfo/AsidePostsInfo";
import { Navbar } from "../components/navbar/Navbar";
import { Profile } from "../components/userProfile/Profile";
import { useAuthorization } from "../hooks/useAuthorization";

export const UserProfile = () => {
  const userId = useLocation().pathname.split("/")[2];
  const { userProfile } = useAuthorization();

  const mostRecentPosts =
    "search?searchBy=date&direction=desc&order=date&limit=5";
  const mostLikedPosts =
    "search?searchBy=titles&direction=desc&order=likes&limit=5";
  const mostAnsweredPosts =
    "search?searchBy=numAnswers&order=numAnswers&numAnswers=0";
  const mostViewedPosts = "search?&searchBy=content&orderBy=views";
  const myPosts = `users/${userProfile?.userData?.id}/posts?page=1&limit=5`;
  const myAnswers = `users/${ userProfile?.userData?.id}/answers?page=1&limit=5`;

  return (
      <ContentWrapper className="animate__animated animate__fadeIn">
        <StyledNavbar />
        <AsideWrapper>
          <AsidePostsInfo url={mostRecentPosts}>Recent posts</AsidePostsInfo>
          <AsidePostsInfo url={mostLikedPosts}>Top rated posts</AsidePostsInfo>
          {
            userProfile?.userData &&
            <AsideAnswersInfo url={myAnswers}>
              My Answers
            </AsideAnswersInfo>
          }
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
  max-height: 698px;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  overflow-y: scroll;
  overflow: scroll;
  scrollbar-width: none;

  @media (min-width: 768px) {
    flex: 0 1 20%;
    display: flex;
    flex-flow: row wrap;
    align-items: flex-start;
    justify-content: center;
    height: 100vh;

    & > *:not(:first-child) {
      margin-top: -0.85em;
    }
  }
  @media (min-height: 900px) {
    max-height: 874px;
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
