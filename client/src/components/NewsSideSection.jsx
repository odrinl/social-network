import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import useFetch from "../hooks/useFetch";

const NewsSideSection = () => {
  const token = localStorage.getItem("token");
  const [articles, setArticles] = useState([]);

  const onReceived = (response) => {
    if (!response.error) {
      const htmlContent = response.data;

      // Create a DOMParser instance
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, "text/html");
      const baseUrl = "https://ind.nl";

      // Extract articles
      const extractedArticles = Array.from(
        doc.querySelectorAll(".article")
      ).map((element) => {
        return {
          date: element.querySelector(".article__date").textContent.trim(),
          title: element.querySelector(".article__title").textContent.trim(),
          description: element
            .querySelector(".article__description")
            .textContent.trim(),
          link:
            baseUrl +
            element.querySelector(".article__title").getAttribute("href"),
        };
      });

      setArticles(extractedArticles);
    }
  };

  const { performFetch, cancelFetch, isLoading, error } = useFetch(
    "/proxy/get",
    onReceived
  );

  const fetchData = () => {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    performFetch(options);
  };

  useEffect(() => {
    fetchData();

    // Add empty dependency array
    return cancelFetch;
  }, []);

  return (
    <Container>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {"Something went wrong"}</p>}

      {articles.map((article, index) => (
        <Item key={index}>
          <Details>
            <NewsDate>{article.date}</NewsDate>
            <NewsName>
              <ArticleLink to={article.link}>{article.title}</ArticleLink>
            </NewsName>
          </Details>

          <p className="article__description">{article.description}</p>
        </Item>
      ))}
    </Container>
  );
};
export default NewsSideSection;

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const Item = styled.div`
  align-items: center;
  margin-bottom: 1.2rem;
  padding-right: 0.2rem;
`;

const NewsName = styled.div`
  font-weight: bold;
`;

const Details = styled.div`
  font-size: 1rem;
  flex-direction: column;
`;

const NewsDate = styled.div`
  font-size: 0.8rem;
  margin-bottom: 0.2rem;
`;

const ArticleLink = styled(Link)`
  text-decoration: none;
  color: #1877f2;
`;
