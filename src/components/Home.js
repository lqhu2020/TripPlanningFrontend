import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import axios from "axios";

import SearchBar from "./SearchBar";
import CreatePlanButton from "./CreatePlanButton";
// import PhotoGallery from "./PhotoGallery";
import PlanGallery from "./PlanGallery";
import { UNSPLASH_ROOT, UNSPLASH_KEY } from "../constants";
const { TabPane } = Tabs;

function Home(props) {
  const [plans, setPlans] = useState([]);
  const [images, setImages] = useState([]);
  const [activeTab, setActiveTab] = useState("your_plans");

  const handleSearch = (option) => {};

  useEffect(() => {
    fetchPlans();
  }, [activeTab]);

  const fetchPlanImage = async (planStates) => {
    console.log(planStates);
    let urls = planStates.map((plan) => {
      return `${UNSPLASH_ROOT}/search/photos?query=${plan.place}&client_id=${UNSPLASH_KEY}&per_page=1`;
    });

    const requests = urls.map((url) => axios.get(url));
    axios.all(requests).then((responses) => {
      const images = responses.map((resp, index) => {
        const { data } = resp;
        // console.log(data);
        const image = data.results[0];
        // console.log("image", image);
        return {
          planId: planStates[index].planId,
          user: "test",
          caption: planStates[index].place,
          src: image.urls.thumb,
          thumbnail: image.urls.thumb,
          // thumbnailWidth: 300,
          // thumbnailHeight: 200,
          // width: 300,
          // height: 200,
        };
      });
      setImages(images);
      console.log(images);
    });
  };

  const fetchPlans = () => {
    if (activeTab === "your_plans") {
      console.log("enter your plans");
      setPlans([
        { planId: "0", place: "Beijing" },
        { planId: "2", place: "London" },
        { planId: "4", place: "Memphis" },
      ]);
      setPlans((state) => {
        fetchPlanImage(state);
        console.log(images);
        // fetchPlanImageLocal(state);
        return state;
      });
    } else if (activeTab === "recommended_plans") {
      console.log("enter recommended plans");
      setPlans([
        { planId: "1", place: "Shanghai" },
        { planId: "3", place: "Paris" },
        { planId: "5", place: "Kyoto" },
      ]);
      setPlans((state) => {
        // console.log(state);
        fetchPlanImage(state);
        return state;
      });
    }
  };

  const renderPlans = () => {
    if (!plans || plans.length === 0 || images.length === 0) {
      return <div>No data!</div>;
    } else {
      console.log("home", images);
      return <PlanGallery images={images} plans={plans}></PlanGallery>;
    }
  };

  const showPlans = (type) => {
    console.log("type -> ", type);
    setActiveTab(type);
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
            {renderPlans()}
          </TabPane>
          <TabPane tab="Recommended Plans" key="recommended_plans">
            {renderPlans()}
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default Home;
