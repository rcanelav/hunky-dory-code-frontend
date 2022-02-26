import {
  Button,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
import { AsidePostsInfo } from "../components/AsidePostsInfo/AsidePostsInfo";
import { Navbar } from "../components/navbar/Navbar";
import { useAuthorization } from "../hooks/useAuthorization";
import { updateProfilePicture, updateUserInfo, updateUserRole } from "../services/users/updateUserInfo";
const { REACT_APP_API_URL } = process.env;

export const SelfProfile = () => {
  const { userProfile, userSession, logout } = useAuthorization();
  const { userData } = userProfile;
  const [ userName, setUserName ] = useState(userData.name);
  const [userRole, setUserRole] = useState(userData?.role);
  const [userTechnology, setUserTechnology] = useState("0");
  const [technologyData, setTechnologyData] = useState([]);
  const [ profilePicture, setProfilePicture ] = useState(userData?.image);
  const navigate = useNavigate();
  const handleSubmit = (data) => {
    let userInfo = {
      userId: userData.id,
    }

    if( data.password.length < 6 && !data.password) {
      const { password, repeatPassword, ...rest } = data;
      userInfo = {
        ...userInfo,
        ...rest,
      }
    } else {
      userInfo = {
        ...userInfo,
        ...data,
      }
    }
    setUserName(data.name);
    updateUserRole(handleRole(), userSession);
    updateUserInfo(userInfo, userSession);
    if(!userInfo.password){
      return navigate("/search?q=");
    }

    return logout();
  };
  const handleProfilePicture = async(file) => {
    const formData = new FormData();
    formData.append("profileImage", file);
    let userInfo = {
      userId: userData.id,
      formData
    }

    const newProfileImage = URL.createObjectURL(file);
    setProfilePicture(newProfileImage);

    Swal.fire({
      icon: "success",
      title: "Profile picture updated",
    });
    userData.image = await updateProfilePicture(userInfo, userSession);
  }

  const handleRole = () => {
    let data = {
      userId: userData.id,
      role: userRole || userData.role,
      technology: userTechnology !== "0" ? userTechnology : userData.technologies,
    }
    if(userRole === "STUDENT"){
      data.technology = undefined;
    }
    return data;
  };

  useEffect(() => {
    async function getTechnologies() {
      const response = await axios.get(
        `${REACT_APP_API_URL}/api/v1/technologies`
      );
      setTechnologyData(response.data.technologies);
    }
    getTechnologies();
  }, [userData.image]);

  const mostRecentPosts =
    "search?searchBy=date&direction=desc&order=date&limit=5";
  const mostLikedPosts =
    "search?searchBy=titles&direction=desc&order=likes&limit=5";
  const mostAnsweredPosts =
    "search?searchBy=numAnswers&order=numAnswers&numAnswers=0";
  const mostViewedPosts = "search?&searchBy=content&orderBy=views";
  const myPosts = `users/${userData.id}/posts?page=1&limit=5`;

  return (
    <>
      <ContentWrapper className="animate__animated animate__fadeIn">
        <StyledNavbar />
        <AsideWrapper>
          <AsidePostsInfo url={mostRecentPosts}>Recent posts</AsidePostsInfo>
          <AsidePostsInfo url={mostLikedPosts}>Top rated posts</AsidePostsInfo>
        </AsideWrapper>
        <Formik
          initialValues={{
            email: userData.email,
            name: userName,
            lastname: userData.lastname,
            password: "",
            repeatPassword: "",
          }}
          validate={(values) => {
            const errors = {};
            if (!values.name) {
              errors.name = "Name is required";
            } else if (values.name.length < 3) {
              errors.name = "Name must be at least 3 characters";
            }
            if (!values.lastname) {
              errors.lastname = "Lastname is required";
            } else {
              if (values.lastname.length < 3) {
                errors.lastname = "Lastname must be at least 3 characters";
              }
            }
            if (!values.email) {
              errors.email = "Email is required";
            } else {
              if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }
            }
            if (values.password) {
              if (values.password.length < 6) {
                errors.password = "Password must be at least 6 characters";
              } else if (!/[A-Z]/.test(values.password)) {
                errors.password =
                  "Password must contain at least one capital letter";
              } else if (!/[\d]/.test(values.password)) {
                errors.password = "Password must contain at least one number";
              }
            }
            if (values.repeatPassword !== values.password) {
              errors.repeatPassword = "passwords don't match!";
            }

            return errors;
          }}
          onSubmit={(values) => {
            handleSubmit(values);
            handleRole();
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <ProfileWrapper>
                <div id="name-container">
                  <TextField
                    name="name"
                    label="Name"
                    value={values.name}
                    size="small"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.name && touched.name}
                    helperText={touched.name && errors.name}
                  />
                  <TextField
                    name="lastname"
                    label="Lastname"
                    size="small"
                    value={values.lastname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.lastname && touched.lastname}
                    helperText={touched.lastname && errors.lastname}
                  />
                  <TextField
                    name="email"
                    label="Email"
                    value={values.email}
                    size="small"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.email && touched.email}
                    helperText={touched.email && errors.email}
                  />
                </div>
                <div id="image-container">
                  <img src={profilePicture} alt="userData" />
                  <Button variant="contained" component="label" fullWidth>
                    Upload file
                    <input type="file" name="image" hidden accept="image/*" onChange={ (e) => handleProfilePicture(e.target.files[0]) } />
                  </Button>
                </div>
                <div id="password-role-container">
                  <TextField
                    name="password"
                    label="Password"
                    value={values.password}
                    size="small"
                    type="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.password && touched.password}
                    helperText={touched.password && errors.password}
                  />
                  <TextField
                    name="repeatPassword"
                    label="Repeat password"
                    value={values.repeatPassword}
                    size="small"
                    type="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.repeatPassword && touched.repeatPassword}
                    helperText={touched.repeatPassword && errors.repeatPassword}
                  />
                </div>
                <div id="role-container">
                  <RadioGroup
                    defaultValue={userData?.role}
                    name="role"
                    row
                    size="small"
                    onClick={(e) => setUserRole(e.target.value)}
                  >
                    <FormControlLabel
                      value="STUDENT"
                      control={<Radio />}
                      label="Student"
                    />
                    <FormControlLabel
                      value="EXPERT"
                      control={<Radio />}
                      label="Expert"
                    />
                  </RadioGroup>
                  { userData.role === "EXPERT" &&
                    <p>Current technology: { userData.technologyName } 📚</p>
                  }
                  {
                    userRole === "EXPERT" && (
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={userTechnology}
                        label="Technology"
                        onChange={(e) => {
                          setUserTechnology(e.target.value);
                        }}
                        size="small"
                      >
                        <MenuItem disabled value="0">
                          <em>Select a technology</em>
                        </MenuItem>
                        {technologyData?.map((item) => (
                          <MenuItem key={item.id} 
                            value={item.id}
                          >
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    )
                  }
                </div>
                <Button type="submit" fullWidth>
                  Save profile
                </Button>

                <div id="directions">
                  <Button onClick={ () => navigate(`/users/${userData.id}/posts`)}>
                    My Posts
                  </Button>
                  <Button>
                    My Answers
                  </Button>
                  <Button>
                    My Liked Posts
                  </Button>
                </div>
              </ProfileWrapper>
            </form>
          )}
        </Formik>
        <AsideWrapper>
          <AsidePostsInfo url={mostAnsweredPosts}>
            Most answered posts
          </AsidePostsInfo>
          <AsidePostsInfo url={mostViewedPosts}>
            Most viewed posts
          </AsidePostsInfo>
          <AsidePostsInfo url={myPosts}>
            My posts
          </AsidePostsInfo>
        </AsideWrapper>
      </ContentWrapper>
    </>
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
    height: 80vh;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  flex-flow: wrap;
  min-width: 100%;
  max-width: 100%;
  margin: 0 auto;
  > form {
    width: 92%;
    @media (min-width: 768px) {
      flex: 0 1 56%;
      & > * {
        flex: 0 1 88%;
      }
    }
  }
`;

const ProfileWrapper = styled.div`
  margin-top: 1.5em;
  padding: 1em 0;
  flex: 0 1 92%;
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  justify-content: center;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 10px;

  & > * {
    flex: 0 1 100%;
  }

  & div#name-container {
    flex: 0 1 70%;
    display: flex;
    flex-flow: row wrap;
    align-items: flex-start;
    justify-content: space-evenly;
    > * {
        margin-top: 2em;
        flex: 0 1 40%;
    }
    >:last-child {
        flex 0 1 87%;
    }
  }
  & div#image-container {
    flex: 0 1 20%;
    margin-top: 2em;

    img {
      width: 100%;
      border-radius: 10px;
      box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.5) 0px 2px 5px -0.4px;
      border: 1px solid rgba(0, 0, 0, 0.1);
    }
    label {
      margin: 0.5em auto;
      font-size: 0.7em;
      font-weight: bold;
      background-color: rgba(255, 204, 3, 1);
      text-align: center;

      &:hover {
          background-color: rgba(255, 204, 3, 0.8);
      }
    }

  }
  & div#password-role-container {
    margin-top: 1em;
    flex: 0 1 100%;
    display: flex;
    flex-flow: row wrap;
    align-items: flex-start;
    justify-content: space-evenly;
    > input[type="password"] {
      font-family: Verdana;
      letter-spacing: 0.125em;
    }
    > * {
        flex: 0 1 38%;
    }
  }

  & div#role-container {
    display: flex;
    flex-flow: row wrap;
    align-items: flex-start;
    justify-content: space-evenly;
    margin-top: 1em;
    & > * {
        flex: 0 1 90%;
        display: flex;
        flex-flow: row wrap;
        align-items: center;
        justify-content: center;
        margin: 0.3em auto;
    }
    & > p {
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      padding: 0.2em;
    }
  }

  & > button {
    margin-top: 1em;
    flex: 0 1 90%;
    background-color: rgba(255, 204, 3, 1);
    letter-spacing: 0.5em;
    font-weight: bold;
    &:hover {
        background-color: rgba(255, 204, 3, 0.8);
    }
  }

  & #directions {
    flex: 0 1 90%;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: space-between;
    margin-top: 1em;
    & > * {
        font-weight: bold;
        margin: 0.5em auto;
        flex: 0 1 100%;
        background-color: rgba(255, 204, 3, 1);
    }
  }

  @media (min-width: 768px) {
    flex: 0 1 56%;
    margin: 1.5em;
    & > * {
      flex: 0 1 88%;
    }
    & > button {
      flex: 0 1 80%;
    }
    & div#name-container {
        margin-top: 0.5em;
    }
    & div#password-role-container {
      > * {
        margin-top: 0.5em;
        flex: 0 1 35%;
      }
    }
    & div#directions {
      flex: 0 1 80%;
      & > * {
        flex: 0 1 45%;
      }
    }
  }

  @media (min-width: 1024px) {
    & div#name-container {
        margin-top: 1em;
    }
    & div#directions {
      justify-content: space-between;
      flex: 0 1 80%;
      & > * {
        font-size: 0.7em;
        flex: 0 1 30%;
      }
    }
  }
`;

const StyledNavbar = styled(Navbar)`
  flex: 0 0 100%;
`;
