import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Tabs, message, Row, Col, Button } from "antd";

import SearchBar from "./SearchBar";
import CreatePlanButton from "./CreatePlanButton";

const { TabPane } = Tabs;

function Home(props){
  const [plans, setPlans] = useState([]);
  const [activeTab, setActiveTab] = useState("Your plans");
  const handleSearch = (option) => {
      
  };

  const fetchPlans = (option) => {
    const { type, keyword } = option;
    let url = "";   
  };
    
  const renderPlans = (type) => {
    if (!plans || plans.length === 0) {
      return <div>No data!</div>;
    }    
  }

  const showPlans = (type) => {
    console.log("type -> ", type);
    setActiveTab(type);
 
    // setTimeout(() => {
    //   setSearchOption({ type: SEARCH_KEY.all, keyword: "" });
    // }, 3000);
  };
 
  const operations = <CreatePlanButton onShowPost={showPlans} />;

  return (
    <div className="home">
      <SearchBar handleSearch={handleSearch} />
      <div className="display">
      <Tabs
          onChange={(key) => setActiveTab(key)}
          defaultActiveKey="your_plans"
          activeKey={activeTab}
          tabBarExtraContent={operations}
        >
          <TabPane tab="Your Plans" key="your_plans">
            {renderPlans("your_plans")}
          </TabPane>
          <TabPane tab="Recommended Plans" key="recommended_plans">
            {renderPlans("recommended_plans")}
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default Home;

