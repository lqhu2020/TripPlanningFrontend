import React, { useState } from "react";
import { Input } from "antd";

const { Search } = Input;

function SearchBar(props) {
    const [error, setError] = useState("");

    const handleSearch = (value) => {
        if (value === "") {
            setError("Please input your seach keyword!");
            return;
        }
        setError("");
    }

    return (
        <div>
            <Search
                placeholder="input search text"
                enterButton="Search"
                size="large"
                onSearch={handleSearch}
            />
            <p className="error-msg"></p>
        </div>
    )
}

export default SearchBar;