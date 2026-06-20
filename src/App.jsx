import { useState } from "react";
import "./App.css";
import APIForm from "../components/APIForm";
import Gallery from "../components/Gallery";
const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

function App() {
    const [inputs, setInputs] = useState({
        url: "",
        format: "",
        no_ads: "",
        no_cookie_banners: "",
        width: "",
        height: "",
    });
    const [currentImage, setCurrentImage] = useState(null);
    const [prevImages, setPrevImages] = useState([]);

    const submitForm = () => {
        const defaultValues = {
            format: "jpeg",
            no_ads: "true",
            no_cookie_banners: "true",
            width: "1920",
            height: "1080",
        };
        if (inputs.url === "" || inputs.url === " ") {
            alert("Please enter a website URL.");
            return;
        }
        const updatedInputs = { ...inputs };
        for (const [key, value] of Object.entries(inputs)) {
            if (value === "") {
                updatedInputs[key] = defaultValues[key];
            }
        }
        setInputs(updatedInputs);
        makeQuery(updatedInputs);
    };

    const makeQuery = (currentInputs) => {
        const wait_until = "network_idle";
        const response_type = "json";
        const fail_on_status = "400%2C404%2C500-511";
        const cleanURL = currentInputs.url.replace(/^https?:\/\//, "");
        const fullURL = "https://" + cleanURL;

        const query = `https://api.apiflash.com/v1/urltoimage?access_key=${ACCESS_KEY}&url=${fullURL}&format=${currentInputs.format}&width=${currentInputs.width}&height=${currentInputs.height}&no_cookie_banners=${currentInputs.no_cookie_banners}&no_ads=${currentInputs.no_ads}&wait_until=${wait_until}&response_type=${response_type}&fail_on_status=${fail_on_status}`;

        callAPI(query).catch(console.error);
    };

    const callAPI = async (query) => {
        const response = await fetch(query);
        const json = await response.json();
        if (json.url == null) {
            alert("Oops! Something went wrong with that query, let's try again!");
        } else {
            setCurrentImage(json.url);
            setPrevImages((images) => [...images, json.url]);
            reset();
        }
    };

    const reset = () => {
        setInputs({
            url: "",
            format: "",
            no_ads: "",
            no_cookie_banners: "",
            width: "",
            height: "",
        });
    };

    return (
        <div className="page">
            <div className="hero">
                <div className="hero-left">
                    <h1>Build Your Own Screenshot 📸</h1>
                    <p className="hero-desc">
                        Capture any website as a high-quality image. Customize the
                        format, dimensions, and remove distractions like ads and
                        cookie banners.
                    </p>
                    <div className="query-box">
                        <p className="query-box-title">Current Query</p>
                        <div className="query-params">
                            <span className="query-param">access_key=<span>••••••</span></span>
                            <span className="query-param">&amp;url=<span>{inputs.url || "—"}</span></span>
                            <span className="query-param">&amp;format=<span>{inputs.format || "—"}</span></span>
                            <span className="query-param">&amp;width=<span>{inputs.width || "—"}</span></span>
                            <span className="query-param">&amp;height=<span>{inputs.height || "—"}</span></span>
                            <span className="query-param">&amp;no_cookie_banners=<span>{inputs.no_cookie_banners || "—"}</span></span>
                            <span className="query-param">&amp;no_ads=<span>{inputs.no_ads || "—"}</span></span>
                        </div>
                    </div>
                </div>

                <div className="hero-right">
                    <APIForm
                        inputs={inputs}
                        handleChange={(e) =>
                            setInputs((prev) => ({
                                ...prev,
                                [e.target.name]: e.target.value.trim(),
                            }))
                        }
                        onSubmit={submitForm}
                    />
                </div>
            </div>

            {currentImage && (
                <div className="result-section">
                    <h2>Latest Screenshot</h2>
                    <img
                        className="screenshot"
                        src={currentImage}
                        alt="Screenshot returned"
                    />
                </div>
            )}

            <div className="gallery-section">
                <Gallery images={prevImages} />
            </div>
        </div>
    );
}

export default App;
