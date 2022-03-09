import { MenuItem, Select, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AsidePostsInfo } from "../components/AsidePostsInfo/AsidePostsInfo";
import { Navbar } from "../components/navbar/Navbar";
import { TextEditor } from "../components/textEditor/TextEditor";
import Swal from "sweetalert2";
import { useAuthorization } from "../hooks/useAuthorization";
import { useNavigate } from "react-router-dom";
const { REACT_APP_API_URL } = process.env;

export const NewPost = () => {
  const [postBody, setPostBody] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [technology, setTechnology] = useState("0");
  const [technologyData, setTechnologyData] = useState([]);
  const { userSession, userProfile } = useAuthorization();
  const navigate = useNavigate();

  const mostRecentPosts =
    "search?searchBy=date&direction=desc&order=date&limit=5";
  const mostLikedPosts =
    "search?searchBy=titles&direction=desc&order=likes&limit=5";
  const mostAnsweredPosts =
    "search?searchBy=numAnswers&order=numAnswers&numAnswers=0";
  const mostViewedPosts = "search?&searchBy=content&orderBy=views";
  const myPosts = `users/${ userProfile?.userData?.id}/posts?page=1&limit=5`;
  useEffect(() => {
    async function getTechnologies() {
      const response = await axios.get(
        `${REACT_APP_API_URL}/api/v1/technologies`
      );
      setTechnologyData(response.data.technologies);
    }
    getTechnologies();
  }, []);
  const handleSubmit = async () => {
    if (!postBody || !postTitle || technology === "0") {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill all fields",
      });
    }
    if (postBody.length < 10) {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Post body must be at least 10 characters long",
      });
    }
    const newPost = await axios({
      method: "POST",
      url: `${REACT_APP_API_URL}/api/v1/posts`,
      headers: { Authorization: `Bearer ${userSession}` },
      data: {
        title: postTitle,
        content: postBody,
        technology: technology,
      },
    });
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
          <AsidePostsInfo url={mostRecentPosts}>Recent posts</AsidePostsInfo>
          <AsidePostsInfo url={mostLikedPosts}>Top rated posts</AsidePostsInfo>
          {
            userProfile?.userData &&
            <AsidePostsInfo url={myPosts}>
              My Posts
            </AsidePostsInfo>
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
              label="Category"
              onChange={(e) => setTechnology(e.target.value)}
              size="small"
              fullWidth
            >
              <MenuItem disabled value="0">
                <em>Select a category</em>
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
          <AsidePostsInfo url={mostAnsweredPosts}>
            Most answered posts
          </AsidePostsInfo>
          <AsidePostsInfo url={mostViewedPosts}>
            Most viewed posts
          </AsidePostsInfo>
          {
            userProfile?.userData &&
            <AsidePostsInfo url={myPosts}>
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

  @media (min-width: 768px) {
    flex: 0 1 20%;
    display: flex;
    flex-flow: row wrap;
    align-items: flex-start;
    justify-content: center;
    height: 100vh;
    overflow: scroll;
    scrollbar-width: none;

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
  flex: 0 1 100%;
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
    background-color: rgba(255, 255, 255, 1);
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
