import { MenuItem, Select, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AsidePostsInfo } from "../components/AsidePostsInfo/AsidePostsInfo";
import { Navbar } from "../components/navbar/Navbar";
import { TextEditor } from "../components/textEditor/TextEditor";
import Swal from "sweetalert2";
import { useAuthorization } from "../hooks/useAuthorization";
import { useNavigate } from "react-router-dom";
import { AsideAnswersInfo } from "../components/AsideAnswersInfo/AsideAnswersInfo";
import { createPost } from "../services/posts/createPost";
import { getTechnologies } from "../services/technologies/getTechnologies";
import { displayModal } from "../utils/helpers/displayModal";
import { getUrlTypes } from "../utils/helpers/urlTypes";

export const NewPost = () => {
  const [postBody, setPostBody] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [technology, setTechnology] = useState("0");
  const [technologyData, setTechnologyData] = useState([]);
  const { userSession, userProfile } = useAuthorization();
  const navigate = useNavigate();
  const asideUrl = getUrlTypes(userProfile?.userData?.id);

  useEffect(() => {
    async function getData() {
      const technologies = await getTechnologies();
      setTechnologyData(technologies);
    }
    getData();
  }, []);

  const handleSubmit = async () => {
    if (!postBody || !postTitle || technology === "0") {
      return displayModal(undefined, undefined, "Please fill all fields", undefined);
    }
    if (postBody.length < 17) {
      return displayModal(undefined, undefined, "Post body must be at least 10 characters long", undefined);
    }
    // Create new Post
    const newPost = await createPost(postTitle, postBody, technology, userSession);
    const Toast = Swal.mixin({
      toast: true,
      position: "center",
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    Toast.fire({
      icon: "success",
      title: newPost.data.msg,
    });
    setTimeout(() => {
      navigate(`/posts/${newPost.data.post_id}`);
    }, 1000);
  };
  return (
    <>
      <ContentWrapper className="animate__animated animate__fadeIn">
        <StyledNavbar />
        <AsideWrapper>
          <AsidePostsInfo url={asideUrl.mostRecentPosts}>Recent posts</AsidePostsInfo>
          <AsidePostsInfo url={asideUrl.mostLikedPosts}>Top rated posts</AsidePostsInfo>
          {
            userProfile?.userData &&
            <AsideAnswersInfo url={asideUrl.myAnswers}>
              My Answers
            </AsideAnswersInfo>
          }
        </AsideWrapper>
        <PostGridWrapper>
          <div id="postDataContainer">
            <TextField
              label="Title"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              size="small"
              fullWidth
            />
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={technology}
              label="Technology"
              onChange={(e) => setTechnology(e.target.value)}
              size="small"
              fullWidth
            >
              <MenuItem disabled value="0">
                <em>Select a technology</em>
              </MenuItem>
              {technologyData?.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
            <TextEditor
              value={postBody}
              setValue={setPostBody}
              submit={handleSubmit}
            />
          </div>
        </PostGridWrapper>
        <AsideWrapper>
          <AsidePostsInfo url={asideUrl.mostAnsweredPosts}>
            Most answered posts
          </AsidePostsInfo>
          <AsidePostsInfo url={asideUrl.mostViewedPosts}>
            Most viewed posts
          </AsidePostsInfo>
          {
            userProfile?.userData &&
            <AsidePostsInfo url={asideUrl.myPosts}>
              My Posts
            </AsidePostsInfo>
          }
        </AsideWrapper>
      </ContentWrapper>
    </>
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
  margin: 1em auto;
`;

const PostGridWrapper = styled.div`
  margin-top: 1.5em;
  flex: 0 1 92%;
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  justify-content: center;
  height: 100vh;

  & > * {
    flex: 0 1 100%;
  }
  & > div#postDataContainer {
    padding: 1em;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.95);
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
      rgba(0, 0, 0, 0.3) 0px 3px 3px -1px;
    & > * {
      margin-bottom: 1em;
    }
  }

  @media (min-width: 768px) {
    flex: 0 1 56%;
    & > * {
      flex: 0 1 88%;
    }
  }
`;

const StyledNavbar = styled(Navbar)`
  flex: 0 0 100%;
`;
