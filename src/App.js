import React, { useEffect, useState } from "react";

function App() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL)
            .then((res) => res.text())
            .then((data) => setMessage(data));
    }, []);

    return (
        <div>
            <h1>Frontend React</h1>
            <p>Message du backend : {message}</p>
        </div>
    );
}

export default App;
