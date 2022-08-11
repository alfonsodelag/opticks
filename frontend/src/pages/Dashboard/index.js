import React from "react";
import styled from "styled-components";
//
import Dashboard from "@/components/Dashboard";

const DashboardPageContainer = styled.main`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 2.5rem;
`;

const Header = styled.header`
  text-align: center;
`;

const Title = styled.h2`
  color: black;
  font-weight: 500;
  margin-bottom: 20px;
  font-size: 30px;
  text-align: center;
`;

const DashboardPage = () => {
  return (
    <DashboardPageContainer>
      <Header>
        <Title>Welcome!</Title>
      </Header>
      <Dashboard />
    </DashboardPageContainer>
  );
};

export default DashboardPage;
