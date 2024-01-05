import React from "react";
import { Link } from 'react-router-dom';


function Home(){

    return (
        <div>
          <p>This is a home page</p>
          <Link to="/AddPlan"><button>
              AddPlan
            </button>
          </Link>
          
        </div>
      );
}

export default Home

