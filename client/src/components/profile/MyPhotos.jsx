import React from "react";
import styled from "styled-components";

// Sample data with image URLs
const userPhotos = [
  "https://th.bing.com/th/id/OIP.6lL4MboZ6-ZtULpHuGykaAHaE7?w=274&h=183&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  "https://th.bing.com/th/id/OIP.Vt3kGu4X6WQlmH91GpJpzgHaFH?w=266&h=183&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  "https://th.bing.com/th?q=Digital+Photography&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=nl-NL&cc=NL&setlang=en&adlt=moderate&t=1&mw=247",
  "https://th.bing.com/th/id/OIP.y2wQKuJK8ZMxUCgqhh03_wHaD4?w=294&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  "https://th.bing.com/th/id/OIP.o-dRVNAClOSJEmRqzDWShAHaFj?w=227&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  "https://th.bing.com/th/id/OIP.KQGDMik_PBb_9URuRoAsigHaE9?w=261&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  "https://th.bing.com/th/id/OIP.tA5mhbMRRf0jXA3kVKiRWgHaFj?w=252&h=189&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  "https://th.bing.com/th/id/OIP.44XSmgvHf9Iy5BRwd_8VYgHaFj?w=196&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  "https://th.bing.com/th/id/OIP.c4h1HQF9T3f-Au3FIlDDqQHaFj?w=251&h=187&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  // Add more photo URLs here
];

function MyPhotos() {
  const photosToDisplay = userPhotos.slice(0, 6);

  return (
    <div className="container block">
      <PhotosContainer>
        <h2>Your Photos</h2>
        <PhotosGrid>
          {photosToDisplay.map((photo, index) => (
            <PhotoItem key={index}>
              <img src={photo} alt={`Photo ${index + 1}`} />
            </PhotoItem>
          ))}
        </PhotosGrid>
      </PhotosContainer>
    </div>
  );
}

const PhotosContainer = styled.div`
  width: 100;
`;

const PhotosGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  justify-items: center;
  margin-top: 2rem;
`;

const PhotoItem = styled.div`
  img {
    width: 140px;
    height: 140px;
    object-fit: cover;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    transition: transform 0.2s ease;

    &:hover {
      transform: scale(1.05);
    }
  }
`;

export default MyPhotos;
