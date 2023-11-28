import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { FaComments, FaPaperPlane, FaThumbsUp, FaTimes } from "react-icons/fa";
import PropTypes from "prop-types";
import TimeAgo from "react-timeago";
import useFetch from "../../hooks/useFetch";

const CommentsModal = ({ post, onPostChanged, isOwner, onClose }) => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const [data, setData] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [postContent, setPostContent] = useState(post.text);
  const [likesData, setLikesData] = useState({ likes: [] });
  const [hasLikedPost, setHasLikedPost] = useState(false);
  const [commentText, setCommentText] = useState("");

  const comments = post.comments || [];

  // Function to handle comment input change
  const handleCommentInputChange = (e) => {
    setCommentText(e.target.value);
  };

  // Function to handle submitting a comment
  const handleCommentSubmit = async () => {
    try {
      const response = await fetch(
        `${process.env.BASE_SERVER_URL}/api/posts/${post._id}/comment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId: userId,
            postId: post._id,
            text: commentText,
          }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Comment submitted:", result.comment);

        setCommentText("");
      } else {
        console.error("Error submitting comment:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting comment:", error.message);
    }
  };

  const onSuccess = (response) => {
    setData(response.user);
  };

  const { performFetch, cancelFetch } = useFetch(
    `/users/username/${post.username}`,
    onSuccess
  );

  useEffect(() => {
    return cancelFetch;
  }, []);

  useEffect(() => {
    performFetch({
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }, [userId]);

  useEffect(() => {
    performGetLikesFetch();
    return () => {
      cancelDeleteFetch();
      cancelEditFetch();
      cancelGetLikesFetch();
    };
  }, [userId]);

  useEffect(() => {
    const newHasLikedPost =
      likesData &&
      likesData.likes &&
      likesData.likes.some((like) => like.user === userId);

    if (newHasLikedPost !== hasLikedPost) {
      setHasLikedPost(newHasLikedPost);
    }
  }, [hasLikedPost, userId]);

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const onReceived = () => {
    onPostChanged();
  };

  const { performFetch: performDeleteFetch, cancelFetch: cancelDeleteFetch } =
    useFetch("/posts/delete", onReceived);

  const { performFetch: performEditFetch, cancelFetch: cancelEditFetch } =
    useFetch("/posts/edit", onReceived);

  const { performFetch: performLikeFetch } = useFetch(
    `/posts/${post._id}/like`,
    (data) => {
      setLikesData(data);
      performGetLikesFetch();
    }
  );

  const { performFetch: performUnlikeFetch } = useFetch(
    `/posts/${post._id}/unlike`,
    (data) => {
      setLikesData(data);
      performGetLikesFetch();
    }
  );

  const {
    performFetch: performGetLikesFetch,
    cancelFetch: cancelGetLikesFetch,
  } = useFetch(`/posts/${post._id}/likes`, setLikesData);

  const handlePostDelete = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (isConfirmed) {
      if (userId && post && post._id) {
        const options = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userId: userId, id: post._id }),
        };

        performDeleteFetch(options);
      }
    }
  };

  const handleSaveChanges = () => {
    console.log("Post creation initiated");
    if (!postContent) {
      alert("Text field cannot be empty");
      return;
    }
    if (post && post._id && postContent) {
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: userId,
          id: post._id,
          text: postContent,
        }),
      };

      performEditFetch(options);
      setIsEditMode(false);
    }
  };

  const handleLikeClick = async () => {
    if (userId && post && post._id) {
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: userId, postId: post._id }),
      };

      performLikeFetch(options);
      performGetLikesFetch();
    }
  };

  const handleUnlikeClick = async () => {
    if (userId && post && post._id) {
      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: userId, postId: post._id }),
      };

      performUnlikeFetch(options);

      performGetLikesFetch();
    }
  };

  CommentsModal.propTypes = {
    post: PropTypes.object.isRequired,
    userData: PropTypes.object.isRequired,
    onPostChanged: PropTypes.func,
    isOwner: PropTypes.func,
    onClose: PropTypes.func.isRequired,
  };

  return (
    <Container>
      <ModalContent>
        <ScrollableContainer>
          <CommentsTitleContainer>
            <CommentsTitle>{post.username} Post</CommentsTitle>
            <CloseButton onClick={onClose}>
              <FaTimes />
            </CloseButton>
          </CommentsTitleContainer>
          <PostTitle>
            <ProfilePic
              id="profilePic"
              src={
                data.profilePicture
                  ? `${process.env.BASE_SERVER_URL}/uploadImages/${data.profilePicture}`
                  : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
              }
              alt="Profile Pic"
            />
            <UserName>
              <StyledUsername>{post.username}</StyledUsername>
              <Time>
                <TimeAgo date={post.timestamp} />
              </Time>
            </UserName>
            {isOwner && (
              <>
                {isEditMode ? (
                  <CancelButton onClick={toggleEditMode}>Cancel</CancelButton>
                ) : (
                  <EditButton onClick={toggleEditMode}>Edit</EditButton>
                )}
                <DeleteButton onClick={handlePostDelete}>Delete</DeleteButton>
              </>
            )}
          </PostTitle>
          {isEditMode ? (
            <Text
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            ></Text>
          ) : (
            <>
              <PostText>{post.text}</PostText>
              {post.images && post.images.length > 0 && (
                <PostImage
                  src={`${process.env.BASE_SERVER_URL}/uploadImages/${post.images[0]}`}
                  alt="Post Image"
                />
              )}
            </>
          )}
          <PostFooter>
            {isEditMode && (
              <SaveChangesButton onClick={handleSaveChanges}>
                Save Changes
              </SaveChangesButton>
            )}
            {likesData &&
            likesData.likes &&
            likesData.likes.length !== undefined ? (
              <>
                <LikeCount>{likesData.likes.length} Likes</LikeCount>

                <CommentCount>{post.comments.length} comments</CommentCount>
              </>
            ) : (
              <>
                <LikeCount> 0 Likes</LikeCount>

                <CommentCount>0 Comments</CommentCount>
              </>
            )}

            {userId && post && post._id && (
              <ButtonContainer>
                {hasLikedPost ? (
                  <UnlikeButton
                    onClick={handleUnlikeClick}
                    $hasLiked={hasLikedPost}
                  >
                    <FaThumbsUp />
                  </UnlikeButton>
                ) : (
                  <LikeButton
                    onClick={handleLikeClick}
                    $hasLiked={hasLikedPost}
                  >
                    <FaThumbsUp />
                  </LikeButton>
                )}
                <CommentsButton>
                  <FaComments />
                </CommentsButton>
              </ButtonContainer>
            )}
          </PostFooter>
          <ConmentListContainer>
            <CommentList>
              {comments.map((comment) => (
                <Comment key={comment.id}>
                  <CommentProfilePic
                    src={
                      data.profilePicture
                        ? `${process.env.BASE_SERVER_URL}/uploadImages/${data.profilePicture}`
                        : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                    }
                    alt="Profile Pic"
                  />
                  <CommentContent>
                    <CommentHeader>
                      <CommentUserName>{comment.username}</CommentUserName>
                      <CommentTime>
                        <TimeAgo date={comment.timestamp} />
                      </CommentTime>
                    </CommentHeader>
                    <CommentText>{comment.text}</CommentText>
                  </CommentContent>
                </Comment>
              ))}
            </CommentList>
          </ConmentListContainer>
        </ScrollableContainer>

        <CommentInputContainer>
          <CommentPic
            src={
              data.profilePicture
                ? `${process.env.BASE_SERVER_URL}/uploadImages/${data.profilePicture}`
                : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
            }
            alt="Profile Pic"
          />
          <CommentInput
            placeholder="Write a comment..."
            value={commentText}
            onChange={handleCommentInputChange}
          />
          <SendButton onClick={handleCommentSubmit}>
            <FaPaperPlane />
          </SendButton>
        </CommentInputContainer>
      </ModalContent>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

const ModalContent = styled.div`
  border: 1px solid #d4f1f4;
  background-color: #ffffff;
  border-radius: 0.5rem;
  padding: 1.7rem 0.6rem 0.7rem 0.6rem;
  margin-bottom: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  @media (max-width: 768px) {
    height: 100%;
    width: 100%;
  }
`;

const ScrollableContainer = styled.div`
  height: 500px;
  width: 600px;

  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0em;
  }
  &::-webkit-scrollbar-thumb {
    background: #8c8c8c;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #555555;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }

  @media (max-width: 768px) {
    height: 500px;
    width: 380px;
  }
`;

const PostTitle = styled.div`
  display: flex;
  align-items: center;
`;

const ProfilePic = styled.img`
  width: 80px;
  height: 80px;
  padding: 0.2rem;
  border-radius: 50%;
  border-color: var(--white);
  box-shadow: 0 0 10px rgba(27, 131, 166, 0.6);
  margin-right: 1.5rem;
  margin-bottom: 1rem;
  object-fit: cover;
`;
const CommentPic = styled.img`
  width: 45px;
  height: 45px;
  padding: 0.2rem;
  border-radius: 50%;
  border-color: var(--white);
  box-shadow: 0 0 10px rgba(27, 131, 166, 0.6);
  margin-bottom: 1rem;
  margin-top: 1rem;
  object-fit: cover;
`;

const PostImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 15px;
  margin-top: 20px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  filter: grayscale(20%);

  &:hover {
    filter: grayscale(0%);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

const buttonStyles = css`
  cursor: pointer;
  opacity: 1;
  margin-left: 1.5rem;
  font-size: 1.3rem;
  border: 2px solid #788292;
  border-radius: 50%;
  padding: 0.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;
`;

const LikeButton = styled.button`
  ${buttonStyles}
  background-color: ${({ $hasLiked }) => ($hasLiked ? "#05445e" : "#788292")};
  color: ${({ $hasLiked }) => ($hasLiked ? "#fff" : "#555")};

  &:hover {
    background-color: ${({ $hasLiked }) => ($hasLiked ? "#045a6b" : "#4caf50")};
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
    padding: 0.4rem;
  }
`;

const UnlikeButton = styled.button`
  ${buttonStyles}
  background-color: ${({ $hasLiked }) => ($hasLiked ? "#045a6b" : "#788292")};
  color: ${({ $hasLiked }) => ($hasLiked ? "#fff" : "#555")};

  &:hover {
    background-color: ${({ $hasLiked }) => ($hasLiked ? "#045a6b" : "#3eacfa")};
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
    padding: 0.4rem;
  }
`;
const CommentsButton = styled.button`
  ${buttonStyles}
  background-color: #788292;
  color: #fff;

  &:hover {
    background-color: #4caf50;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
    padding: 0.6rem;
  }
`;

const LikeCount = styled.div`
  color: #788292;
  font-size: 1rem;
  @media (max-width: 768px) {
  }
`;

const CommentCount = styled.span`
  padding: 8px;
  border-radius: 8px;
  background-color: #fff;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #d4f1f4;
  }
  @media (max-width: 768px) {
  }
`;

const CommentInputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
  }
`;

const CommentInput = styled.input`
  flex-grow: 1;
  border: 1px solid #d4f1f4;
  border-radius: 0.5rem;
  padding: 0.6rem;
  margin-left: 0.5rem;
  background-color: #f0f2f5;
`;

const SendButton = styled.button`
  background-color: #75e6da;
  color: white;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem;
  cursor: pointer;
  margin-left: 0.5rem;
`;

const ConmentListContainer = styled.div`
  margin-top: 1rem;
`;

const CommentsTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const CloseButton = styled.button`
  cursor: pointer;
  opacity: 1;
  margin-left: 1.5rem;
  font-size: 1.3rem;
  border: 2px solid #788292;
  border-radius: 50%;
  padding: 0.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;

  &:hover {
    color: #1c1e21;
  }
`;

const CommentsTitle = styled.h2`
  font-size: 2rem;
  color: #1c1e21;
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const CommentList = styled.ul`
  list-style: none;
  padding: 0;
`;

const Comment = styled.li`
  display: flex;
  margin-bottom: 1rem;
`;

const CommentProfilePic = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 0.1rem;
`;

const CommentContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
`;

const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.3rem;
`;

const CommentUserName = styled.span`
  font-weight: bold;
  margin-right: 0.5rem;
`;

const CommentTime = styled.span`
  font-size: 0.8rem;
  color: #606770;
`;

const CommentText = styled.p`
  font-size: 1rem;
  line-height: 1.4;
  color: #1c1e21;
  word-wrap: break-word;
  background-color: #e2e2e2;
  border-radius: 0 11px 11px 11px;
  padding: 0.6rem;
  margin: 0;
  border: 1px solid #fff;
  box-shadow: 0 0 10px rgba(27, 131, 166, 0.2);
`;

const UserName = styled.div`
  font-size: 1.2rem;
  flex-grow: 1;
`;
const StyledUsername = styled.strong`
  font-weight: bold;
`;

const Time = styled.p`
  font-size: 0.8rem;
  margin-top: 0.5rem;
`;
const PostText = styled.p`
  font-size: 1.1rem;
  line-height: 2rem;
  overflow-wrap: break-word;
`;

const PostFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
  margin-top: 0.5rem;
`;

const DeleteButton = styled.div`
  display: flex;
  color: grey;
  cursor: pointer;
  align-self: flex-start;
`;

const EditButton = styled.div`
  display: flex;
  color: grey;
  cursor: pointer;
  align-self: flex-start;
  margin-right: 1rem;
`;

const SaveChangesButton = styled.button`
  background-color: #75e6da;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
  margin-right: 1rem;

  &:hover {
    background-color: #75e6da;
  }
`;

const CancelButton = styled.div`
  display: flex;
  color: #189ab4;
  cursor: pointer;
  align-self: flex-start;
  margin-right: 1rem;

  &:hover {
    color: red;
  }
`;

const Text = styled.textarea`
  margin-top: 0.5rem;
  display: flex;
  width: 100%;
  background-color: #ffffff;
  border-radius: 5.97px;
  height: 41px;
  resize: none;
  margin-left: 0.5rem;
  font-family: var(--font-family);
  font-size: 1rem;
  text-align: left;
  padding: 0.5rem;
`;

export default CommentsModal;
